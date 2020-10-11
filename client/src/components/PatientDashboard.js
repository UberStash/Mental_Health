import React, { useEffect, useState } from "react";
import {
  Header,
  Grid,
} from "semantic-ui-react";
import AppointmentModal from "./AppointmentModal";
import VideoChatModal from "./VideoChatModal";
import MapModal from "./MapModal";
import NewsModal from "./NewsModal";
import { getApptsPatient } from "./events";

function PatientDashboard(props) {
  const [state, setState] = useState({
    list: [],
  });
  useEffect(() => {
    getApptsPatient(2).then((response) => {
      const data = response;
      setState((prev) => ({
        ...prev,
        list: data,
      }));
    });
  }, []);

  return (
    <Grid>
      <Grid.Row width={12} centered>
        <Header size="huge" inverted style={{ fontSize: "3em" }}>
          Patient
        </Header>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column textAlign={"center"} width={14}>
          <AppointmentModal user={props.user} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column textAlign={"center"} width={14}>
          <VideoChatModal user={props.user} />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row centered>
        <Grid.Column textAlign={"center"} width={14}>
          <MapModal user={props.user} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column textAlign={"center"} width={14}>
          <NewsModal />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column textAlign={"center"} width={14}></Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default PatientDashboard;
