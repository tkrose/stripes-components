import React from 'react';
import {Consumer as FocusWrapConsumer} from './FocusWrapContext';

const withFocusWrap = (Component) => {
  const WrappedFocusTarget = (props) => {
    return (
      <FocusWrapConsumer>
        {
          (focusKey) => <Component routeName={focusKey} {...props} />
        }
      </FocusWrapConsumer>
    );
  }
  return WrappedFocusTarget;
}

export default withFocusWrap;
