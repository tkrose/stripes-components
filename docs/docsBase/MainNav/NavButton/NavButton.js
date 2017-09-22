import React from 'react';
import PropTypes from 'prop-types';
import css from './NavButton.css';

const propTypes = {
  href: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  children: PropTypes.node.isRequired,
  md: PropTypes.string, //temporary as we work out the responsiveness of the header.
};

function NavButton(props) {
  function getClass() {
    const base = css.navButton;
    const hide = props.md === 'hide' ? css.hideMed : null;
    return `${base} ${hide}`;
  }

  const {children, md, bsRole, bsClass, ...buttonProps} = props;
  
  if (props.href) {
    return (
      <a
        className={getClass()}
        {...buttonProps}
      >
        {props.children}
      </a>
    );
  }
  
  

  return (
    <button
      type="button"
      className={getClass()}
      {...buttonProps}
    >
      {children}
    </button>
  );
}

NavButton.propTypes = propTypes;

export default NavButton;
