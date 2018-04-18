import React from 'react';
import { PaneContext } from '../Pane/PaneContext';
import PQRowRenderer from './PQRowRenderer';

const PQRow = (props) => (
  <PaneContext.Consumer>
    { pane => <PQRowRenderer {...props} paneWidth={pane.width} /> }
  </PaneContext.Consumer>
);

export default PQRow;
