import React from "react";
import {
  Button,
  Header,
  Modal,
  Card,
  Icon,
  Grid,
  Container,
} from "semantic-ui-react";
import Scheduler from "./scheduler";

function SchedulerModal(props) {
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
          inverted
          raised
          fluid
          color="grey"
          style={{ backgroundColor: "whitesmoke" }}
        >
          <Card.Content
            header="Book, View and Change Appointments"
            style={{ fontSize: "2em" }}
          />

          <Card.Content>
            <Icon size="massive" name="calendar plus" />
            <Header as="h2">Book or delete patient appointment's here!</Header>
          </Card.Content>
        </Card>
      }
    >
      <Modal.Content centered>
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column widescreen>
                <Scheduler user={props.user} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
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

export default SchedulerModal;
