import React, {Component} from 'react'
import { Form, Input, TextArea, Button, Select } from 'semantic-ui-react'


const genderOptions = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]

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
