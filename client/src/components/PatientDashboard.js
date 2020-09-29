import React from 'react'
import { Button, Header, Image, Modal, Card, Icon, Grid } from 'semantic-ui-react'
import AppointmentModal from './AppointmentModal'
import VideoChatModal from './VideoChatModal'




function DesktopContainer() {
  const [open, setOpen] = React.useState(false)

  return (
    <Grid >
      <Grid.Row centered><Header size='huge' style={{fontSize: '4em'}}>PATIENT DASHBOARD</Header></Grid.Row>
      <Grid.Row>
        <Grid.Column width={8}>
          <AppointmentModal />
        </Grid.Column>
        <Grid.Column width={8}>
          <VideoChatModal />
        </Grid.Column>
      </Grid.Row>
      
      <Grid.Row centered>
        <Grid.Column width={10}>
          <AppointmentModal />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={8}>
          <AppointmentModal />
        </Grid.Column>
        <Grid.Column width={8}>
          <AppointmentModal />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default DesktopContainer
