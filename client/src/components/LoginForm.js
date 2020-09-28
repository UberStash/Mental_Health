import { Form, Button } from "semantic-ui-react";
// src/components/Login.js

import React, { Component } from "react";

class Login extends Component {
  state = {
    fields: {
      username: "",
      password: "",
    },
  };

  handleChange = (e) => {
    const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
    this.setState({ fields: newFields });
  };

  handleLoginSubmit = (e) => {
    e.preventDefault();
    // whatever you want to do when user submits a form
  };

  render() {
    const { fields } = this.state;

    return (
      <Form
        onSubmit={(e) => {
          this.handleLoginSubmit(e);
          this.props.handleClose();
        }}
      >
        <Form.Field>
          <label htmlFor="username">Username</label>
          <input
            className="username"
            type="text"
            name="username"
            placeholder="Username"
            value={fields.username}
            onChange={this.handleChange}
          ></input>
        </Form.Field>
        <Form.Field>
          <label htmlFor="username">Password</label>
          <input
            className="password"
            type="password"
            name="password"
            placeholder="Password"
            value={fields.password}
            onChange={this.handleChange}
          ></input>
        </Form.Field>
        <Button>Log In</Button>
      </Form>
    );
  }
}

export default Login;
