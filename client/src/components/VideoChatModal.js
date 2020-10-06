import React from 'react'
import { Button, Header, Image, Modal, Card, Icon, Responsive, Grid, Container, Segment } from 'semantic-ui-react'
import AppointmentList from './AppointmentList'
import VideoChat from './VideoChat'

// const checkStatus = (user) => {
//   console.log(user)
// if (!user) {
//  return <Homepage />
// } else if (user.clinic_address){
// return <DoctorDashboard user={user}/>

// } else if (user.health_card){
//   return <PatientDashboard user={user}/>
// }
// }

const checkUser = (user) => {
  if (user.clinic_address) {
    return
  }
}

function VideoChatModal(props) {
  const [open, setOpen] = React.useState(false)
  // const [state, setState] = useState({
  //   list: []
  // });
  // useEffect(() => {
    
  //   getApptsPatient(2).then((response) => {
  //     setState((prev) => ({
  //       ...prev,
  //       patientList: response
  //     }))  
      
  //   });
  // }, []);

let list = props
console.log(list)
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='large'
      centered
      style={{border: '8px solid black'}}
      trigger={ <Card inverted raised fluid Responsive color='grey' style={{backgroundColor:'whitesmoke' }}>
        <Card.Content header='Video Chat' style={{ fontSize: "2em"}} />
        <Card.Content>
          <Icon size='massive' name='video' />
  <Header as='h2'>Click Here to meet with: {}</Header> 
        </Card.Content>
      </Card>}
    >
      
      <Modal.Content centered >
          <Container >
          <Grid centered container stackable verticalAlign="middle">
            <Grid.Row>
              {/* <Grid.Column centered width={8}> */}
                
                <Header textAlign='center' verticalAlign centered size='huge'>Welcome to our video chat, please enter your name and password to enter the room.</Header>
                
          {/* </Grid.Column> */}
          {/* <Grid.Column width={8}> */}
          <VideoChat />
          {/* </Grid.Column> */}
          </Grid.Row>
          </Grid>
          </Container>
      </Modal.Content>
      <Modal.Actions>
        
        <Button
          content="Close"
          labelPosition='right'
          icon='close'
          onClick={() => setOpen(false)}
          
          color='red'
        />
      </Modal.Actions>
    </Modal>
  )
}

export default VideoChatModal
