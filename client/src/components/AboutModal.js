import React, {Component} from "react";
import { Button, Header, Image, Modal, Form, Grid } from "semantic-ui-react";

import PSignUp from "./PatientSignUpForm";



  class About extends Component {
    state = {
      modalOpen: false,
    };
  
    handleOpen = () => this.setState({ modalOpen: true });
  
    handleClose = () => this.setState({ modalOpen: false });
  
    render() {
      return (
         <div>
           <Button as='a' inverted={true} onClick={this.handleOpen}>About</Button>
            
            
            <Modal
              open={this.state.modalOpen}
              onClose={this.handleClose}
              closeIcon
              size={'large'}
            >
              <Modal.Header>About</Modal.Header>
              <Modal.Content>
        
              <Grid container stackable verticalAlign="middle">
      <Grid.Row>
        <Grid.Column width={8}>
          <Header as="h3" style={{ fontSize: "2em" }}>
            We Help Patients and Doctors
          </Header>
          <p style={{ fontSize: "1.33em" }}>
          Health Lever virtual healthcare, supports doctors and helps their patients thrive. With more than 41 years of primary healthcare history, Health Lever's advantage is rooted in care and experience, creating a happy, healthy and stable patient base.
          Integrating our virtual healthcare provides easy access to physical and mental health support for your patients via messaging or video, 24/7, coast to coast.
 
 
 
          </p>
          <Header as="h3" style={{ fontSize: "2em" }}>
            We Make Make People Feel Better
          </Header>
          <p style={{ fontSize: "1.33em" }}>
          By leveraging technology and data, our dedicated customer success team supports your office teams to manage your patients health and well-being. 
  Using Helth Lever you will easily track your patients long-term needs on the phone or video and proactively manage each step of their health journey.
 Health Lever is available to all Canadian Doctors coast to coast to coast.
          </p>
        </Grid.Column>
        <Grid.Column floated="right" width={6}>
          <Image
            bordered
            rounded
            size="large"
            src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
          />
        </Grid.Column>
      </Grid.Row>
      
    </Grid>
              </Modal.Content>
            </Modal>
            

          </div>
       )
     }
  }


export default About