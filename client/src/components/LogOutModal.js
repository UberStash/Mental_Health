import React, { useEffect } from 'react';
import { Button, Header, Modal } from 'semantic-ui-react';
import axios from 'axios'

function LogOutModal(props) {

  const [open, setOpen] = React.useState(false)
 
  const handleClose = () => { 
    console.log("going herereeeeee")
      const user = {};
      axios.get('http://localhost:3001/logout')
      .then(() => props.logingOut(user))
      .then(() => setOpen(false) )

   
     
      
  }
  //onClick={() => window.location.reload(false)} was trying to do a hard code reload
console.log(props)
  return (
    <div>
    <Modal 
      closeIcon
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button inverted={true} >Log Out</Button>}
    >
      <Modal.Header>LogOut</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <Header>You are sure you want to log out</Header>
          <Button onClick={handleClose}> Log Out </Button>
        </Modal.Description>
      </Modal.Content>
    </Modal>
    </div>
  )
}

export default LogOutModal;




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
