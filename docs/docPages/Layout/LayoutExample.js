import React from 'react';
import Paneset from '../../../lib/Paneset';
import Pane from '../../../lib/Pane';

const LayoutExample = () => (
  <Paneset>
    <Pane paneTitle="Pane 1" defaultWidth="20%">
      Pane 1 Content
    </Pane>
    <Pane paneTitle="Pane 2" defaultWidth="fill">
      Pane 2 Content
    </Pane>
  </Paneset>
);

export default LayoutExample;
