import React, { useState, useCallback, useEffect } from 'react';
import Lobby from './Lobby';
import Room from './Room';
import axios from "axios";
import {getApptsDoctor, getApptsPatient} from './events'

const checkUser = (user) => {
  
  if (user.clinic_address) {
  return getApptsDoctor(user.id)
  } else {
   return  getApptsPatient(user.id)
  }
}

const VideoChat = (props) => {
  const [username, setUsername] = useState('');
  const [roomName, setRoomName] = useState('');
  const [token, setToken] = useState(null);
  const [state, setState] = useState({
    appointmentList: []
  });
  useEffect(() => {
    
    checkUser(props.user)
    .then((response) => {
      console.log(response)
      setState((response) => ({
       appointmentList: response
      }))  
      console.log(state.appointmentList[0].id)
    });
  }, []);
 

console.log('state.appointmentList', state.appointmentList)
  const handleUsernameChange = useCallback(event => {
    setUsername(event.target.value);
  }, []);

  const handleRoomNameChange = useCallback(event => {
    setRoomName(event.target.value);
  }, []);

  const handleSubmit = useCallback(
    async event => {
      event.preventDefault();
      const data = await axios.post('http://localhost:3001/video/token', {
        identity: username,
        room: roomName
      }).then(res => {
        console.log(res.data.token);
        setToken(res.data.token);
      }).catch(err => console.log(err));
      console.log(data)
    },
    [roomName, username]
  );

  const handleLogout = useCallback(event => {
    setToken(null);
  }, []);

  let render;
  if (token) {
    render = (
      <Room roomName={roomName} token={token} handleLogout={handleLogout} />
    );
  } else {
    render = (
      <Lobby
        username={username}
        roomName={roomName}
        handleUsernameChange={handleUsernameChange}
        handleRoomNameChange={handleRoomNameChange}
        handleSubmit={handleSubmit}
      />
    );
  }
  return render;
};

export default VideoChat;
