import React from 'react';
import PropTypes from 'prop-types';

import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
} from 'react-router-dom';

import Pane from '../../../lib/Pane';
import Paneset from '../../../lib/Paneset';

import KitchenSink from '../KitchenSink';
import Login from '../Login';
import Date from '../Date';
// import Notifications from '../Notifications'; // needs bug fix - Transition component was removed from react-overlays.

class Root extends React.Component {
  static childContextTypes = {
    stripes: PropTypes.object,
  };

  getChildContext() {
    return {
      stripes: { locale: 'EN' },
    };
  }

  render() {
    return (
      <Router>
        <Paneset>
          <Pane defaultWidth="20%" paneTitle="menu">
            <div>
              <Link to="/components/">
                Kitchen Sink
              </Link>
            </div>
            <div>
              <Link to="/components/datepicker">
                Datepicker
              </Link>
            </div>
            <div>
              <Link to="/components/login">
                Login Screen
              </Link>
            </div>
            { /* <div>
              <Link to="/components/notifications">
                Toast Notifications
              </Link>
            </div> */}
          </Pane>
          <Pane defaultWidth="fill" paneTitle="">
            <Switch>
              <Route exact path="/components" component={KitchenSink} />
              <Route path="/components/datepicker" component={Date} />
              <Route path="/components/login" component={Login} />
              { /* <Route path="/components/notifications" component={Notifications} /> */}
            </Switch>
          </Pane>
        </Paneset>
      </Router>
    );
  }
}

export default Root;
