import React from "react";
import { Button, Header, Modal, Card, Icon } from "semantic-ui-react";
import AppointmentList from "./AppointmentList";

function AppointmentModal(props) {
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
          <Card.Content header="Appointment List" style={{ fontSize: "2em" }} />
          <Card.Content>
            <Icon size="massive" name="calendar plus" />
            <Header as="h2">Click for a full list of your appointments</Header>
          </Card.Content>
        </Card>
      }
    >
      <Modal.Content >
        <AppointmentList user={props.user} />
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

export default AppointmentModal;
