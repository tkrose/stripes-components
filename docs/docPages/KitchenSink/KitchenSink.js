import React from 'react';
import TextField from '../../../lib/TextField';
import Select from '../../../lib/Select';
import RadioButtonGroup from '../../../lib/RadioButtonGroup';
import RadioButton from '../../../lib/RadioButton';
import Checkbox from '../../../lib/Checkbox';
import Button from '../../../lib/Button';
import TextArea from '../../../lib/TextArea';
import List from '../../../lib/List';
import MultiColumnList from '../../../lib/MultiColumnList';
import Icon from '../../../lib/Icon';
import { Row, Col, Grid } from '../../../lib/LayoutGrid';

const KitchenSink = () => {
  const spacer = { marginBottom: '1rem' };

  const listFormatter = item => (
    <li key={item.id}>
      <Grid>
        <Row>
          <Col xs={4}>
            {item.name}
          </Col>
          <Col xs={4}>
            {item.email}
          </Col>
        </Row>
      </Grid>
    </li>
  );

  const staticItems = [
    { name: 'Jane Doe', email: 'jane@thedoes.com', id: '1' },
    { name: 'John Doe', email: 'john@thedoes.com', id: '2' },
    { name: 'Phil Doe', email: 'phil@thedoes.com', id: '3' },
  ];

  return (
    <div>
      <section id="buttons">
        <h2>Button</h2>
        <Button>Basic Button</Button>
        <Button buttonStyle="primary hollow">Hollow Button</Button>
        <Button buttonStyle="secondary">Basic Button</Button>
        <Button buttonStyle="secondary hollow">Basic Button</Button>
        <Button buttonStyle="hover">Basic Button</Button>
        <Button buttonStyle="negative">Basic Button</Button>
        <Button buttonStyle="negative hollow">Basic Button</Button>
        <Button buttonStyle="transparent">Basic Button</Button>
      </section>
      <section id="form-elements">
        <h2>Form Elements</h2>
        <Row>
          <Col xs={6}>
            <TextField id="text1" label="Basic Textfield" />
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <Select id="select1" dataOptions={[{ label: 'Option 1' }, { label: 'Option 2' }]} label="Basic Select" fullWidth />
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <Checkbox id="easymodeCB" label="Enable easy mode!" onChange={() => null} />
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <RadioButtonGroup input={{ value: 'Yes' }} meta={{ touched: false }} onChange={() => null} name="ready" label="Ready to rock?">
              <RadioButton label="Yes" value="Yes" />
              <RadioButton label="No" value="No" />
            </RadioButtonGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <TextArea id="text2" label="Basic TextArea" fullWidth />
          </Col>
        </Row>
      </section>
      <section id="List">
        <h2>Lists</h2>
        <Row>
          <Col xs={6}>
            <h3>Basic List</h3>
            <List items={staticItems} itemFormatter={listFormatter} isEmptyMessage="list is empty" />
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <h3>Table</h3>
            <MultiColumnList contentData={staticItems} />
          </Col>
        </Row>
      </section>
      <section id="icons">
        <h2>Icons</h2>
        <Row>
          <Col xs={8}>
            <Row style={spacer}>
              <Col xs={4}>
                <Icon icon="bookmark" />bookmark
              </Col>
              <Col xs={4}>
                <Icon icon="search" />search
              </Col>
              <Col xs={4}>
                <Icon icon="clearX" />clearX
              </Col>
            </Row>
            <Row style={spacer}>
              <Col xs={4}>
                <Icon icon="comment" />comment
              </Col>
              <Col xs={4}>
                <Icon icon="edit" />edit
              </Col>
              <Col xs={4}>
                <Icon icon="hollowX" />hollowX
              </Col>
            </Row>
            <Row style={spacer}>
              <Col xs={4}>
                <Icon icon="eye" />eye
              </Col>
              <Col xs={4}>
                <Icon icon="plus-sign" />plus-sign
              </Col>
              <Col xs={4}>
                <Icon icon="calendar" />calendar
              </Col>
            </Row>
            <Row style={spacer}>
              <Col xs={4}>
                <Icon icon="up-arrow" />up-arrow
              </Col>
              <Col xs={4}>
                <Icon icon="down-arrow" />down-arrow
              </Col>
              <Col xs={4}>
                <Icon icon="closeX" />closeX
              </Col>
            </Row>
            <Row style={spacer}>
              <Col xs={4}>
                <Icon icon="left-arrow" />left-arrow
              </Col>
              <Col xs={4}>
                <Icon icon="right-arrow" />right-arrow
              </Col>
              <Col xs={4}>
                <Icon icon="spinner-ellipsis" />spinner
              </Col>
            </Row>
            <Row style={spacer}>
              <Col xs={4}>
                <Icon icon="down-caret" />down-caret
              </Col>
              <Col xs={4}>
                <Icon icon="up-caret" />up-caret
              </Col>
              <Col xs={4}>
                <Icon icon="trashBin" />trashBin
              </Col>
            </Row>
            <Row style={spacer}>
              <Col xs={4}>
                <Icon icon="left-double-chevron" />left-double-chevron
              </Col>
              <Col xs={4}>
                <Icon icon="right-double-chevron" />right-double-chevron
              </Col>
              <Col xs={4}>
                <Icon icon="right-double-chevron-bold" />right-double-chevron-bold
              </Col>
            </Row>
            <Row style={spacer}>
              <Col xs={4}>
                <Icon icon="left-double-chevron-bold" />left-double-chevron-bold
              </Col>
              <Col xs={4}>
                <Icon icon="validation-check" />validation-check
              </Col>
              <Col xs={4}>
                <Icon icon="validation-error" />validation-error
              </Col>
            </Row>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default KitchenSink;
