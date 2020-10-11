import React from "react";
import { Button, Header, Modal, Card, Icon } from "semantic-ui-react";
import PatientList from "./PatientList";

function PatientListModal(props) {
  const [open, setOpen] = React.useState(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="large"
      centered
      trigger={
        <Card
          raised
          fluid
          color="grey"
          style={{ backgroundColor: "whitesmoke" }}
        >
          <Card.Content header="Your Patients" style={{ fontSize: "2em" }} />
          <Card.Content>
            <Icon name="hospital" size="massive"></Icon>
            <Header as="h2">Click for a full list of your Patients</Header>
          </Card.Content>
        </Card>
      }
    >
      <Modal.Content centered>
        <PatientList user={props.user} />
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Close"
          labelPosition="right"
          icon="checkmark"
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}

export default PatientListModal;
