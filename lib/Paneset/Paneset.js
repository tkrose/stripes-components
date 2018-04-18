import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import css from './Paneset.css';

const propTypes = {
  // applies styling to properly nest the paneset
  nested: PropTypes.bool,
  // set if the height of the paneset needs to be controlled.
  static: PropTypes.bool,
  // panes and other things that render panes..
  children: PropTypes.node,
  // this paneset will not report itself to an ascendent paneset
  isRoot: PropTypes.bool,
  // if necessary, Paneset can be assigned a percentage width.
  defaultWidth: PropTypes.string,
};

const defaultProps = {
  defaultWidth: 'fill',
};

class Paneset extends React.Component {
  constructor(props) {
    super(props);

    let initStyle = {};
    if (this.props.defaultWidth !== 'fill') {
      initStyle = { flex: `0 0 ${this.props.defaultWidth}` };
    }

    this.state = {
      paneManager: this,
      panes: [],
      style: initStyle,
    };

    this.container = null;
    this.id = _.uniqueId();
    this.removePane = this.removePane.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.getContainer = this.getContainer.bind(this);
    this.isThisMounted = this.isThisMounted.bind(this);
    this.calcPixels = this.calcPixels.bind(this);
    this.updateWidth = this.updateWidth.bind(this);

    this.widths = [];
    this.interval = null;
    this._clientWidth = 0;
    this._isMounted = false;
  }

  getChildContext() {
    return {
      paneset: this.state.paneManager,
      panesetWidth: this.state.pixelWidth,
    };
  }

  componentDidMount() {
    if (!this.props.isRoot) {
      if (this.context && this.context.paneset) {
        this.context.paneset.registerPane({
          id: this.id,
          ref: this,
          isPaneset: true,
          transition: 'none',
        });
      }
      window.addEventListener('resize', this.updateWidth);
    }

    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
    if (!this.props.isRoot) {
      window.removeEventListener('resize', this.updateWidth);
    }
    if (!this.props.isRoot && this.context.paneset) {
      this.context.paneset.removePane();
    }
  }

  isThisMounted() {
    return this._isMounted;
  }

  getContainer() {
    return this.container;
  }

  getWidth() {
    return this._clientWidth;
  }

  getClassName() {
    const nested = this.props.nested ? css.nested : '';
    const staticClass = this.props.static === true ? css.static : '';
    const base = css.paneset;
    return `${base} ${nested} ${staticClass}`;
  }

  setStyle(style, pixelWidth) {
    this.setState((oldState) => {
      const newState = oldState;
      // clone because you can't mutate style....
      const newStyle = Object.assign({}, newState.style, style);
      newState.style = newStyle;
      newState.pixelWidth = pixelWidth;
      return newState;
    });
  }

  updateWidth() {
    this.resizePanes(this.state.panes, this.widths);
  }

  resizePanes(panes, widths) {
    requestAnimationFrame(() => {
      // get client width of this paneset...
      this._clientWidth = this.container.offsetWidth;

      panes.forEach((pane, i) => {
        // parse width for unit...
        let pxW = null;
        if (this.widths[i] !== undefined) {
          pxW = this.calcPixels(this._clientWidth, this.widths[i]);
        }
        pane.ref.setStyle({ flex: `0 0 ${widths[i]}`, left: '0' }, pxW);
      }, this);
    });
  }

  calcPixels(cw, w) { // eslint-disable-line class-methods-use-this
    const cssPropRe = /^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/;
    const value = cssPropRe.exec(w);
    const valueAmount = parseInt(value[1], 10);
    if (value[2] === '%') {
      return cw * (valueAmount / 100);
    } else {
      return valueAmount;
    }
  }

  removePane() {
    this.setState((oldState) => {
      // accounts for odd situations where multiple Panes are dismissed/dismounted at once...
      // simply filters out any that have dismounted.
      const newPanes = oldState.panes.filter(p => p.ref && p.ref.isThisMounted());
      const newState = Object.assign({}, oldState);
      newState.panes = newPanes;
      const widths = this.calcWidths(newState.panes);
      this.resizePanes(newState.panes, widths);
      return newState;
    });
  }

  // transitions
  // set up initial state for transitions...(register)
  // measurements still in state where new pane isn't there...
  // apply 'in' state for transitions...
  // measurements with added pane
  // Closing...
  // apply 'out' state with callback to remove pane...

  registerPane(paneObject) {
    this.setState((oldState) => {
      const newState = Object.assign({}, oldState);
      let widths;
      // if the new pane has a transition just set its starting appearance...
      // otherwise resize all the panes...
      if (paneObject.ref.props.transition !== 'none') {
        this.transitionStart(paneObject);
        this.resizePanes(newState.panes, this.widths); // pass cached widths
        newState.panes.push(paneObject);
        this.interval = setTimeout(() => {
          this.transitionEnd();
          this.interval = null;
        }, 5);
      } else {
        newState.panes.push(paneObject);
        widths = this.calcWidths(newState.panes);
        this.resizePanes(newState.panes, widths);
      }
      return newState;
    });
  }

  transitionStart(pane) { // eslint-disable-line class-methods-use-this
    if (pane.ref.props.transition === 'slide') {
      const styleObject = {};
      if (!Number.isNaN(parseInt(pane.ref.props.defaultWidth, 10))) {
        styleObject.flex = `0 0 ${pane.ref.props.defaultWidth}`;
      }
      styleObject.left = '100vh';
      styleObject.transition = 'left .25s ease';
      pane.ref.setStyle(styleObject);
    }
  }

  transitionEnd() {
    const widths = this.calcWidths(this.state.panes);
    this.resizePanes(this.state.panes, widths);
  }

  isRegistered(id) {
    const pane = this.state.panes.filter(p => p.id === id)[0];
    return !!pane;
  }

  handleClose(id, callback) {
    const pane = this.state.panes.filter(p => p.id === id)[0];
    if (pane.ref.props.transition !== 'none') {
      this.transitionStart(pane);
      this.removePane(id);
      this.transitionEnd();
      if (callback) {
        setTimeout(() => {
          callback();
        }, 300);
      }
    } else {
      this.removePane(id);
      if (callback) { callback(); }
    }
  }

  calcWidths(panes) { // find all static widths.
    let staticSpace = 0;
    const dynamics = [];
    const widths = [];

    panes.forEach((pane, i) => {
      if (pane.staticWidth) {
        staticSpace += pane.staticWidth;
      } else {
        const currentPaneWidth = parseInt(pane.ref.props.defaultWidth, 10);
        // if we can't get an int from default width, it's something dynamic like 'fill'
        if (Number.isNaN(currentPaneWidth)) {
          dynamics.push(i);
        } else {
          staticSpace += currentPaneWidth;
          pane.staticWidth = currentPaneWidth; // eslint-disable-line
        }
      }
    });
    const basePercentage = (100 - staticSpace) / Math.max(dynamics.length, 1);

    panes.forEach((pane, i) => {
      if (dynamics.indexOf(i) !== -1) {
        widths.push(`${basePercentage}%`);
      } else {
        widths.push(panes[i].ref.props.defaultWidth);
      }
    });
    this.widths = widths;
    return widths;
  }

  render() {
    return (
      <div className={this.getClassName()} style={this.state.style} ref={(ref) => { this.container = ref; }}>
        {this.props.children}
      </div>
    );
  }
}

const contextTypes = {
  paneset: PropTypes.instanceOf(Paneset),
  panesetWidth: PropTypes.number,
};

const childContextTypes = {
  paneset: PropTypes.instanceOf(Paneset),
  panesetWidth: PropTypes.number,
};

Paneset.propTypes = propTypes;
Paneset.defaultProps = defaultProps;
Paneset.contextTypes = contextTypes;
Paneset.childContextTypes = childContextTypes;

export default Paneset;
