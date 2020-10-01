import React from 'react'
import { Button, Header, Image, Modal, Card, Icon, Responsive } from 'semantic-ui-react'
import AppointmentList from './AppointmentList'
import Map from './Map'

function AppointmentModal() {
  const [open, setOpen] = React.useState(false)

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='large'
      centered
      trigger={ <Card raised fluid Responsive color='red' style={{backgroundColor: 'Red' }}>
        <Card.Content header='Directions' style={{ fontSize: "2em"}} />
        <Card.Content description={"Click Here for directions to your doctor's office!"} />
        <Card.Content extra>
          <Icon name='user' />
        </Card.Content>
      </Card>}
    >
      
      <Modal.Content image>
          <Map />
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
