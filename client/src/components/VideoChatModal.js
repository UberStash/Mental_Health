import React from 'react'
import { Button, Header, Image, Modal, Card, Icon, Responsive, Grid, Container } from 'semantic-ui-react'
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
      trigger={ <Card inverted raised fluid Responsive color='red' style={{backgroundColor: 'antiquewhite' }}>
        <Card.Content header='Video Chat' style={{ fontSize: "2em"}} />
        <Card.Content description={"Click Here to meet with your Doctor!"} />
        <Card.Content extra>
          <Image size='medium' src="https://cdn.pixabay.com/photo/2020/05/10/21/56/video-call-5155662_960_720.png" />
        </Card.Content>
      </Card>}
    >
      
      <Modal.Content centered>
          <Container >
          <Grid>
            <Grid.Row>
              <Grid.Column widescreen>
          <VideoChat />
          </Grid.Column>
          </Grid.Row>
          </Grid>
          </Container>
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
