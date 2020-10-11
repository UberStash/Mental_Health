import React from "react";
import { Button, Header, Modal } from "semantic-ui-react";
import LoginForm from "./LoginForm";

function LoginModal(props) {
  const [open, setOpen] = React.useState(false);

  const handClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        closeIcon
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button inverted={true}>Login</Button>}
      >
        <Modal.Header>Login</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Header>Please Login In To View Your Dashboard</Header>
            <LoginForm handleClose={handClose} login={props.login} />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </div>
  );
}

export default LoginModal;
