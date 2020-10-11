import React from "react";
import { Header, Grid } from "semantic-ui-react";
import SchedulerModal from "./SchedulerModal";
import VideoChatModal from "./VideoChatModal";
import NewsModal from "./NewsModal";
import PatientListModal from "./PatientListModal";

function DesktopContainer(props) {
  const [open, setOpen] = React.useState(false);

  return (
    <Grid>
      <Grid.Row width={12} centered>
        <Header size="huge" inverted style={{ fontSize: "3em" }}>
          Doctor {props.loggedInStatus}
        </Header>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column textAlign={"centered"} width={14}>
          <SchedulerModal user={props.user} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column textAlign={"centered"} width={14}>
          <VideoChatModal user={props.user} />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row centered>
        <Grid.Column textAlign={"centered"} width={14}>
          <PatientListModal user={props.user} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column textAlign={"centered"} width={14}>
          <NewsModal />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column textAlign={"centered"} width={14}></Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default DesktopContainer;
