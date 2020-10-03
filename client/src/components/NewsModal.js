import React from 'react'
import { Button, Header, Image, Modal, Card, Icon, Responsive } from 'semantic-ui-react'
import AppointmentList from './AppointmentList'
import VideoChat from './VideoChat'

function AppointmentModal() {
  const [open, setOpen] = React.useState(false)

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='large'
      centered
      trigger={ <Card raised fluid Responsive color='grey' style={{backgroundColor:'whitesmoke' }}>
        <Card.Content header='News' style={{ fontSize: "1.5em"}} />
        <Card.Content description={"Click Here For MEntal Health News!"} />
        <Card.Content>
          <Icon name='newspaper' size='massive'/>
        </Card.Content>
      </Card>}
    >
      
      <Modal.Content image>
          Insert news content here
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
