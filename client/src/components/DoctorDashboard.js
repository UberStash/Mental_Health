import React from 'react'
import { Button, Header, Image, Modal, Card, Icon, Grid } from 'semantic-ui-react'
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
      <Grid.Row centered><Header size='huge' style={{fontSize: '4em'}}>DOCTOR DASHBOARD</Header></Grid.Row>
      <Grid.Row centered>
      <Grid.Column textAlign={'centered'} width={12}>
          <SchedulerModal  />
        </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
        <Grid.Column textAlign={'centered'} width={12}>
          <VideoChatModal />
        </Grid.Column>
      </Grid.Row>
      
      <Grid.Row centered>
      <Grid.Column textAlign={'centered'} width={12}>
          <PatientListModal />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
      <Grid.Column textAlign={'centered'} width={12}>
          <NewsModal />
        </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
        <Grid.Column textAlign={'centered'} width={12}>
          <AppointmentModal />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default DesktopContainer
