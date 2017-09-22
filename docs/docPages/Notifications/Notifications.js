import React from 'react';
import _ from 'lodash';
import Toast from './Toast';
import Button from '../../../lib/Button';
import Layout from '../../../lib/Layout';
import Icon from '../../../lib/Icon';

import { Row, Col } from '../../../lib/LayoutGrid';

class Notifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notifications: [],
    };

    this.handleHide = this.handleHide.bind(this);
    this.notify = this.notify.bind(this);
  }

  handleHide(id) {
    const noteIndex = this.state.notifications.findIndex(note => note.id === id);
    const messages = this.shallowCopy(this.state.notifications);
    messages.splice(noteIndex, 1);
    this.setState({
      notifications: messages,
    });
  }

  notify(messageObj) {
    const messages = _.cloneDeep(this.state.notifications);

    if (Array.isArray(messageObj)) {
      messageObj.forEach((msg) => {
        const res = Object.assign(msg, { id: _.uniqueId() });
        messages.push(res);
      }, this);
    } else {
      const resMsgObj = Object.assign(messageObj, { id: _.uniqueId() });
      messages.unshift(resMsgObj);
    }
    this.setState({
      notifications: messages,
    });
  }


  render() {
    return (
      <div>
        <Toast notifications={this.state.notifications} onHide={this.handleHide} />
        <Row><Col sm={12}><h2>Toast Notifications</h2>
          <p>A basic, self-expiring notification pop-up. By default, it goes away after 6 seconds, but it can be set to last longer, or be dismissed by the user.</p>
        </Col></Row>
        <Row><Col sm={3}>
          <Button
            buttonStyle="secondary fullWidth"
            onClick={() => { this.notify({ message: "It's a toast notification!" }); }}
          >
            Default Notification
          </Button>
        </Col></Row>
        <Row><Col sm={12}><h3 style={{ marginTop: 0 }}>Notification types</h3>
          <p>Can represent the nature of the message with a variety of built-in styles</p>
        </Col></Row>
        <Row><Col sm={3}>
          <Button
            buttonStyle="error fullWidth"
            onClick={() => { this.notify({ message: 'This is an error!', type: 'error' }); }}
          >
            Error Notification
          </Button>
        </Col></Row>
        <Row><Col sm={3}>
          <Button
            buttonStyle="primary fullWidth"
            onClick={() => { this.notify({ message: 'Action completed successfully!', type: 'success' }); }}
          >
            Success Notification
          </Button>
        </Col></Row>
        <Row><Col sm={12}><h3 style={{ marginTop: 0 }}>Positioning</h3>
          <p>Can be positioned in any corner of the screen...</p>
        </Col></Row>
        <Row><Col sm={3}>
          <Button
            buttonStyle="secondary fullWidth"
            onClick={() => { this.notify({ message: "Options: {position: 'start'}", position: 'start' }); }}
          >
            Left (start) positioning
          </Button>
        </Col></Row>
        <Row><Col sm={3}>
          <Button
            buttonStyle="secondary fullWidth"
            onClick={() => { this.notify({ message: "Options: {position: 'top'}", position: 'top' }); }}
          >
            Top positioning
          </Button>
        </Col></Row>
        <Row><Col sm={12}><h3 style={{ marginTop: 0 }}>Custom content</h3>
          <p>Developer can supply custom content</p>
        </Col></Row>
        <Row><Col sm={3}>
          <Button
            buttonStyle="secondary fullWidth"
            onClick={() => {
              this.notify({
                message: (
                  <Layout className="flex centerItems">
                    <Icon width="30px" height="30px" icon="search" />
                      You&rsquo;ve discovered a new thing!
                  </Layout>
                ),
              });
            }}
          >
            Custom content
          </Button>
        </Col></Row>
        <Row><Col sm={12}><h3 style={{ marginTop: 0 }}>Stackable</h3>
          <p>If multiple notifications are present, they stack seamlessly</p>
        </Col></Row>
        <Row><Col sm={3}>
          <Button
            buttonStyle="secondary fullWidth"
            onClick={
              () => {
                this.notify([{ message: 'Stack' }, { message: 'Those' }, { message: 'Toasts!' }]);
              }
            }
          >
            Stack them!
          </Button>
        </Col></Row>
        <Row><Col sm={12}><h3 style={{ marginTop: 0 }}>Custom Timeout</h3>
          <p>Notification can last longer or be set to only dismiss with user interaction.</p>
        </Col></Row>
        <Row><Col sm={3}>
          <Button
            buttonStyle="secondary fullWidth"
            onClick={() => { this.notify({ message: 'User Dismissed', timeout: 0 }); }}
          >
            User Dismissed
          </Button>
        </Col></Row>
      </div>
    );
  }
}

export default Notifications;
