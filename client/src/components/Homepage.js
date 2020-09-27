import PropTypes from 'prop-types'
import React, { Component } from 'react'
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
} from 'semantic-ui-react'



function homepage() {
  return (
    <Grid container stackable verticalAlign="middle">
      <Grid.Row>
        <Grid.Column width={8}>
          <Header as="h3" style={{ fontSize: "2em" }}>
            We Help Patients and Doctors
          </Header>
          <p style={{ fontSize: "1.33em" }}>
            We consolidate all your medical needs into one place... we assist
            patients with all their medical needs and display indepth
            information and statistics to doctors.
          </p>
          <Header as="h3" style={{ fontSize: "2em" }}>
            We Make Make People Feel Better
          </Header>
          <p style={{ fontSize: "1.33em" }}>
            Yes that's right, you thought it was the stuff of dreams, but even
            the most dibilitated person can use our service with ease.
          </p>
        </Grid.Column>
        <Grid.Column floated="right" width={6}>
          <Image
            bordered
            rounded
            size="large"
            src="https://cusjc.ca/catalyst/wp-content/uploads/2018/04/mental-health-.jpg"
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column textAlign="center">
          <Button size="huge">Check Them Out</Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default homepage;
