import React from 'react';
import { Container, Header, Button, Form, Grid } from 'semantic-ui-react';

const Lobby = ({
  username,
  handleUsernameChange,
  roomName,
  handleRoomNameChange,
  handleSubmit,
  password
}) => {
  console.log(password)
  return (
    <Grid textAlign='center' style={{ height: '50vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
      <Form size='large' onSubmit={handleSubmit}>
      <Header textAlign='center' verticalAlign centered size='huge'>Welcome to your appointment, please enter your name</Header>
        
        <Form.Field>
          <Container>
            <label htmlFor="name">Enter Your Name:</label>
            <input
              type="text"
              id="field"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </Container>
        </Form.Field>
        <Form.Field>
          <Container>
            <label htmlFor="room">Your Password</label>
            <input
              type="text"
              id="room"
              value={password}
              onChange={handleRoomNameChange}
              required
            />
          </Container>
        </Form.Field>
        <Button type='submit' color='blue'>Start</Button>
      </Form>
      </Grid.Column>
    </Grid>
  );
};

export default Lobby;
