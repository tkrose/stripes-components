import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import Transition from 'react-transition-group/Transition';
import uniqueId from 'lodash/uniqueId';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';
import css from './Positioner.css';

const propTypes = {
  position: PropTypes.oneOf(['top', 'start', 'end', 'bottom']),
  alignment: PropTypes.oneOf(['middle', 'center', 'start', 'end']),
  offset: PropTypes.number,
  target: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  overlay: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  classes: PropTypes.object,
  targetInline: PropTypes.bool,
  open: PropTypes.bool.isRequired,
  visible: PropTypes.bool,
  tagName: PropTypes.string,
  onHide: PropTypes.func,
};

const defaultProps = {
  position: 'bottom',
  alignment: 'center',
  offset: 5,
  tagName: 'span',
  classes: css,
  targetInline: false,
};

class Positioner extends React.Component {
  constructor(props) {
    super(props);

    let handleIn;
    if (typeof props.visible === 'undefined') {
      handleIn = props.open;
    } else {
      handleIn = props.visible;
    }

    this.state = {
      in: handleIn,
      flippedPosition: false,
      style: {},
    };

    this._oppositeDirections = {
      start: 'end',
      end: 'start',
      top: 'bottom',
      bottom: 'top',
    };

    this.popRAF = null;
    this._containerNode = document.getElementById('OverlayContainer');
    this._containerKey = uniqueId('PositionerOverlay-');

    this.updatePosition = this.updatePosition.bind(this);
    this.checkBounds = this.checkBounds.bind(this);
    this.getAlignment = this.getAlignment.bind(this);
    this.getPosition = this.getPosition.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.getClassNames = this.getClassNames.bind(this);
    this.getTargetClass = this.getTargetClass.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let handleIn;
    if (typeof nextProps.visible === 'undefined') {
      handleIn = nextProps.open;
    } else {
      handleIn = nextProps.visible;
    }
    this.setState({
      in: handleIn,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // Popover opens
    if (!prevProps.open && this.props.open) {
      this.updatePosition();
      window.addEventListener('scroll', this.handleScroll, true);
    }

    // Popover closes
    if (prevProps.open && !this.props.open) {
      window.removeEventListener('scroll', this.handleScroll, true);
    }

    if (prevState.flippedPosition !== this.state.flippedPosition) {
      this.updatePosition();
    }
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.popRAF);
    this.popRAF = null;
  }

  updatePosition() {
    this.popRAF = requestAnimationFrame(() => {
      const targetRect = this._targetContainer.firstChild.getBoundingClientRect();
      const olyRect = this._overlayContainer.getBoundingClientRect();

      let derivedPosition;

      if (this.state.flippedPosition) {
        derivedPosition = this._oppositeDirections[this.props.position];
      } else {
        derivedPosition = this.props.position;
      }

      const newPos = this.getPosition(targetRect, olyRect, derivedPosition);

      const newAlign = this.getAlignment(targetRect, olyRect, derivedPosition, this.props.alignment);
      const newStyle = Object.assign({}, newPos, newAlign);
      const chk = this.checkBounds(newStyle.left, newStyle.top, olyRect, derivedPosition, this.props.alignment);

      // if it's out of bounds, set  and re-render...
      if (chk.flip) {
        // if it's already flipped, we don't want to re-render.
        if (!this.state.flippedPosition) {
          this.setState({ flippedPosition: true });
        }
      }

      const finalStyle = Object.assign({}, newStyle, chk);

      if (!isEqual(finalStyle, this.state.style)) {
        // push positioning into popover
        this.setState((curState) => {
          const newState = cloneDeep(curState);
          for (const p in finalStyle) {
            if (Object.prototype.hasOwnProperty.call(finalStyle, p)) {
              // this._overlayContainer.style[p] = `${finalStyle[p]}px`;
              newState.style[p] = `${finalStyle[p]}px`;
            }
          }
          return newState;
        });
      }
    });
  }

  // check bounds against window...
  checkBounds(left, top, olyRect, position) { // eslint-disable-line class-methods-use-this
    const correction = { flip: false };
    if (left < 0) {
      if (position === 'start') {
        correction.flip = true;
        return correction;
      }
      correction.left = 0;
    }

    if (left + olyRect.width > window.innerWidth) {
      if (position === 'end') {
        correction.flip = true;
        return correction;
      }
      correction.left = window.innerWidth - olyRect.width;
    }

    if (top < 0) {
      if (position === 'top') {
        correction.flip = true;
        return correction;
      }
      correction.top = 0;
    }

    if (top + olyRect.height > window.innerHeight) {
      if (position === 'bottom') {
        correction.flip = true;
        return correction;
      }
      correction.top = window.innerHeight - olyRect.height;
    }

    return correction;
  }

  getAlignment(targetRect, olyRect, position, alignment) { // eslint-disable-line class-methods-use-this
    let coordinate = 'left';
    let dimension = 'width';
    let a;
    const alignObject = {};

    if (position === 'start' || position === 'end') {
      coordinate = 'top';
      dimension = 'height';
    }

    switch (alignment) {
      case 'middle':
      case 'center': {
        // find centers of target and popover...
        const halfTarget = targetRect[dimension] / 2;
        const halfPop = olyRect[dimension] / 2;
        // calculate final alignment
        a = (targetRect[coordinate] + halfTarget) - halfPop;
        // use the determined coordinate to set...
        alignObject[coordinate] = a;
        break;
      }
      case 'start': {
        a = targetRect[coordinate];
        alignObject[coordinate] = a;
        break;
      }
      case 'end': {
        a = targetRect[coordinate] - (olyRect[dimension] - targetRect[dimension]);
        alignObject[coordinate] = a;
        break;
      }
      default:
        break;
    }

    return alignObject;
  }

  getPosition(targetRect, olyRect, position) {
    const { offset } = this.props;
    const styleObject = {};
    switch (position) {
      case 'bottom': {
        styleObject.top = targetRect.bottom + offset;
        break;
      }
      case 'top': {
        styleObject.top = targetRect.top - olyRect.height - offset;
        break;
      }
      case 'end': {
        const newLeft = targetRect.left + targetRect.width + offset;
        // this._overlayContainer.style.top = `${targetRect.top}px`;
        styleObject.left = newLeft;
        break;
      }
      case 'start': {
        const newLeft = targetRect.left - olyRect.width - offset;
        // this._overlayContainer.style.top = `${targetRect.top}px`;
        styleObject.left = newLeft;
        break;
      }
      default:
        break;
    }
    return styleObject;
  }

  handleScroll() {
    this.updatePosition();
  }

  getClassNames(status) {
    return classnames(
      css.PositionerParent,
      this.props.classes.transition,
      this.props.classes[`transition-${status}`],
    );
  }

  getTargetClass() {
    return classnames(
      { [css.PositionerTargetInline]: this.props.targetInline },
    );
  }

  render() {
    const {
      onHide,
      open, // eslint-disable-line no-unused-vars
      target,
    } = this.props;

    const Tag = this.props.tagName;
    let renderedOverlay = null;
    const container = document.getElementById('OverlayContainer');
    if (container) {
      renderedOverlay = ReactDOM.createPortal(
        <Transition key={this._containerKey} appear timeout={70} in={this.state.in} onExited={onHide}>
          { status => (
            <div className={this.getClassNames(status)}>
              {open &&
                <div tabIndex="-1" style={this.state.style} className={css.PositionerOverlay} ref={(t) => { this._overlayContainer = t; }}>
                  {this.props.overlay}
                </div>
              }
            </div>
          )}
        </Transition>,
        container,
      );
    }
    return (
      <Tag>
        <div className={this.getTargetClass()} ref={(t) => { this._targetContainer = t; }} key="PositionerTarget">
          {target}
        </div>
        {renderedOverlay}
      </Tag>
    );
  }
}

Positioner.propTypes = propTypes;
Positioner.defaultProps = defaultProps;

export default Positioner;
