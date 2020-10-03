import React from 'react';
import { Button, Header, Modal } from 'semantic-ui-react'
import PatientSignUpForm from './PatientSignUpForm';

function PatientSignUpModal() {
  const [open, setOpen] = React.useState(false)
  
  const handClose = () => { 
    setOpen(false);
  }

  return (
    <Modal 
      closeIcon
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button inverted={true}>Patient Sign Up</Button>}
    >
      <Modal.Header>Patient Sign Up</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <Header>Please Sign up</Header>
            <PatientSignUpForm handleClose={handClose} />
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

export default PatientSignUpModal;









// import React, {Component} from "react";
// import { Button, Header, Image, Modal, Form } from "semantic-ui-react";

// import PSignUp from "./PatientSignUpForm";



//   class PostsList extends Component {
//     state = {
//       modalOpen: false,
//     };
  
//     handleOpen = () => this.setState({ modalOpen: true });
  
//     handleClose = () => this.setState({ modalOpen: false });
  
//     render() {
//       return (
//          <div>
//            <Button as='a' inverted={true} onClick={this.handleOpen}>Patient Sign Up</Button>
            
            
//             <Modal
//               open={this.state.modalOpen}
//               onClose={this.handleClose}
//               closeIcon
//               size={'small'}
//             >
//               <Modal.Header>Patient Sign Up</Modal.Header>
//               <Modal.Content>
//               <Modal.Description>
//           Please fill out all fields
//               </Modal.Description>
//                 <PSignUp handleClose={this.handleClose} />
//               </Modal.Content>
//             </Modal>
            

//           </div>
//        )
//      }
//   }


// export default PostsList
