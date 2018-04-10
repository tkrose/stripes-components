
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Positioner from '../Positioner';
import css from './Dropdown.css';
import omit from '../../util/omitProps';
import { isStatefulComponent } from '../../util/isStatefulComponent';

const propTypes = {
  disabled: PropTypes.bool,
  open: PropTypes.bool,
  hasPadding: PropTypes.bool,
  onToggle: PropTypes.func,
  onSelect: PropTypes.func,
  onSelectItem: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  dropdownClass: PropTypes.string,
  pullRight: PropTypes.bool,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  tag: PropTypes.string,
};

const defaultProps = {
  open: false,
  hasPadding: false,
  tag: 'span',
};

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this._focusInDropdown = false;
  }

  componentWillUpdate(nextProps) {
    if (!nextProps.open && this.props.open) {
      this._focusInDropdown = this._menu.node ? this._menu.node.contains(document.activeElement) : false;
    }
  }

  componentDidUpdate(prevProps) {
    const { open } = this.props;
    const prevOpen = prevProps.open;

    if (!open && prevOpen) {
      if (this._focusInDropdown) {
        this._focusInDropdown = false;
        this.focus();
      }
    }
  }

  handleKeyDown(e) {
    if (this.props.disabled) {
      return;
    }

    switch (e.keyCode) {
      case 40: // down
        if (!this.props.open) {
          this.handleToggle(e);
        } else if (this._menu.focusNext) {
          this._menu.focusNext();
        }
        e.preventDefault();
        break;
      case 27: // escape
      case 9: // tab
        this.handleClose(e);
        break;
      default:
    }
  }

  focus() {
    const toggle = this._toggle;

    if (toggle && toggle.focus) {
      toggle.focus();
    }
  }

  handleClose(e) {
    if (!this.props.open) {
      return;
    }

    this.handleToggle(e);
  }

  handleToggle(e) {
    if (this.props.disabled) {
      return e && e.preventDefault();
    }
    if (e) { e.stopPropagation(); }
    return this.props.onToggle(e);
  }

  renderChildren() {
    const {
      open,
      pullRight,
      disabled,
      id,
      hasPadding,
      children,
    } = this.props;

    const className = classNames(
      { [css.hasPadding]: hasPadding },
    );

    return React.Children.forEach(React.Children.toArray(children), (child) => {
      switch (child.props['data-role']) {
        case 'toggle': {
          this.rendered_target = cloneElement(child, {
            'ref': isStatefulComponent(child) ? (c) => { this._toggle = c; } : undefined,
            disabled,
            'onClick': this.handleToggle,
            'onKeyDown': this.handleKeyDown,
            'aria-expanded': open,
            'aria-haspopup': true,
          });
        }
        case 'menu': {
          if (this.props.onSelectItem) {
            this.rendered_menu = cloneElement(child, {
              open,
              pullRight,
              labelledBy: id,
              className,
              onToggle: this.handleToggle,
              onSelectItem: this.props.onSelectItem,
              ref: isStatefulComponent(child) ? (c) => { this._menu = c; } : undefined,
            });
          }
          this.rendered_menu = cloneElement(child, {
            open,
            pullRight,
            labelledBy: id,
            className,
            onToggle: this.handleToggle,
            ref: isStatefulComponent(child) ? (c) => { this._menu = c; } : undefined,
          });
        }
        default: {
          this.otherChildren = child;
        }
      }
    });
  }

  render() {
    const {
      className,
      tag,
      open,
      group,
      hasPadding,
      dropdownClass,
      ...attributes
    } = omit(this.props, ['onToggle', 'onSelectItem', 'pullRight', 'dropdown', 'hasPadding']);
    const classes = classNames(
      className,
      {
        [css.hasPadding]: hasPadding,
        [css.btnGroup]: group,
        [css.show]: open,
        [css.dropdown]: !group,
      },
    );

    this.renderChildren();

    return (

        <Positioner
          open={this.props.open}
          target={this.rendered_target}
          overlay={this.rendered_menu}
          tagName = {tag}
          targetInline
        />
    );
  }
}

Dropdown.propTypes = propTypes;
Dropdown.defaultProps = defaultProps;

export default Dropdown;
