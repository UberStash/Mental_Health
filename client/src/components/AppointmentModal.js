import React, {useEffect, useState} from 'react'
import { Button, Header, Image, Modal, Card, Icon, Responsive, Segment, Divider } from 'semantic-ui-react'
import AppointmentList from './AppointmentList'
import {getApptsPatient} from './events'


function AppointmentModal(props) {
  const [open, setOpen] = React.useState(false)
  
  

  return (

    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='large'
      centered
      trigger={ <Card raised fluid Responsive color='grey' style={{backgroundColor:'whitesmoke' }}>
        <Card.Content header='Appointment List' style={{ fontSize: "2em"}} />
        <Card.Content>
      <Icon size="massive" name="calendar plus" />
        <Header as='h2'>
        Click for a full list of your appointments
      </Header>
      {/* <Header as='h4' attached='top' block>
        Your Next Appointment
      </Header>
      <Segment inverted size='large'>Doctor's ID: {}</Segment>
           */}
        </Card.Content>
      </Card>}
    >
      
      <Modal.Content centered>
       
       
          <AppointmentList user={props.user}/>
      
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
