import React from 'react';
import { Button, Header, Modal } from 'semantic-ui-react'
import DoctorSignUpForm from './DoctorSignUpForm';

function DoctorSignUpModal() {
  const [open, setOpen] = React.useState(false)
  
  const handClose = () => { 
    setOpen(false);
  }

  return (
    <div>
    <Modal 
      closeIcon
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button inverted={true}>Doctor Sign Up</Button>}
    >
      <Modal.Header>Doctor Sign Up</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <Header>Please Sign up</Header>
            <DoctorSignUpForm handleClose={handClose} />
        </Modal.Description>
      </Modal.Content>
    </Modal>
    </div>
  )
}

export default DoctorSignUpModal;
