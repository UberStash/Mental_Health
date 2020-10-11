import React from "react";
import { Button, Header, Modal } from "semantic-ui-react";
import axios from "axios";

function LogOutModal(props) {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    const user = {};
    axios
      .get("http://localhost:3001/logout")
      .then(() => props.logingOut(user))
      .then(() => setOpen(false));
  };

  console.log(props);
  return (
    <div>
      <Modal
        closeIcon
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button inverted={true}>Log Out</Button>}
        centered
      >
        <Modal.Header>Log Out</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Header>Are you are sure you want to log out?</Header>
            <Button onClick={handleClose} color="red">
              {" "}
              Log Out{" "}
            </Button>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </div>
  );
}

export default LogOutModal;
