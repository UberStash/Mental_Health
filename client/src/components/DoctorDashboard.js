import React from 'react'
import { Button, Header, Image, Modal, Card, Icon, Grid, Responsive } from 'semantic-ui-react'
import SchedulerModal from './SchedulerModal'
import VideoChatModal from './VideoChatModal'
import MapModal from './MapModal'
import NewsModal from './NewsModal'
import AppointmentModal from './AppointmentModal'
import PatientListModal from './PatientListModal'




function DesktopContainer() {
  const [open, setOpen] = React.useState(false)

  return (
    <Grid >
      <Grid.Row width={12} centered><Header Responsive size='huge' inverted style={{fontSize: '3em'}}>DOCTOR DASHBOARD</Header></Grid.Row>
      <Grid.Row centered>
      <Grid.Column textAlign={'centered'} width={14}>
          <SchedulerModal  />
        </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
        <Grid.Column textAlign={'centered'} width={14}>
          <VideoChatModal />
        </Grid.Column>
      </Grid.Row>
      
      <Grid.Row centered>
      <Grid.Column textAlign={'centered'} width={14}>
          <PatientListModal />
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

export default DesktopContainer