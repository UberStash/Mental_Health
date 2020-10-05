import PropTypes from "prop-types";
import React, { Component, useState, useEffect } from "react";
import useApplicationData from "../hooks/useApplicationData";
import {getApptsPatient} from './events'

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
  Divider,
  Modal,
} from "semantic-ui-react";


function AppointmentList() {
  const [open, setOpen] = React.useState(false)
  const [state, setState] = useState({
    list: []
  });
  useEffect(() => {
    
    getApptsPatient(2).then((response) => {
      setState((prev) => ({
        ...prev,
        list: response
      }))  
      
    });
  }, []);
  
  console.log(state.list)

  const userList = state.list.map(user => (
    
    <List.Item>
     
    
     <Modal
     onClose={() => setOpen(false)}
     onOpen={() => setOpen(true)}
     open={open}
     trigger={<Segment inverted >
      <Header textAlign='center' as='h1'>{user.appt_start.slice(0,16).replace('T', " ")}</Header> 
      </Segment>}
   >
     <Modal.Content image>
       {/* <Image size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' wrapped /> */}
       <Modal.Description>
     <Grid>
     <Grid.Row>
     <Header as='h1'>{user.clinic_name}</Header>
     </Grid.Row>
     <Grid.Row>
     <Header as='h3'>Dr, {user.first_name}, {user.last_name}</Header>
     </Grid.Row>
         <Grid.Row>
         <Header as='h3'><Icon name='info' />Start Time: {user.appt_start.slice(0, 16).replace('T', " ")}</Header>
         </Grid.Row>
        <Grid.Row>
        <Header as='h3'><Icon name='info' />End Time: {user.appt_end.slice(0, 16).replace('T', " ")}</Header>         </Grid.Row>
         <Grid.Row>
         <Header href={`mailto: ${user.email}`}><Icon name='mail square' />{user.email}   </Header>
         </Grid.Row>
         <Grid.Row>
         <Header href={`tel:${user.phone}`}><Icon name='phone square'/>{user.phone}</Header>
         </Grid.Row>
         <Grid.Row>
         <Header><Icon name='address book'/>{user.clinic_address}</Header>
         </Grid.Row>
         </Grid>
         
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
    <div className="App">
      <Header as="h1">Your Appointments</Header>

      {/* {state.loading && <h3>Loading...</h3>} */}

      <List size='huge'>{userList}</List>
    </div>
  );
}

export default AppointmentList;
