import React from "react";
import { Button, Header, Modal, Card, Icon, Grid } from "semantic-ui-react";

import Map from "./Map";

function MapModal(props) {
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
          <Card.Content header="Directions" style={{ fontSize: "2em" }} />
          <Card.Content>
            <Icon name="map signs" size="massive" />
            <Header as="h2">
              Click here for directions to your doctor's office
            </Header>
          </Card.Content>
        </Card>
      }
    >
      <Modal.Content centered>
        <Grid centered>
          <Map user={props.user} />
        </Grid>
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

export default MapModal;
