import PropTypes from "prop-types";
import React, { Component, useEffect, useState } from "react";
import useApplicationData from '../hooks/useApplicationData';
import { getPatients } from "./events";


import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility,
  Modal
} from "semantic-ui-react";




let patientData;



function PatientsList() {
  const [open, setOpen] = React.useState(false)
  const [state, setState] = useState({
    list: []
  });
  useEffect(() => {
    
    getPatients(2).then((response) => {
      setState((prev) => ({
        ...prev,
        list: response
      }))  
      // console.log(state.list)
      patientData = response
    });
  }, []);


  const userList = state.list.map(user => (
    <List.Item>
     
    
     <Modal
     onClose={() => setOpen(false)}
     onOpen={() => setOpen(true)}
     open={open}
     trigger={<Segment inverted >
      <Header textAlign='center' as='h1'>{user.first_name}, {user.last_name}</Header> 
      <Header textAlign='center' as='h3'>{` DOB: ${user.date_of_birth.slice(0,10)} Gender: ${user.gender} Health Card#: ${user.health_card}`}</Header>
      </Segment>}
   >
     <Modal.Content image>
       {/* <Image size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' wrapped /> */}
       <Modal.Description>
     <Grid>
     <Header as='h1'>{user.first_name}, {user.last_name}</Header>
         <Grid.Row>
         <Header as='h3'><Icon name='info' />DOB: {user.date_of_birth.slice(0, 10)} GENDER: {user.gender}    HEALTH CARD: #{user.health_card}</Header>
         </Grid.Row>
         <Grid.Row>
         <Header><Icon name='address book' />{user.patient_address}</Header>
         </Grid.Row>
         <Grid.Row>
         <Header href={`mailto: ${user.email}`}><Icon name='mail square' />{user.email}   </Header>
         </Grid.Row>
         <Grid.Row>
         <Header href={`tel:${user.phone}`}><Icon name='phone square'/>{user.phone}</Header>
         </Grid.Row>
         </Grid>
         <Header as='h3'>Diagnosis</Header>
         <p>
         {user.diagnosis}
         </p>
       </Modal.Description>
     </Modal.Content>
     <Modal.Actions>
       <Button
         content="Done"
         labelPosition='right'
         icon='checkmark'
         onClick={() => setOpen(false)}
         positive
       />
     </Modal.Actions>
   </Modal>
   </List.Item>
  ));

  return (
    <div className='App'>
      <Header as='h1'>Your Patients</Header>

      {/* {state.loading && <h3>Loading...</h3>} */}

      <Container>{userList}</Container>
    </div>
  );
}

export default PatientsList;
