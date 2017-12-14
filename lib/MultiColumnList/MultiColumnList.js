import React from 'react';
import PropTypes from 'prop-types';
import Autosizer from './Autosizer';
import MCLRenderer from './MCLRenderer';

const propTypes = {
  autosize: PropTypes.bool,
};

const MultiColumnList = (props) => {
  if (props.autosize) {
    return (
      <Autosizer disableWidth>
        {({ height }) =>
          (
            <MCLRenderer {...props} height={height} />
          )
        }
      </Autosizer>
    );
  }

  return <MCLRenderer {...props} />;
};

MultiColumnList.propTypes = propTypes;

export default MultiColumnList;
