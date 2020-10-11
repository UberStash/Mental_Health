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
import VideoChat from "./VideoChat";

function VideoChatModal(props) {
  const [open, setOpen] = React.useState(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="large"
      centered
      style={{ border: "8px solid black" }}
      trigger={
        <Card
          raised
          fluid
          color="grey"
          style={{ backgroundColor: "whitesmoke" }}
        >
          <Card.Content header="Video Chat" style={{ fontSize: "2em" }} />
          <Card.Content>
            <Icon size="massive" name="video" />
            <Header as="h2">
              Click here to meet with{" "}
              {props.user.clinic_address ? "your Patient" : "your Doctor"}
            </Header>
          </Card.Content>
        </Card>
      }
    >
      <Modal.Content centered>
        <Container>
          <Grid centered container stackable verticalAlign="middle">
            <Grid.Row>
              <VideoChat user={props.user} />
            </Grid.Row>
          </Grid>
        </Container>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Close"
          labelPosition="right"
          icon="close"
          onClick={() => setOpen(false)}
          color="red"
        />
      </Modal.Actions>
    </Modal>
  );
}

export default VideoChatModal;
