import React, { useEffect } from 'react'
import { Button, Header, Image, Modal, Card, Icon, Responsive, Grid, Container, Segment, List } from 'semantic-ui-react'
import AppointmentList from './AppointmentList'
import Scheduler from './scheduler'
import {getAppts} from './events'




function AppointmentModal() {
  const [open, setOpen] = React.useState(false)


  
//   const appointments = 
//   useEffect(() => {
//     getAppts()
//   .then(response => {
//     response.map((appt) => (
//       <List.Item>{appt}</List.Item>
//     ))
//   })
// });
  
        


  return (

    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='large'
      centered
      trigger={ <Card inverted raised fluid Responsive color='grey' style={{backgroundColor:'whitesmoke' }}>
        <Card.Content> 
         <Header style={{ fontSize: "2em"}}>Book, Veiw and Change Patient Appointments</Header>
         </Card.Content>
        <Card.Content>
        {/* <List>{appointments}</List> */}
        <Icon size="massive" name="calendar plus" /> 
        <Header as='h2'>Book or delete patient appointment's here!</Header>
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
