import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Datepicker from '../../../lib/Datepicker';
import { Row, Col } from '../../../lib/LayoutGrid';

class Date extends React.Component {
  getChildContext() {
    return { stripes: { locale: 'EN' } };
  }

  render() {
    // const fieldControl = (<Button>Use This</Button>)

    return (
      <div>
        <Row>
          <Col xs={12}>
            <h2 style={{ marginTop: 0 }}>Datepicker</h2>
            <Row>
              <Col xs={6}>
                <Row>
                  <Col xs={12}>
                    <h3>Default Behavior</h3>
                    <p>Datepicker opens when the textfield is focused or when the calendar icon is clicked.</p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={6}>
                    <Datepicker label="Default Datepicker" />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <h3>Only Calendar Action</h3>
                    <p>Datepicker only opens by clicking the calender icon in the text field.</p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={6}>
                    <Datepicker label="Click calendar to open datepicker" useFocus={false} />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <h3>Remain open after choosing date</h3>
                    <p>Datepicker will remain open after the date is chosen, until focus is moved beyond the component.</p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={6}>
                    <Datepicker label="Remains open until out of focus" hideOnChoose={false} />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <h3>Alternative Format</h3>
                  </Col>
                </Row>
                <Row>
                  <Col xs={6}>
                    <Datepicker label="format: DD-MMM-YYYY" format="DD-MMM-YYYY" />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <h3>Internationalization</h3>
                  </Col>
                </Row>
                <Row>
                  <Col xs={6}>
                    <Datepicker label="german locale (de) with custom format" locale="de" format="dddd, MMMM Do YYYY" />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <h3>Excluded days</h3>
                  </Col>
                </Row>
                <Row>
                  <Col xs={6}>
                    <Datepicker label="exclude 03/01/2017 and yesterday" excludeDates={['03/01/2017', moment().subtract(1, 'days')]} />
                  </Col>
                </Row>
              </Col>
              <Col xs={6}>
                <h3>Features</h3>
                <dl>
                  <dt>Keyboard Navigation</dt>
                  <dd>
                    <ul>
                      <li><strong>Up Arrow</strong>: Move cursor up in the calendar (backwards 1 week)</li>
                      <li><strong>Down Arrow</strong>: Move cursor down in the calendar (forwards 1 week)</li>
                      <li><strong>Left Arrow</strong>: Move cursor left 1 day in the calendar (backwards 1 day)</li>
                      <li><strong>Left Arrow</strong>: Move cursor right 1 day in the calendar (forwards 1 day)</li>
                      <li><strong>PgUp</strong>: backwards 1 month</li>
                      <li><strong>PgDown</strong>: forwards 1 month</li>
                      <li><strong>Ctrl + PgUp</strong>: backwards 1 year</li>
                      <li><strong>Ctrl + PgDown</strong>: forwards 1 year</li>
                      <li><strong>Enter</strong>: Select date at cursor</li>
                      <li><strong>Esc</strong>: Close datepicker</li>
                    </ul>
                  </dd>
                  <dt>Mouse support</dt>
                  <dd>All navigation available via click/touch action</dd>
                  <dt>Custom format</dt>
                  <dd>MM/DD/YYYY is default, alternative formatting supported: <a href="https://momentjs.com/docs/#/displaying/format/">Moment.js formatting</a></dd>
                  <dt>Clear Value</dt>
                  <dd>Value can be cleared using the x that appears when a date is entered.</dd>
                  <dt>Screen Reader Support</dt>
                  <dd>Field label announcement with custom screen reader message. Reader communicates format, cursor movement, and confirms date entry.</dd>
                </dl>

              </Col>
            </Row>

          </Col>
        </Row>

      </div>
    );
  }
}

Date.childContextTypes = {
  stripes: PropTypes.object,
};

export default Date;
