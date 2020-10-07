import React, {useEffect, useState} from 'react'
import { Button, Header, Image, Modal, Card, Icon, Grid } from 'semantic-ui-react'
import AppointmentModal from './AppointmentModal'
import VideoChatModal from './VideoChatModal'
import MapModal from './MapModal'
import NewsModal from './NewsModal'
import { getApptsPatient } from './events'


function PatientDashboard(props) {
  const [open, setOpen] = React.useState(false)
  const [state, setState] = useState({
    list: []
  });
  useEffect(() => {
    
    getApptsPatient(2).then((response) => {
     const data = response
      setState((prev) => ({
        ...prev,
        list: data
      }))  
      
    });
  }, []);


  return (
    <Grid >
      <Grid.Row width={12} centered><Header Responsive size='huge' inverted style={{fontSize: '3em'}}>YOUR DASHBOARD</Header></Grid.Row>
      <Grid.Row centered>
      <Grid.Column textAlign={'centered'} width={14}>
      <AppointmentModal user={props.user} />
        </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
        <Grid.Column textAlign={'centered'} width={14}>
          <VideoChatModal user={props.user}/>
        </Grid.Column>
      </Grid.Row>
      
      <Grid.Row centered>
      <Grid.Column textAlign={'centered'} width={14}>
      <MapModal user={props.user}/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
      <Grid.Column textAlign={'centered'} width={14}>
          <NewsModal />
        </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
        <Grid.Column textAlign={'centered'} width={14}>
          {/* <AppointmentModal /> */}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default PatientDashboard


// function DesktopContainer() {
//   const [open, setOpen] = React.useState(false)

//   return (
//     <Grid >
//       <Grid.Row centered><Header size='huge' style={{fontSize: '4em'}}>PATIENT DASHBOARD</Header></Grid.Row>
//       <Grid.Row centered>
//       <Grid.Column textAlign={'centered'} width={12}>
//           <AppointmentModal  />
//         </Grid.Column>
//         </Grid.Row>
//         <Grid.Row centered>
//         <Grid.Column textAlign={'centered'} width={12}>
//           <VideoChatModal />
//         </Grid.Column>
//       </Grid.Row>
      
//       <Grid.Row centered>
//       <Grid.Column textAlign={'centered'} width={12}>
//           <MapModal />
//         </Grid.Column>
//       </Grid.Row>
//       <Grid.Row centered>
//       <Grid.Column textAlign={'centered'} width={12}>
//           <NewsModal />
//         </Grid.Column>
//         </Grid.Row>
//         <Grid.Row centered>
//         <Grid.Column textAlign={'centered'} width={12}>
//           <AppointmentModal />
//         </Grid.Column>
//       </Grid.Row>
//     </Grid>
//   )
// }

// export default DesktopContainer
