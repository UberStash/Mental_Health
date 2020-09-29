import React from 'react'
import { Button, Header, Image, Modal, Card, Icon, Responsive } from 'semantic-ui-react'
import AppointmentList from './AppointmentList'

function AppointmentModal() {
  const [open, setOpen] = React.useState(false)

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='large'
      centered
      trigger={ <Card raised fluid Responsive color='red' style={{backgroundColor: 'antiquewhite' }}>
        <Card.Content header='Appointment List' style={{ fontSize: "2em"}} />
        <Card.Content description={"A full list of your appointments"} />
        <Card.Content extra>
          <Icon name='user' />
        </Card.Content>
      </Card>}
    >
      
      <Modal.Content image>
       
       
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
