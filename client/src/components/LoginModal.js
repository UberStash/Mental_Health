import React, {Component} from "react";
import { Button, Header, Image, Modal, Form } from "semantic-ui-react";

import Login from "./LoginForm";



  class PostsList extends Component {
    state = {
      modalOpen: false,
    };
  
    handleOpen = () => this.setState({ modalOpen: true });
  
    handleClose = () => this.setState({ modalOpen: false });
  
    render() {
      return (
         <div>
           <Button as='a' inverted={true} onClick={this.handleOpen}>Login</Button>
            
            
            <Modal
              open={this.state.modalOpen}
              onClose={this.handleClose}
              closeIcon
              size={'tiny'}
            >
              <Modal.Header>Login</Modal.Header>
              <Modal.Content>
              <Modal.Description>
          Please Sign In To View Your Dashboard
              </Modal.Description>
                <Login handleClose={this.handleClose} />
              </Modal.Content>
            </Modal>
            

          </div>
       )
     }
  }


export default PostsList
