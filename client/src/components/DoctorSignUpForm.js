import React, { Component } from "react";
import {
  Form,
  Input,
  TextArea,
  Button,
  Select,
  Dropdown,
  Message,
} from "semantic-ui-react";

const options = [
  { key: "m", text: "Male", value: "male" },
  { key: "f", text: "Female", value: "female" },
  { key: "o", text: "Other", value: "other" },
];

class SignUp extends Component {
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
        success
      >
        <Form.Field required>
          <label htmlFor="firstname">First Name</label>
          <input
          required
            className="firstname"
            type="text"
            name="firstname"
            placeholder="firstname"
            value={fields.firstname}
            onChange={this.handleChange}
          ></input>
        </Form.Field>

        <Form.Field required>
          <label htmlFor="lastname">Last Name</label>
          <input
          required
            className="lastname"
            type="text"
            name="lastname"
            placeholder="lastname"
            value={fields.lastname}
            onChange={this.handleChange}
          ></input>
        </Form.Field>

        <Form.Field required>
          <label htmlFor="dob">Date of Birth</label>
          <input
          required
            className="dob"
            type="date"
            name="dob"
            placeholder="dob"
            value={fields.dob}
            onChange={this.handleChange}
          ></input>
        </Form.Field>

        {/* <Form.Field>
          <label htmlFor="gender">Gender</label>
          <input
            className="gender"
            type=""
            name="gender"
            placeholder="gender"
            value={fields.gender}
            onChange={this.handleChange}
          ></input>
        </Form.Field> */}

        <Form.Field required
          control={Select}
          label="Gender"
          options={options}
          placeholder="Gender"
        />

        <Form.Field required>
          <label htmlFor="specialization">Specialization</label>
          <input
          required
            className="specialization"
            type="text"
            name="specialization"
            placeholder="specialization"
            value={fields.specialization}
            onChange={this.handleChange}
          ></input>
        </Form.Field>

        <Form.Field required>
          <label htmlFor="license">Medical License #</label>
          <input
          required
            className="license"
            type="text"
            name="license"
            placeholder="license"
            value={fields.license}
            onChange={this.handleChange}
          ></input>
        </Form.Field>

        <Form.Field required>
          <label htmlFor="email">Email</label>
          <input
          required
            className="email"
            type="email"
            name="email"
            placeholder="email"
            value={fields.email}
            onChange={this.handleChange}
          ></input>
        </Form.Field>

        <Form.Field required>
          <label htmlFor="password">Password</label>
          <input
          required
            className="password"
            type="password"
            name="password"
            placeholder="Password"
            value={fields.password}
            onChange={this.handleChange}
          ></input>
        </Form.Field>

        <Form.Field required>
          <label htmlFor="confirmpassword">Confirm Password</label>
          <input
          required
            className="confirmpassword"
            type="password"
            name="confirmpassword"
            placeholder="confirm password"
            value={fields.confirmpassword}
            onChange={this.handleChange}
          ></input>
        </Form.Field>

        <Form.Field required>
          <label htmlFor="phone">Phone Number</label>
          <input
          required
            className="phone"
            type="text"
            name="phone"
            placeholder="phone"
            value={fields.phone}
            onChange={this.handleChange}
          ></input>
        </Form.Field>

        <Form.Field required>
          <label htmlFor="clinicname">Clinic Name</label>
          <input
          required
            className="clinicname"
            type="text"
            name="clinicname"
            placeholder="Clinic Name"
            value={fields.clinicname}
            onChange={this.handleChange}
          ></input>
        </Form.Field>

        <Form.Field required>
          <label htmlFor="clinic_address">Clinic Address</label>
          <input
          required
            className="clinic_address"
            type="text"
            name="clinic_address"
            placeholder="clinic address"
            value={fields.clinic_address}
            onChange={this.handleChange}
          ></input>
        </Form.Field>
        {/* <Message
          success
          header="Form Completed"
          content="You may now sign up, thank you!"
        /> */}
        <Button>Sign Up</Button>
      </Form>
    );
  }
}

export default SignUp;

// const SignUpForm = () => (
//   <Form onSubmit={(e) => {
//     // this.handleLoginSubmit(e);
//     this.props.handleClose();
//   }}>
//     <Form.Group widths='equal'>
//       <Form.Field
//         id='form-input-control-first-name'
//         control={Input}
//         label='First name'
//         placeholder='First name'
//       />
//       <Form.Field
//         id='form-input-control-last-name'
//         control={Input}
//         label='Last name'
//         placeholder='Last name'
//       />
//       <Form.Field
//         control={Select}
//         options={genderOptions}
//         label={{ children: 'Gender', htmlFor: 'form-select-control-gender' }}
//         placeholder='Gender'
//         search
//         searchInput={{ id: 'form-select-control-gender' }}
//       />
//     </Form.Group>
//     <Form.Field
//       id='form-textarea-control-opinion'
//       control={TextArea}
//       label='Opinion'
//       placeholder='Opinion'
//     />
//     <Form.Field
//       id='form-input-control-error-email'
//       control={Input}
//       label='Email'
//       placeholder='joe@schmoe.com'
//       error={{
//         content: 'Please enter a valid email address',
//         pointing: 'below',
//       }}
//     />
//     <Form.Field
//       id='form-button-control-public'
//       control={Button}
//       content='Confirm'
//       label='Label with htmlFor'
//     />
//   </Form>
// )

// export default SignUpForm
