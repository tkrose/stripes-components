import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import withFocusWrap from './withFocusWrap';
import getFocusableWithin from '../../util/getFocusableWithin';

class FocusWrap extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    focusRefGetter: PropTypes.func,
    focusName: PropTypes.string,
    shouldFocus: PropTypes.bool,
    routeName: PropTypes.string,
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let focusTarget;
    if(typeof this.props.focusRefGetter !== 'undefined') {
      focusTarget = this.props.focusRefGetter();
    }

    if(typeof focusTarget === 'undefined') {
      let domNode = ReactDOM.findDOMNode(this);
      focusTarget = getFocusableWithin(domNode);
    }

    if (typeof this.props.shouldFocus === 'undefined') {
      if (this.props.routeName === this.props.focusName) {
        focusTarget.focus();
      }
    } else if (this.props.shouldFocus){
      focusTarget.focus();
    }
  }

  render() {
    return this.props.children;
  }
}

export default withFocusWrap(FocusWrap);
