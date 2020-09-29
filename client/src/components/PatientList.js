import PropTypes from "prop-types";
import React, { Component } from "react";
import useApplicationData from '../hooks/useApplicationData';

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

const patientData = [
  {first_name: "Genji",
  last_name: "Tang",
  dob: "1950-04-02",
  gender: "M",
  diagnosis: "Adipisci velit, sed quianon numquam eius",
  email: "Genji@gmail.com",
  password: "test",
  health_card: "24681234",
  phone: "905-000-0000",
  patient_address: "224 King St W Toronto ON M5H 1K4 Canada",
  },
  {first_name: "Genji",
  last_name: "Tang",
  dob: "1950-04-02",
  gender: "M",
  diagnosis: "Adipisci velit, sed quianon numquam eius",
  email: "Genji@gmail.com",
  password: "test",
  health_card: "24681234",
  phone: "905-000-0000",
  patient_address: "224 King St W Toronto ON M5H 1K4 Canada",
  },
  {first_name: "Genji",
  last_name: "Tang",
  dob: "1950-04-02",
  gender: "M",
  diagnosis: "Adipisci velit, sed quianon numquam eius",
  email: "Genji@gmail.com",
  password: "test",
  health_card: "24681234",
  phone: "905-000-0000",
  patient_address: "224 King St W Toronto ON M5H 1K4 Canada",
  }
]


function patientsList() {
  // const { state, dispatch } = useApplicationData();

  const userList = patientData.map(user => (
    <List.Item>
     <Segment inverted>
      {`Name: ${user.first_name} ${user.last_name} DOB: ${user.dob} Gender: ${user.gender} Diagnosis: ${user.diagnosis} Email: ${user.email} Health Card#: ${user.health_card} Phone#: ${user.phone} Address: ${user.patient_address}`}
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

export default patientsList;
