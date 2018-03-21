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
  alignBottom: PropTypes.string,
  alignTop: PropTypes.string,
  justifyEnd: PropTypes.string,
  justifyStart: PropTypes.string,
};

const contextTypes = {
  paneWidth: PropTypes.number.isRequired,
  breakPoints: bp,
};

class PQRow extends React.Component {
  matchedQuery = (q) => {
    // the "small-first" default result...
    const res = {};
    let qprops = [
      'bottom',
      'top',
      'end',
      'start',
    ];

    qprops = qprops.filter(p => this.props[p] !== undefined);
    if (qprops.length === 0) {
      return res;
    }

    // get priority index of 'q'...
    let qIndex = priority.indexOf(q);
    qprops.forEach((p) => {
      const pqRE = new RegExp(`${priority[qIndex]}`);
      if (pqRE.test(this.props[p])) {
        res[p] = css[p];
      } else {
        qIndex -= 1; // test q and below in priority until a match is found.
        while (qIndex > -1 && res[p] === undefined) {
          if (this.props[p].indexOf(priority[qIndex]) !== -1) {
            res[p] = css[p];
          }
        }
      }
    });

    return res;
  }

  getClass = () => {
    const brP = getBreakpoint(this.context.paneWidth, this.props.breakPoints);
    const res = this.matchQuery(brP);
    return classNames(
      css.PQRow,
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

PQRow.contextTypes = contextTypes;
PQRow.propTypes = propTypes;

export default PQRow;
