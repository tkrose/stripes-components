import React from 'react';
import className from 'classnames';
import PropTypes from 'prop-types';
import css from './Button.css';
import omitProps from '../../util/omitProps';

const propTypes = {
  buttonStyle: PropTypes.string,
  type: PropTypes.string,
  buttonClass: PropTypes.string,
  hollow: PropTypes.bool,
  align: PropTypes.string,
  bottomMargin0: PropTypes.bool,
  marginBottom0: PropTypes.bool,
  fullWidth: PropTypes.bool,
  href: PropTypes.string,
  allowAnchorClick: PropTypes.bool,
  onClick: PropTypes.func,
  role: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  buttonRef: PropTypes.func,
};

const defaultProps = {
  buttonStyle: 'primary',
  type: 'button',
  role: 'button',
};

class Button extends React.Component {
  constructor(props) {
    super(props);

    this.getStyle = this.getStyle.bind(this);
    this.handleAnchorClick = this.handleAnchorClick.bind(this);
    this.getButtonRef = this.getButtonRef.bind(this);
  }

  getStyle() {
    const buttonBuiltIn = [];
    if (/\s/.test(this.props.buttonStyle)) {
      const csslist = this.props.buttonStyle.split(/\s+/);
      csslist.forEach((classname) => { buttonBuiltIn.push(css[classname]); });
    } else {
      buttonBuiltIn.push(css[this.props.buttonStyle]);
    }
    return className(
      css.button,
      buttonBuiltIn,
      { [`${css.marginBottom0}`]: this.props.marginBottom0 },
      { [`${css.marginBottom0}`]: this.props.bottomMargin0 },
      { [`${css.fullWidth}`]: this.props.fullWidth },
      { [`${css.hollow}`]: this.props.hollow },
      { [`${css.floatEnd}`]: this.props.align === 'end' },
      this.props.buttonClass,
    );
  }

  handleAnchorClick(e) {
    if (e && !this.props.allowAnchorClick) e.preventDefault();
    this.props.onClick(e);
  }

  getButtonRef(ref) {
    if (this.props.buttonRef) {
      this.props.buttonRef(ref);
    }
  }

  render() {
    const inputCustom = omitProps(this.props, ['buttonClass', 'buttonStyle', 'bottomMargin0', 'marginBottom0', 'align', 'hollow', 'fullWidth', 'bsRole', 'bsClass', 'onClick', 'allowAnchorClick', 'buttonRef']);
    const { children, onClick, type } = this.props;

    if (this.props.href) {
      return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <a className={getStyle()} onClick={handleAnchorClick} ref={getButtonRef} {...inputCustom}>
          {children}
        </a>
      );
    }

    return (
      <button className={this.getStyle()} type={type} onClick={onClick} ref={this.getButtonRef} {...inputCustom}>
        {children}
      </button>
    );
  }
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
