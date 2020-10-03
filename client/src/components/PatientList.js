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
} from "semantic-ui-react";




let patientData;



function PatientsList() {
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
     <Segment inverted>
      {`Name: ${user.first_name} ${user.last_name} DOB: ${user.date_of_birth} Gender: ${user.gender} Diagnosis: ${user.diagnosis} Email: ${user.email} Health Card#: ${user.health_card} Phone#: ${user.phone} Address: ${user.patient_address}`}
      </Segment>
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
