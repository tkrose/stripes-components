import React from 'react';
import { PaneContext } from '../Pane/PaneContext';
import PQCellRenderer from './PQCellRenderer';

const PQCell = (props) => (
  <PaneContext.Consumer>
    { pane => <PQCellRenderer {...props} paneWidth={pane.width} /> }
  </PaneContext.Consumer>
);

export default PQCell;