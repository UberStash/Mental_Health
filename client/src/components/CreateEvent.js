import React, { Component } from "react";
import { Modal, Button, Header, Icon, Form, Checkbox } from "semantic-ui-react";


export default class CreteEvent extends Component {

  
  render() {
    return (
      <div>
        <Modal open={this.props.isOpen}>
          <Modal.Header>Create Event</Modal.Header>
          <Modal.Content>
            <Modal.Description>
            <Form onSubmit={this.handleSelect}>
          <Form.Group>
            <Form.Input
              placeholder={this}
              name='name'
              value={this}
              onChange={this.handleChange}
            />
            <Form.Input
              placeholder='Email'
              name='email'
              value={this.end}
              onChange={this.handleChange}
            />
            <Form.Button content='Submit' />
          </Form.Group>
        </Form>
            </Modal.Description>
          </Modal.Content>

          <Modal.Actions>
            <Button primary onClick={this.props.onClose}>
              Close <Icon name="right chevron" />
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
