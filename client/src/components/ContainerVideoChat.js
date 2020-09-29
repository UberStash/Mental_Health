import React from 'react';
import VideoChat from './VideoChat';
import 'semantic-ui-css/semantic.min.css';
import { Container, Header, Grid, Icon } from 'semantic-ui-react';

const ContainerVideoChat = () => {
  return (
    <Container>
      <Grid.Row>
        <Grid.Column center>
         <Header as='h1' icon textAlign='center'>
            <Icon name='users' circular size='mini'  />
            <Header.Content>Video Chat</Header.Content>         
          </Header>
        </Grid.Column>
        <Grid.Column>
          <VideoChat />
        </Grid.Column>
      </Grid.Row>
    </Container>
  );
};

export default ContainerVideoChat;
