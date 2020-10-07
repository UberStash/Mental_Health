import React, { useState } from "react";
import axios from "axios";
import {
  Form,
  Input,
  TextArea,
  Button,
  Select,
  Dropdown,
  Message,
  Modal,
} from "semantic-ui-react";

const options = [
  { key: "m", text: "Male", value: "male" },
  { key: "f", text: "Female", value: "female" },
  { key: "o", text: "Other", value: "other" },
];

const DoctorSignUpForm = (props) => {
  const [state, setState] = useState({
    firstname: "",
    lastname: "",
    dob: "",
    gender: "",
    specialization: "",
    license: "",
    email: "",
    password: "",
    confirmpassword: "",
    phone: "",
    clinicname: "",
    clinic_address: "",
  });

  const handleChange = (e) => {
    const newFields = { ...state, [e.target.name]: e.target.value };
    setState(newFields);
  };
  //handle change for select options
  // const [value, setValue] = useState("")

  // const handleSelectChange = (e, value ) => {
  //   setValue({[value.name]: value.value})
  // }

  const handleSubmit = (e) => {
    // const {
    //   firstname,
    //   lastname,
    //   dob,
    //   gender,
    //   specialization,
    //   license,
    //   email,
    //   password,
    //   confirmpassword,
    //   phone,
    //   clinicname,
    //   clinic_address
    // } = state;
    e.preventDefault();

    return axios
      .post("http://localhost:3001/doc/register", { state })
      .then((res) => console.log(res))
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

      <Form.Field>
        <label htmlFor="specialization">Specialization</label>
        <input
          type="text"
          name="specialization"
          value={state.specialization}
          onChange={handleChange}
        ></input>
      </Form.Field>

      <Form.Field required>
        <label htmlFor="license">License</label>
        <input
          type="text"
          name="license"
          value={state.license}
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

      {/* <Form.Field required>
            <label htmlFor="confirmpassword">Confirm Password</label>
            <input
              type="text"
              name="confirmpassword"
              value={state.confirmpassword}
              onChange={handleChange}
            ></input>
          </Form.Field> */}

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
        <label htmlFor="clinicname">Clinic Name</label>
        <input
          type="text"
          name="clinicname"
          value={state.clinicname}
          onChange={handleChange}
        ></input>
      </Form.Field>

      <Form.Field>
        <label htmlFor="clinic_address">Clinic Address</label>
        <input
          type="text"
          name="clinic_address"
          value={state.clinic_address}
          onChange={handleChange}
        ></input>
      </Form.Field>

      <Button>Sign Up</Button>
    </Form>
  );
};

export default DoctorSignUpForm;
