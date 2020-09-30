import PropTypes from "prop-types";
import React, { Component } from "react";
import useApplicationData from "../hooks/useApplicationData";

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

const appointmentData = [
  {
    doctor_name: "jack Johnson",
    clinic_name: "Happy Land",
    address: "123 Edward St Suite 1103 Toronto ON M5G 1E2 Canada",
    start: "2020-10-18 12:30:00",
    end: "2020-10-18 13:00:00",
  },
  {
    doctor_name: "jack Johnson",
    clinic_name: "Happy Land",
    address: "123 Edward St Suite 1103 Toronto ON M5G 1E2 Canada",
    start: "2020-10-18 12:30:00",
    end: "2020-10-18 13:00:00",
  },
  {doctor_name: 'jack Johnson',
    clinic_name: "Happy Land",
    address: '123 Edward St Suite 1103 Toronto ON M5G 1E2 Canada',
    start:'2020-10-18 12:30:00',
    end: '2020-10-18 13:00:00'}

];

function appointmentList() {
  // const { state, dispatch } = useApplicationData();

  const apptList = appointmentData.map((appt) => (
    <List.Item >
      <Segment>
      <Segment attached>Doctor's Name: {appt.doctor_name}</Segment>
      <Segment attached>Clinic: {appt.clinic_name}</Segment>
      <Segment attached>{appt.address}</Segment>
      <Segment attached>{appt.start.slice(0,16)}</Segment>
      </Segment>
    </List.Item>
  ));

  return (
    <div className="App">
      <Header as="h1">Your Appointments</Header>

      {/* {state.loading && <h3>Loading...</h3>} */}

      <List size='huge'>{apptList}</List>
    </div>
  );
}

export default appointmentList;
