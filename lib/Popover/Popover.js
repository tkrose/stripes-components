import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import RootCloseWrapper from 'react-overlays/lib/RootCloseWrapper';
import Positioner from '../Positioner';
import css from './Popover.css';

const propTypes = {
  position: PropTypes.oneOf(['top', 'start', 'end', 'bottom']),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  alignment: PropTypes.oneOf(['middle', 'center', 'start', 'end']),
  activeClass: PropTypes.string,
  offset: PropTypes.number,
  noPadding: PropTypes.bool,
};

const defaultProps = {
  position: 'bottom',
  alignment: 'center',
  offset: 5,
  noPadding: false,
};

class Popover extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.renderChildren = this.renderChildren.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.getPopoverClass = this.getPopoverClass.bind(this);
    this.getTargetClass = this.getTargetClass.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    // Popover opens
    if (!prevState.open && this.state.open) {
      // Focus Popover body
      if (this._popover) {
        this._popover.focus();
      }
    }
  }

  handleToggle(e) {
    e.stopPropagation();
    this.setState((curState) => {
      const { open } = curState;
      const nextState = Object.assign({}, curState);
      if (!open) {
        nextState.open = true;
        nextState.visible = true;
      } else {
        nextState.open = false;
        nextState.visible = false;
      }
      return nextState;
    });
  }

  getTargetClass() {
    return classnames(
      css.popoverTarget,
      this.props.activeClass,
    );
  }

  getPopoverClass() {
    return classnames(
      css.popoverPop,
      { [css.noPadding]: this.props.noPadding },
    );
  }

  renderChildren() {
    if (!this._target) {
      React.Children.forEach(this.props.children, (child) => {
        switch (child.props['data-role']) {
          case 'target': {
            const target = React.cloneElement(
              child,
              Object.assign(
                {
                  onClick: (e) => { this.handleToggle(e); },
                },
                child.props,
              ),
            );
            this.rendered_target = (
              <div
                className={this.getTargetClass()}
                ref={(t) => { this._target = t; }}
                key="target"
              >
                {target}
              </div>
            );
            break;
          }
          case 'popover': {
            const popover = React.cloneElement(
              child,
              child.props,
            );

            this.rendered_popover = (
              <RootCloseWrapper onRootClose={this.handleToggle}>
                <div
                  tabIndex="-1"
                  role="dialog"
                  className={this.getPopoverClass()}
                  ref={(t) => { this._popover = t; }}
                >
                  {popover}
                </div>
              </RootCloseWrapper>
            );
            break;
          }
          default:
            break;
        }
      });
    }
  }

  hidePopover = () => {
    this.setState({
      open: false,
    });
  }

  render() {
    const {
      position,
      alignment,
      offset,
    } = this.props;

    this.renderChildren();
    let popover = null;
    if (this.state.open) {
      popover = this.rendered_popover;
    }
    return (
      <Positioner
        visible={this.state.open}
        position={position}
        alignment={alignment}
        offset={offset}
        target={this.rendered_target}
        overlay={popover}
        onHide={this.hidePopover}
        tag="div"
      />
    );
  }
}

Popover.propTypes = propTypes;
Popover.defaultProps = defaultProps;

export default Popover;
