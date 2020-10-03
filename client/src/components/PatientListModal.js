import React, { useEffect } from "react";
import {
  Button,
  Header,
  Image,
  Modal,
  Card,
  Icon,
  Responsive,
  Segment,
  Divider,
} from "semantic-ui-react";
import PatientList from "./PatientList";



function AppointmentModal() {
  const [open, setOpen] = React.useState(false);
  const [patients, setPatients] = React.useState([]);

  
  // Promise.all([
  //   axios.get(`/api/days`),
  //   axios.get(`/api/appointments`),
  //   axios.get(`/api/interviewers`),
  // ]).then((all) => {
  //   setState((prev) => ({
  //     ...prev,
  //     days: all[0].data,
  //     appointments: all[1].data,
  //     interviewers: all[2].data,
  //   }));
  // });

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="large"
      centered
      trigger={
        <Card
          raised
          fluid
          Responsive
          color="grey"
          style={{ backgroundColor: "whitesmoke" }}
        >
          <Card.Content header="Your Patients" style={{ fontSize: "2em" }} />
          <Card.Content>
            <Icon name="hospital" size="massive"></Icon>
            <Header as="h2">Click for a full list of your Patients</Header>
            {/* <Header size='huge' inverted as='h4' attached='top' block>
        Your Next Appointment
      </Header>
      <Segment inverted size='large' attached>Doctor's Name: {nextAppt.doctor_name}</Segment>
      <Segment inverted size='large' attached>Clinic: {nextAppt.clinic_name}</Segment>
      <Segment inverted size='large' attached>{nextAppt.address}</Segment>
      <Segment inverted size='large' attached>{nextAppt.start_time.slice(0,16)}</Segment>
          */}
          </Card.Content>
        </Card>
      }
    >
      <Modal.Content centered>
        <PatientList />
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Close"
          labelPosition="right"
          icon="checkmark"
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}

export default AppointmentModal;
