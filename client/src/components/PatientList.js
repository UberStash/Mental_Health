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
  Modal,
  Popup
} from "semantic-ui-react";




let patientData;



function PatientsList(props) {
  const [open, setOpen] = React.useState(false)
  const [state, setState] = useState({
    list: []
  });
  useEffect(() => {
    
    getPatients(props.user.id).then((response) => {
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

    <Popup
    content={<Grid centered>
      <Header as='h1'>{user.first_name}, {user.last_name}</Header>
          <Grid.Row width={10}>
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
         }
    on='click'
    basic
    flowing
    wide
    hideOnScroll
    style={{maxWidth: '700px'}}
    trigger={<Segment inverted >
      <Header textAlign='center' as='h1'>{user.first_name}, {user.last_name}</Header> 
      <Header textAlign='center' as='h3'>{` DOB: ${user.date_of_birth.slice(0,10)} Gender: ${user.gender} Health Card#: ${user.health_card}`}</Header>
      </Segment>}
  /> 
    
    
   </List.Item>
  ));

  return (
    <div className='App'>
      <Header as='h1'>Your Patients</Header>

      {/* {state.loading && <h3>Loading...</h3>} */}

      <List>{userList}</List>
    </div>
  );
}

export default PatientsList;
