import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import axios from "axios";

const LoginForm = (props) => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const newFields = { ...state, [e.target.name]: e.target.value };
    setState(newFields);
  };

  const login = (state) => {
    return axios
      .post(
        "http://localhost:3001/login",
        { ...state },
        { withCredentials: true }
      )
      .then((res) => {
        localStorage.setItem("authUser", JSON.stringify(res.data.user));
        return res.data;
      });
  };

  const handleSubmit = (e) => {
    login(state).then(props.handleClose);
    e.preventDefault();
    login(state).then((data) => {
      props.handleClose();
      props.login(data);
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
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
};

export default LoginForm;
