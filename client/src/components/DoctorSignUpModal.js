import React, {Component} from "react";
import { Button, Header, Image, Modal, Form } from "semantic-ui-react";

import PSignUp from "./PatientSignUpForm";



  class PostsList extends Component {
    state = {
      modalOpen: false,
    };
  
    handleOpen = () => this.setState({ modalOpen: true });
  
    handleClose = () => this.setState({ modalOpen: false });
  
    render() {
      return (
         <div>
           <Button as='a' inverted={true} onClick={this.handleOpen}>Doctor Sign Up</Button>
            
            
            <Modal
              open={this.state.modalOpen}
              onClose={this.handleClose}
              closeIcon
            >
              <Modal.Header>Doctor Sign Up</Modal.Header>
              <Modal.Content>
              <Modal.Description>
          Please fill out all fields
              </Modal.Description>
                <PSignUp handleClose={this.handleClose} />
              </Modal.Content>
            </Modal>
            

          </div>
       )
     }
  }


export default PostsList
