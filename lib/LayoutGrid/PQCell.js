import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import getBreakpoint from './getBreakpoint';
import { bp, priority } from './breakpoints';
import css from './PQGrid.css';

const propTypes = {
  breakPoints: PropTypes.object,
  children: PropTypes.node,
  queryMatched: PropTypes.object,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  xl: PropTypes.number,
  xxl: PropTypes.number,
};

const contextTypes = {
  paneWidth: PropTypes.number.isRequired,
  breakPoints: bp,
};

class PQCell extends React.Component {

  matchedQuery = (q) => {
    // the "small-first" default result...
    let res = css.w16;
    let qprops = [
      'sm',
      'md',
      'lg',
      'xl',
      'xxl',
    ];

    // eliminate as many as we can...
    qprops = qprops.filter(p => this.props[p] !== undefined);
    if (qprops.length === 0) {
      return res;
    }

    // does qProps contain the matched query? return its value if so..
    if (qprops.indexOf(q) !== -1) {
      res = `w${this.props[q]}`;
    } else { // if not, does qProps contain the next in priority... and so on...
      let qIndex = priority.indexOf(q);
      qIndex -= 1;
      // return the width value we come to at the query or below...
      while (qIndex >= 0) {
        if (qprops.indexOf(priority[qIndex]) !== -1) {
          res = `w${this.props[priority[qIndex]]}`;
          qIndex = -1;
        }
      }
    }
    return res;
  }

  getClass = () => {
    const brP = getBreakpoint(this.context.paneWidth, this.props.breakPoints);
    const res = this.matchQuery(brP);
    return classNames(
      css.PQCell,
      { ...res },
    );
  }

  render() {
    return (
      <div className={this.getClass()}>
        {this.props.children}
      </div>
    );
  }
}

PQCell.contextTypes = contextTypes;
PQCell.propTypes = propTypes;

export default PQCell;
