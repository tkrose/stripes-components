import React from 'react';
import Paneset from '../../../lib/Paneset';
import Pane from '../../../lib/Pane';
import { Accordion, AccordionSet } from '../../../lib/Accordion';
import Button from '../../../lib/Button';

import FilterGroups from '../../../lib/FilterGroups';

const filterConfig = [
  {
    label: 'User status',
    name: 'active',
    cql: 'active',
    values: [
      { name: 'Active', cql: 'true' },
      { name: 'Inactive', cql: 'false' },
    ],
  },
  {
    label: 'Patron group',
    name: 'pg',
    cql: 'patronGroup',
    values: [
      { name: 'On-Campus', cql: 'true' },
      { name: 'Visitor', cql: 'false' },
    ],
  },
];

class AccordionsDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: { active: { Active: true } },
      detailAccordions: {
        'demoAcc-1': true,
        'demoAcc-2': false,
      },
    };

    this.onToggleSection = this.onToggleSection.bind(this);
    this.onAddItem = this.onAddItem.bind(this);

    this.list = null;
  }

  onToggleSection({ id }) {
    this.setState((curState) => {
      const newState = curState;
      newState.detailAccordions[id] = !curState.detailAccordions[id];
      return newState;
    });
  }

  onChangeFilter(){ // eslint-disable-line
    return null;
  }

  onAddItem() {
    const li = document.createElement('li');
    const msg = document.createTextNode('New Item');
    li.appendChild(msg);
    this.list.appendChild(li);
  }


  render() {
    return (
      <Paneset>
        <Pane id="pane-filter" paneTitle="Filters" defaultWidth="16%">
          <FilterGroups config={filterConfig} filters={this.state.filters} onChangeFilter={this.onChangeFilter} />
        </Pane>
        <Pane defaultWidth="fill" paneTitle="Content">
          <AccordionSet accordionStatus={this.state.detailAccordions} onToggle={this.onToggleSection}>
            <Accordion label="TestAccordion" id="demoAcc-1">
              <ul ref={(ref) => { this.list = ref; }}>
                <li>Content</li>
                <li>Content</li>
                <li>Content</li>
                <li>Content</li>
              </ul>
              <Button onClick={this.onAddItem} >Add Item</Button>
              <p>Lorem ipsum delor sit amet</p>
            </Accordion>
            <Accordion label="TestAccordion2" id="demoAcc-2" displayWhenOpen={(<Button>Show history</Button>)}>
              <ul>
                <li>Content</li>
                <li>Content</li>
                <li>Content</li>
                <li>Content</li>
              </ul>
              <p>Lorem ipsum delor sit amet</p>
            </Accordion>
          </AccordionSet>
        </Pane>
      </Paneset>
    );
  }
}

export default AccordionsDemo;
