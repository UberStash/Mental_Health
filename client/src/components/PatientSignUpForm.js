import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Select } from "semantic-ui-react";

const options = [
  { key: "m", text: "Male", value: "male" },
  { key: "f", text: "Female", value: "female" },
  { key: "o", text: "Other", value: "other" },
];

const PatientSignUpForm = (props) => {
  const [state, setState] = useState({
    firstname: "",
    lastname: "",
    dob: "",
    gender: "",
    diagnosis: "",
    health_card: "",
    email: "",
    password: "",
    confirmpassword: "",
    phone: "",
    address: "",
    doctor_id: "",
  });

  const handleChange = (e) => {
    const newFields = { ...state, [e.target.name]: e.target.value };
    setState(newFields);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    return axios
      .post("http://localhost:3001/patient/register", { state })
      .then(() => {
        console.log("sucess");
      })
      .then(() => props.handleClose())
      .catch((err) => console.log(err));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Field required>
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            name="firstname"
            value={state.firstname}
            onChange={handleChange}
          ></input>
        </Form.Field>

        <Form.Field required>
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            name="lastname"
            value={state.lastname}
            onChange={handleChange}
          ></input>
        </Form.Field>

        <Form.Field required>
          <label htmlFor="dateOfBirth">Date Of Birth</label>
          <input
            type="date"
            name="dob"
            value={state.dob}
            onChange={handleChange}
          ></input>
        </Form.Field>

        <Form.Field>
          <label htmlFor="Gender">Gender</label>
          <Select
            type="text"
            name="gender"
            options={options}
            // value={options}
            onChange={handleChange}
          />
        </Form.Field>
      </Form.Group>

      <Form.Field required>
        <label htmlFor="health_card">Health Card</label>
        <input
          type="text"
          name="health_card"
          value={state.health_card}
          onChange={handleChange}
        ></input>
      </Form.Field>

      <Form.Field required>
        <label htmlFor="email">Email Address</label>
        <input
          type="text"
          name="email"
          value={state.email}
          onChange={handleChange}
        ></input>
      </Form.Field>

      <Form.Field required>
        <label htmlFor="password">Password</label>
        <input
          type="text"
          name="password"
          value={state.password}
          onChange={handleChange}
        ></input>
      </Form.Field>

      <Form.Field>
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          name="phone"
          value={state.phone}
          onChange={handleChange}
        ></input>
      </Form.Field>

      <Form.Field>
        <label htmlFor="address">Address</label>
        <input
          type="text"
          name="address"
          value={state.address}
          onChange={handleChange}
        ></input>
      </Form.Field>

      <Form.Field required>
        <label htmlFor="doctor_id">Your doctor's ID</label>
        <input
          type="text"
          name="doctor_id"
          value={state.doctor_id}
          onChange={handleChange}
        ></input>
      </Form.Field>
      <Button>Sign Up</Button>
    </Form>
  );
};

export default PatientSignUpForm;
