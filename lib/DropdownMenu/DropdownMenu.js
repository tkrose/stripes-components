
import React, { cloneElement } from 'react';
import RootCloseWrapper from 'react-overlays/lib/RootCloseWrapper';
import PropTypes from 'prop-types';
import { HotKeys } from '@folio/stripes-react-hotkeys';
import separateComponentProps from '../../util/separateComponentProps';
import MenuItem from '../MenuItem';
import css from './DropdownMenu.css';

const propTypes = {
  pullRight: PropTypes.bool,
  width: PropTypes.string,
  minWidth: PropTypes.string,
  onSelect: PropTypes.func,
  onSelectItem: PropTypes.func,
  onToggle: PropTypes.func,
  trigger: PropTypes.node,
  open: PropTypes.bool,
  labelledBy: PropTypes.string,
  onClose: PropTypes.func,
  rootCloseEvent: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  overrideStyle: PropTypes.object,
};

const defaultProps = {
  overrideStyle: {},
};

class DropdownMenu extends React.Component {
  constructor(props) {
    super(props);

    this._handlers = {
      'moveDown': () => this.focusNext(),
      'moveUp': () => this.focusPrev(),
      'onTab': (e) => {this.props.onTab();},
      'onShiftTab': (e) => {this.props.onTab();},
    }
    this._keyMap = {
      'moveDown': 'down',
      'moveUp': 'up',
      'onTab': 'tab',
      'onShiftTab': 'shift+tab',
    }

    this.collectFocusable = this.collectFocusable.bind(this);
  }

  componentDidMount() {
    this.node.focus();
    console.log('mounted');
    this._focusable = this.collectFocusable();
    this._focusable[0].focus();
  }

  collectFocusable() {
    if (!this.node) {
      return [];
    }
    let possiblyFocusable = Array.from(this.node.querySelectorAll("button, input, select, textarea, a, [tabindex]"));
    const focusable =  possiblyFocusable.filter((e, i) => {
      // basic visibility test...invisible elements are not focusable
      if(e.offsetParent === null ) {
        return false;
      }
      if(e.nodeName.toLowerCase() === 'a') {
        if (!e.hasAttribute('href')){
          return false;
        }
      }
      return true;
    });
    return focusable;
  }

  getItemsAndActiveIndex() {
    const items = this.collectFocusable();
    const activeIndex = items.indexOf(document.activeElement);

    return { items, activeIndex };
  }

  // getFocusableMenuItems() {
  //   if (!this.node) {
  //     return [];
  //   }

  //   return Array.from(this.node.querySelectorAll('button, input, a, select, [tabIndex="-1"]'));
  // }

  focusNext() {
    const { items, activeIndex } = this.getItemsAndActiveIndex();
    if (items.length === 0) {
      return;
    }

    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    items[nextIndex].focus();
  }

  focusPrev() {
    const { items, activeIndex } = this.getItemsAndActiveIndex();
    if (items.length === 0) {
      return;
    }

    const prevIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    items[prevIndex].focus();
  }

  renderChildren() {
    const { children, onSelectItem, onSelect } = this.props;
    return React.Children.map(React.Children.toArray(children), (child) => {
      if (child.type === MenuItem) {
        return cloneElement(child,
          Object.assign(
            {},
            child.props,
            {
              onSelectItem,
              onSelect,
            },
          ),
          child.props.children,
        );
      } 
      return child;
    });
  }

  render() {
    const { onToggle, pullRight } = this.props;
    const [, ddprops] = separateComponentProps(this.props, DropdownMenu.propTypes);
    const position = Object.assign({
      left: pullRight ? 'initial' : '0',
      display: this.props.open ? 'block' : 'none',
      right: pullRight ? '0' : 'initial',
      width: this.props.width || 'initial',
      minWidth: this.props.minWidth || null,
    }, this.props.overrideStyle);

    const menu = (
      <div className={css.DropdownMenu} style={position} tabIndex="-1" {...ddprops} onBlur={this.handleBlur} >
        <HotKeys keyMap={this._keyMap} handlers={this._handlers} >
          <div ref={(node) => { this.node = node; }}>
            {this.renderChildren()}
          </div>
        </HotKeys>
      </div>
    );

    if (this.props.open) {
      return (
        <RootCloseWrapper onRootClose={onToggle} >
          {menu}
        </RootCloseWrapper>
      );
    }

    return menu;
  }
}

DropdownMenu.propTypes = propTypes;
DropdownMenu.defaultProps = defaultProps;

export default DropdownMenu;
