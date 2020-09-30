import React from 'react'
import { Button, Header, Image, Modal, Card, Icon, Responsive, Segment, Divider } from 'semantic-ui-react'
import AppointmentList from './AppointmentList'


const nextAppt = {
  doctor_name: 'jack Johnson',
  clinic_name: 'Happy Land',
  address: '123 Edward St Suite 1103 Toronto ON M5G 1E2 Canada',
  start_time: '2020-10-18 13:00:00',
   end_time: '2020-10-18 13:00:00'
}
function AppointmentModal() {
  const [open, setOpen] = React.useState(false)

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='large'
      centered
      trigger={ <Card raised fluid Responsive color='grey' style={{backgroundColor: 'antiquewhite' }}>
        <Card.Content header='Appointment List' style={{ fontSize: "2em"}} />
        <Card.Content>
        <Header as='h2'>
        Click for a full list of your appointments
      </Header>
      <Header as='h4' attached='top' block>
        Your Next Appointment
      </Header>
      <Segment attached>Doctor's Name: {nextAppt.doctor_name}</Segment>
      <Segment attached>Clinic: {nextAppt.clinic_name}</Segment>
      <Segment attached>{nextAppt.address}</Segment>
      <Segment attached>{nextAppt.start_time.slice(0,16)}</Segment>
         
        </Card.Content>
      </Card>}
    >
      
      <Modal.Content centered>
       
       
          <AppointmentList />
      
      </Modal.Content>
      <Modal.Actions>
        
        <Button
          content="Close"
          labelPosition='right'
          icon='checkmark'
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default AppointmentModal
