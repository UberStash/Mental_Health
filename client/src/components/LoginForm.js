import React, { useState, useEffect } from "react";
import { Form, Button } from "semantic-ui-react";
import axios from 'axios';
// src/components/Login.js


const LoginForm = () => {
  
  const [state, setState] = useState({
      email: "",
      password: ""
  });

  const handleChange = (e) => {
    const newFields = { ...state, [e.target.name]: e.target.value };
    setState(newFields);
  };

  const handleSubmit = (e) => {
    console.log("20")
    e.preventDefault();
    

       return axios.post('http://localhost:3001/login', {state})
      
                  .then((res) => console.log(res))
                  .then(() => props.handleClose())
                  .catch(err => console.log(err));
 
  };

 

    return (
      <Form
      onSubmit={ handleSubmit }
      >
        <Form.Field>
          <label htmlFor="email">Email</label>
          <input
            className="email"
            type="text"
            name="email"
            placeholder="Email"
            value={state.email}
            onChange={handleChange}
          ></input>
        </Form.Field>
        <Form.Field>
          <label htmlFor="username">Password</label>
          <input
            className="password"
            type="password"
            name="password"
            placeholder="Password"
            value={state.password}
            onChange={handleChange}
          ></input>
        </Form.Field>
        <Button>Log In</Button>
      </Form>
    );

}

export default LoginForm;
