import React from 'react';
import logo from './logo.svg';
import './App.scss';
import useApplicationData from './hooks/useApplicationData';
import { Button } from 'semantic-ui-react'

function App() {
  // const { state, dispatch } = useApplicationData();

  // const userList = state.users.map(user => (
  //   <li key={user.email}>
  //     {user.first_name} {user.last_name} {user.email}
  //   </li>
  // ));

  // return (


    
  //   <div className='App'>
  //     <h1>Users</h1>

  //     {state.loading && <h3>Loading...</h3>}

  //     <ul>{!state.loading && userList}</ul>
  //   </div>
  // );
  return(
<div>
    <Button loading>Loading</Button>
    <Button basic loading>
      Loading
    </Button>
    <Button loading primary>
      Loading
    </Button>
    <Button loading secondary>
      Loading
    </Button>
  </div>
  )
}

export default App;