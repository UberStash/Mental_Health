import React from 'react';
import { Button, Header, Modal } from 'semantic-ui-react'
import LoginForm from './LoginForm';
import { checkPropTypes } from 'prop-types';

function LoginModal(props) {
  const [open, setOpen] = React.useState(false)
  
  const handClose = () => { 
    setOpen(false);
  }
console.log(props)
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
            <LoginForm handleClose={handClose} login={props.login}/>
        </Modal.Description>
      </Modal.Content>
    </Modal>
    </div>
  )
}

export default LoginModal;




// import React, {Component} from "react";
// import { Button, Header, Image, Modal, Form } from "semantic-ui-react";

// import Login from "./LoginForm";



//   class PostsList extends Component {
//     state = {
//       modalOpen: false,
//     };
  
//     handleOpen = () => this.setState({ modalOpen: true });
  
//     handleClose = () => this.setState({ modalOpen: false });
  
//     render() {
//       return (
//          <div>
//            <Button as='a' inverted={true} onClick={this.handleOpen}>Login</Button>
            
            
//             <Modal
//               open={this.state.modalOpen}
//               onClose={this.handleClose}
//               closeIcon
//               size={'tiny'}
//             >
//               <Modal.Header>Login</Modal.Header>
//               <Modal.Content>
//               <Modal.Description>
//           Please Sign In To View Your Dashboard
//               </Modal.Description>
//                 <Login handleClose={this.handleClose} />
//               </Modal.Content>
//             </Modal>
            

//           </div>
//        )
//      }
//   }


// export default PostsList
