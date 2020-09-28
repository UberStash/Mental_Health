import React, {Component} from "react";
import { Button, Header, Image, Modal, Form, Grid, Icon } from "semantic-ui-react";

import PSignUp from "./PatientSignUpForm";



  class Contact extends Component {
    state = {
      modalOpen: false,
    };
  
    handleOpen = () => this.setState({ modalOpen: true });
  
    handleClose = () => this.setState({ modalOpen: false });
  
    render() {
      return (
         <div>
           <Button as='a' inverted={true} onClick={this.handleOpen}>Contact Us</Button>
            
            
            <Modal
              open={this.state.modalOpen}
              onClose={this.handleClose}
              closeIcon
            >
              <Modal.Header>Contact Us</Modal.Header>
              <Modal.Content>
             
              <Grid container stackable verticalAlign="middle">
      <Grid.Row>
        <Grid.Column width={8}>
          <Header as="h3" style={{ fontSize: "2em" }}>
            We Help Patients and Doctors
          </Header>
          <p style={{ fontSize: "1.33em" }}>
          We can’t wait to connect with you!
Whether you’re looking for answers, want help with an issue, or want a personalized demo of the software, we’re excited to get in touch with you! Fill out the form below to be connected to one of our friendly team members. You can also chat with us, call us, email us, or visit our Support Portal any time.
          </p>
         
        </Grid.Column>
        <Grid.Column floated="right" width={6}>
          <Image
            bordered
            rounded
            size='huge'
            src="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column textAlign="center" width={5}>
        <Header as="h3" style={{ fontSize: "2em" }}>
            Email Us!
          </Header>
        <Icon name="envelope outline" size={'big'}/>
        
        </Grid.Column>
        <Grid.Column textAlign="center" width={6}>
        <Header as="h3" style={{ fontSize: "2em" }}>
            Call Us!
          </Header>
        <Icon name="phone" size={'big'}/>
        </Grid.Column>
        <Grid.Column textAlign="center" width={5}>
        <Header as="h3" style={{ fontSize: "2em" }}>
            Support Line
          </Header>
        <Icon name="life ring outline" size={'big'}/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>

      </Grid.Row>
    </Grid>
              </Modal.Content>
            </Modal>
            

          </div>
       )
     }
  }


export default Contact
