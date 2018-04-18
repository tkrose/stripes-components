import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import getBreakpoint from './getBreakpoint';
import { priority } from './breakpoints';
import css from './PQGrid.css';
/* eslint-disable */
const propTypes = {
  breakPoints: PropTypes.object,
  children: PropTypes.node,
  paneWidth: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  xl: PropTypes.number,
  xxl: PropTypes.number,
  smClasses: PropTypes.string,
  mdClasses: PropTypes.string,
  lgClasses: PropTypes.string,
  xlClasses: PropTypes.string,
  xxlClasses: PropTypes.string,
  classes: PropTypes.string,
};
/* eslint-enable */

class PQCell extends React.Component {
  constructor(props) {
    super(props);

    this.buildCachedClasses = this.buildCachedClasses.bind(this);
    this.matchedQuery = this.matchedQuery.bind(this);
    this.buildClassArray = this.buildClassArray.bind(this);

    // cached classes..
    this._cachedClasses = this.buildCachedClasses();
  }

  buildClassArray(propName, classArray) {
    if (/\s/.test(this.props[propName])) {
      const csslist = this.props[propName].split(/\s+/);
      csslist.forEach((classname) => { classArray.push(css[classname]); });
    } else {
      classArray.push(css[this.props[propName]]);
    }
    classArray.push(' ');
  }

  buildCachedClasses() {
    let current = css.w16;
    const classObject = {};

    const constantClasses = [];
    const queryClasses = {
      smClasses: [],
      mdClasses: [],
      lgClasses: [],
      xlClasses: [],
      xxlClasses: [],
    };

    this.buildClassArray('classes', constantClasses);
    this.buildClassArray('smClasses', queryClasses.smClasses);
    this.buildClassArray('mdClasses', queryClasses.mdClasses);
    this.buildClassArray('lgClasses', queryClasses.lgClasses);
    this.buildClassArray('xlClasses', queryClasses.xlClasses);
    this.buildClassArray('xxlClasses', queryClasses.xxlClasses);

    priority.forEach((bpt) => {
      classObject[bpt] = constantClasses.join(' ');
      classObject[bpt] += queryClasses[`${bpt}Classes`].join(' ');
      if (typeof this.props[bpt] === 'undefined') {
        classObject[bpt] += current;
      } else {
        classObject[bpt] += css[`w${this.props[bpt]}`];
        current = classObject[bpt];
      }
      classObject[bpt] = classObject[bpt].replace(/\s{2,}/g, ' ');
    });

    return classObject;
  }

  matchedQuery(q) {
    // once classes are cached, simply return the cooresponding key for the query..
    if (Object.keys(this._cachedClasses).length !== 0) {
      return this._cachedClasses[q];
    } else { // if not, generate the classes and cache the object...
      this._cachedClasses = this.buildCachedClasses();
      this._validClasses = true;
      return this._cachedClasses[q];
    }
  }

  getClass = () => {
    const brP = getBreakpoint(this.props.paneWidth, this.props.breakPoints, 'sm');
    const res = this.matchedQuery(brP);
    return classNames(
      css.PQCell,
      res,
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

PQCell.propTypes = propTypes;

export default PQCell;
