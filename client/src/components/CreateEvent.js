import React, { Component, useState  } from "react";
import { Modal, Button, Header, Icon, Form, Checkbox } from "semantic-ui-react";





class FormExampleCaptureValues extends Component {
  state = { name: '', patientId: '', submittedName: '', submittedId: '' }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { name, patientId } = this.state

    this.setState({ submittedName: name, submittedId: patientId })
  }

  render() {
    const { name, patientId, submittedName, submittedId } = this.state

    return (
      <div>
        <Modal open={this.props.isOpen}>
          <Modal.Header>Create Event</Modal.Header>
          <Modal.Content>
            <Modal.Description>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input
              placeholder='Name'
              name='name'
              value={name}
              onChange={this.handleChange}
            />
            <Form.Input
              placeholder='Paitent Id'
              name='patientId'
              value={patientId}
              onChange={this.handleChange}
            />
            <Form.Button content='Submit' />
          </Form.Group>
        </Form>
        <strong>onChange:</strong>
        <pre>{JSON.stringify({ name, patientId }, null, 2)}</pre>
        <strong>onSubmit:</strong>
        <pre>{JSON.stringify({ submittedName, submittedId }, null, 2)}</pre>
        </Modal.Description>
          </Modal.Content>

          <Modal.Actions>
            <Button primary onClick={this.props.onClose}>
              Close <Icon name="right chevron" />
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default FormExampleCaptureValues






// export default class CreateEvent extends Component {
//   render() {
//     return (
//       <div>
//         <Modal open={this.props.isOpen}>
//           <Modal.Header>Create Event</Modal.Header>
//           <Modal.Content>
//             <Modal.Description>
//             <Form onSubmit={() => this.handleSubmit}>
//           <Form.Group>
//             <Form.Input
//               placeholder='Patient Name'
//               name='name'
//               type='text'
//               value={name}
//               onChange={this.handleChange}
//             />
//             <Form.Input
//               placeholder='Patient ID'
//               name='Patient ID'
//               value={this.id}
//               onChange={this.handleChange}
//             />
//             <Form.Button content='Submit' />
//           </Form.Group>
//         </Form>
//             </Modal.Description>
//           </Modal.Content>

//           <Modal.Actions>
//             <Button primary onClick={this.props.onClose}>
//               Close <Icon name="right chevron" />
//             </Button>
//           </Modal.Actions>
//         </Modal>
//       </div>
//     );
//   }
// }
