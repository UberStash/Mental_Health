import PropTypes from "prop-types";
import React, { Component, useState, useEffect } from "react";
import useApplicationData from "../hooks/useApplicationData";
import { getApptsPatient } from "./events";
import moment from "moment";

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
  Popup,
} from "semantic-ui-react";

function convertTime(time) {
  console.log(time);
  return moment
    .utc(time)
    .subtract(4, "hours")
    .format("YYYY-MM-DD HH:mm:ss.SSS");
}

function AppointmentList(props) {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = useState({
    list: [],
  });
  useEffect(() => {
    getApptsPatient(props.user.id).then((response) => {
      setState((prev) => ({
        ...prev,
        list: response,
      }));
    });
  }, []);

  console.log(state.list);

  const userList = state.list.map((user) => (
    <List.Item>
      <Popup
        content={
          <Grid>
            <Grid.Row>
              <Header as="h1">{user.clinic_name}</Header>
            </Grid.Row>
            <Grid.Row>
              <Header as="h3">
                Dr, {user.first_name}, {user.last_name}
              </Header>
            </Grid.Row>
            <Grid.Row>
              <Header as="h3">
                <Icon name="info" />
                Start Time:{" "}
                {convertTime(
                  user.appt_start.replace("T", " ").replace("Z", "")
                ).slice(0, 16)}
              </Header>
            </Grid.Row>
            <Grid.Row>
              <Header as="h3">
                <Icon name="info" />
                End Time:{" "}
                {convertTime(
                  user.appt_end.replace("T", " ").replace("Z", "")
                ).slice(0, 16)}
              </Header>{" "}
            </Grid.Row>
            <Grid.Row>
              <Header href={`mailto: ${user.email}`}>
                <Icon name="mail square" />
                {user.email}{" "}
              </Header>
            </Grid.Row>
            <Grid.Row>
              <Header href={`tel:${user.phone}`}>
                <Icon name="phone square" />
                {user.phone}
              </Header>
            </Grid.Row>
            <Grid.Row>
              <Header>
                <Icon name="address book" />
                {user.clinic_address}
              </Header>
            </Grid.Row>
            <Grid.Row>
              <Header>
                <Icon name="key" />
                {user.appt_password}
              </Header>
            </Grid.Row>
          </Grid>
        }
        on="click"
        basic
        flowing
        wide
        hideOnScroll
        style={{ maxWidth: "700px" }}
        trigger={
          <Segment inverted>
            <Header textAlign="center" as="h1">
              {convertTime(
                user.appt_start.replace("T", " ").replace("Z", "")
              ).slice(0, 16)}
            </Header>
          </Segment>
        }
      />
    </List.Item>
  ));

  return (
    <div className="App">
      <Header as="h1">Your Appointments</Header>

      {/* {state.loading && <h3>Loading...</h3>} */}

      <List size="huge">{userList}</List>
    </div>
  );
}

export default AppointmentList;
