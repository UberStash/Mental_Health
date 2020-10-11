import React from "react";
import { Button, Header, Modal, Card, Icon } from "semantic-ui-react";
import News from "./News";

function NewsModal() {
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
          <Card.Content header="News" style={{ fontSize: "2em" }} />
          <Card.Content>
            <Icon name="newspaper" size="massive" />
            <Header as="h2">
              Click here For the latest mental health news
            </Header>
          </Card.Content>
        </Card>
      }
    >
      <Modal.Content image>
        <News />
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

export default NewsModal;
