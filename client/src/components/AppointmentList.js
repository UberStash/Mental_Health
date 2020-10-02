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
  Divider
} from "semantic-ui-react";


function AppointmentList() {
  const [state, setState] = useState({
    list: []
  });
  useEffect(() => {
    
    getApptsPatient(2).then((response) => {
      setState((prev) => ({
        ...prev,
        list: response
      }))  
      // console.log(state.list)
     
    });
  }, []);


  const userList = state.list.map(user => (
    
    <List.Item>
     <Segment inverted>
      {`Name: ${user.title} Doctor Id(change to name using join): ${user.user_doctor_id} Start Time: ${user.appt_start.slice(0, 16)} End Time: ${user.appt_end.slice(0, 16)}`}
      </Segment>
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
