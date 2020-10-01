import React, { useEffect } from 'react'
import { Button, Header, Image, Modal, Card, Icon, Responsive, Grid, Container, Segment, List } from 'semantic-ui-react'
import AppointmentList from './AppointmentList'
import Scheduler from './scheduler'
import {getAppts} from './events'




function AppointmentModal() {
  const [open, setOpen] = React.useState(false)

  useEffect(() => {
  const appointments = getAppts()
  .then(response => {
    response.map((appt) => (
      <List.Item>Doctor's Name:</List.Item>
    ))
  })
});
  
        


  return (

    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='large'
      centered
      trigger={ <Card inverted raised fluid Responsive color='red' style={{backgroundColor: 'antiquewhite' }}>
        <Card.Content header='Book, Veiw and Change Patient Appointments' style={{ fontSize: "2em"}} />
        <Card.Content description={"Your Next 5 appointments:"} />
        <Card.Content extra>
        <List>{appointments}</List>
          
        </Card.Content>
      </Card>}
    >
      
      <Modal.Content centered>
          <Container >
          <Grid>
            <Grid.Row>
              <Grid.Column widescreen>
          <Scheduler />
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
