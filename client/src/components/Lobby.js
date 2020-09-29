import React from 'react';
import { Container, Header, Button, Form, Grid } from 'semantic-ui-react';

const Lobby = ({
  username,
  handleUsernameChange,
  roomName,
  handleRoomNameChange,
  handleSubmit
}) => {
  return (
    <Grid textAlign='center' style={{ height: '50vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
      <Form size='large' onSubmit={handleSubmit}>
        <Header as='h2'>Enter a room</Header>
        <Form.Field>
          <Container>
            <label htmlFor="name">Name:</label>
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
            <label htmlFor="room">Room name:</label>
            <input
              type="text"
              id="room"
              value={roomName}
              onChange={handleRoomNameChange}
              required
            />
          </Container>
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
      </Grid.Column>
    </Grid>
  );
};

export default Lobby;
