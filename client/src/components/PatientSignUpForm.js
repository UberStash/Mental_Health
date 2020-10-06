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

const PatientSignUpForm = (props) => {

  const [state, setState] = useState({
    firstname: "",
    lastname: "",
    dob: "",
    gender: "",
    diagnosis: "",
    health_card : "",
    email: "",
    password: "",
    confirmpassword: "",
    phone: "", 
    address: ""
})


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

    e.preventDefault();
      
      return axios.post('http://localhost:3001/patient/register', {state})
         .then(() => {
           console.log('sucess')
         })
         .then(() => props.handleClose())
         .catch(err => console.log(err));
  };


    return (
        <Form
          onSubmit={ handleSubmit }
        >
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

            <Form.Field >
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

            {/* <Form.Field >
              <label htmlFor="specialization">Specialization</label>
              <input
                type="text"
                name="specialization"
                value={state.specialization}
                onChange={handleChange}
              ></input>
          </Form.Field> */}

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
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              value={state.address}
              onChange={handleChange}
            ></input>
          </Form.Field>

          <Button >Sign Up</Button>
        </Form>
    );
}


export default PatientSignUpForm;





// import axios from 'axios';
// import React, {Component} from 'react'
// import { Form, Input, TextArea, Button, Select } from 'semantic-ui-react'


// const genderOptions = [
//   { key: 'm', text: 'Male', value: 'male' },
//   { key: 'f', text: 'Female', value: 'female' },
//   { key: 'o', text: 'Other', value: 'other' },
// ]

// class SignUp extends Component {

//   state = { 
//       firstName: "",
//       lastName: "",
//       dateOfBirth: "",
//       gender: "",
//       email: "",
//       password: "",
//       healthCard: "",
//       phone: "",
//       submittedfirstName: "",
//       submittedlastName: "",
//       submitteddateOfBirth: "",
//       submittedgender: "",
//       submittedemail: "",
//       submittedpassword: "",
//       submittedhealthCard: "",
//       submittedphone: ""
//   }

//   handleChange = (e, { firstName, value }) => this.setState({ [firstName]: value })
//   handleChange = (e, { lastName, value }) => this.setState({ [lastName]: value })
//   handleChange = (e, { dateOfBirth, value }) => this.setState({ [dateOfBirth]: value })
//   handleChange = (e, { gender, value }) => this.setState({ [gender]: value })
//   handleChange = (e, { email, value }) => this.setState({ [email]: value })
//   handleChange = (e, { password, value }) => this.setState({ [password]: value })
//   handleChange = (e, { healthCard, value }) => this.setState({ [healthCard]: value })
//   handleChange = (e, { phone, value }) => this.setState({ [phone]: value })
 
//   handleSubmit = () => {
    
    
//     const {
//       firstName,
//       lastName,
//       dateOfBirth,
//       gender,
//       email,
//       password,
//       healthCard,
//       phone
//      } = this.state

//     this.setState({
//       submittedfirstName: firstName, 
//       submittedlastName: lastName,
//       submitteddateOfBirth: dateOfBirth,
//       submittedgender: gender,
//       submittedemail: email,
//       submittedpassword: password,
//       submittedhealthCard: healthCard,
//       submittedphone: phone
//     })
    
//     axios.post('https://localhost3001/patient/register', {
      
//     })
//     .then(res => {console.log(res)})
//     .catch(err => {console.log(err)})
//   }

//   render() {
//     const { 

//       firstName,
//       lastName,
//       dateOfBirth,
//       gender,
//       email,
//       password,
//       healthCard,
//       phone,
//       submittedfirstName,
//       submittedlastName,
//       submitteddateOfBirth,
//       submittedgender,
//       submittedemail,
//       submittedpassword,
//       submittedhealthCard,
//       submittedphone

//      } = this.state

//     return (
//       <div>
//         <Form onSubmit={this.handleSubmit}>
//             <Form.Group>
//             <Form.Input
//               width={4}
//               placeholder='First Name'
//               name='firstName'
//               value={firstName}
//               onChange={this.handleChange}
//             />
//             <Form.Input
//               width={4}
//               placeholder='Last Name'
//               name='lastName'
//               value={lastName}
//               onChange={this.handleChange}
//             />
//             <Form.Input
//               width={2}
//               placeholder='Date of Birth'
//               name='dateOfBirth'
//               type='date'
//               value={dateOfBirth}
//               onChange={this.handleChange}
//             />
//             <Form.Select
//             fluid
//             label='Gender'
//             options={genderOptions}
//             placeholder='Gender'
//             />
//           </Form.Group>
//             <Form.Group>
//               <Form.Input placeholder='2 Wide' width={2} />
//               <Form.Input placeholder='12 Wide' width={12} />
//               <Form.Input placeholder='2 Wide' width={2} />
//             </Form.Group>
//             <Form.Group>
//               <Form.Input placeholder='8 Wide' width={8} />
//               <Form.Input placeholder='6 Wide' width={6} />
//               <Form.Input placeholder='2 Wide' width={2} />
//             </Form.Group>
//             <Form.Group>
//             <Form.Input
//               placeholder='Email'
//               name='email'
//               value={email}
//               onChange={this.handleChange}
//             />
//             <Form.Input
//               placeholder='Password'
//               name='password'
//               value={password}
//               onChange={this.handleChange}
//             />
//             <Form.Button content='Submit' />
//           </Form.Group>
//         </Form>
//         <strong>onChange:</strong>
//         <pre>{JSON.stringify({ firstName, email }, null, 2)}</pre>
//         <strong>onSubmit:</strong>
//         <pre>{JSON.stringify({ submittedfirstName, submittedemail }, null, 2)}</pre>
//       </div>
//     )
//   }

//   // state = {
//   //   fields: {
//   //     firstName: "",
//   //     lastName: "",
//   //     dateOfBirth: "",
//   //     gender: "",
//   //     email: "",
//   //     password: "",
//   //     healthCard: "",
//   //     phone: ""

//   //   }
//   // };

//   // handleChange = (e) => {
//   //   const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
//   //   this.setState({ fields: newFields });
//   // };

//   // handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   axios.post('https://localhost3001/patient/register', {
//   //     fields: {
//   //       firstName: firstName,
//   //       lastName: lastName,
//   //       dateOfBirth: dateOfBirth,
//   //       gender: gender,
//   //       email: email,
//   //       password: password,
//   //       healthCard: healthCard,
//   //       phone: phone
//   //     }
//   //     .then((res) => {console.log(res)})
//   //     .catch(err => console.log(err))
//   //   })
//   // };

//   // render() {
    

//   //   return (
//   //     <Form
//   //       onSubmit={(e) => {
//   //         this.handleSubmit(e);
//   //         this.props.handleClose();
//   //       }}
//   //     > <Form.Group>
//   //         <Form.Field>
//   //           <label htmlFor="firstName">First Name</label>
//   //           <input
//   //             className="username"
//   //             type="text"
//   //             name="firstName"
//   //             placeholder="First Name"
//   //             value={fields.firstName}
//   //             onChange={this.handleChange}
//   //           ></input>
//   //         </Form.Field>

//   //         <Form.Field>
//   //           <label htmlFor="lastName">Last Name</label>
//   //           <input
//   //             className="password"
//   //             type="text"
//   //             name="lastName"
//   //             placeholder="Last Name"
//   //             value={fields.lastName}
//   //             onChange={this.handleChange}
//   //           ></input>
//   //         </Form.Field>

//   //         <Form.Field>
//   //           <label htmlFor="dateOfBirth">Date Of Birth</label>
//   //           <input
//   //             className="password"
//   //             type="date"
//   //             name="dateOfBirth"
//   //             placeholder="Date of Birth"
//   //             value={fields.dateOfBirth}
//   //             onChange={this.handleChange}
//   //           ></input>
//   //         </Form.Field>
//   //         <Form.Select
//   //             fluid
//   //             label='Gender'
//   //             name='gender'
//   //             options={genderOptions}
//   //             placeholder='Gender'
//   //             value={fields.genderOptions}
//   //             onChange={this.handleChange}
//   //           />
//   //         </Form.Group>
//   //       {/* <Form.Field>
//   //         <label htmlFor="gender">Gender</label>
//   //         <select
//   //           className="password"
//   //           type="dropdown"
//   //           name="gender"
//   //           options={genderOptions}
//   //           placeholder="Gender"
//   //           value={fields.genderOptions}
//   //           onChange={this.handleChange}
//   //         ></select>
//   //       </Form.Field> */}

//   //       <Form.Field>
//   //         <label htmlFor="email">Email</label>
//   //         <input
//   //           className="password"
//   //           type="email"
//   //           name="email"
//   //           placeholder="example@gmail.com"
//   //           value={fields.email}
//   //           onChange={this.handleChange}
//   //         ></input>
//   //       </Form.Field>

//   //       <Form.Field>
//   //         <label htmlFor="username">Password</label>
//   //         <input
//   //           className="password"
//   //           type="password"
//   //           name="password"
//   //           placeholder="Password"
//   //           value={fields.password}
//   //           onChange={this.handleChange}
//   //         ></input>
//   //       </Form.Field>

//   //       <Form.Field>
//   //         <label htmlFor="healthCard">Health Card</label>
//   //         <input
//   //           className="password"
//   //           type="Text"
//   //           name="healthCard"
//   //           placeholder=""
//   //           value={fields.healthCard}
//   //           onChange={this.handleChange}
//   //         ></input>
//   //       </Form.Field>

//   //       <Form.Field>
//   //         <label htmlFor="phone">Phone</label>
//   //         <input
//   //           className="password"
//   //           type="text"
//   //           name="phone"
//   //           placeholder=""
//   //           value={fields.phone}
//   //           onChange={this.handleChange}
//   //         ></input>
//   //       </Form.Field>

//   //       <Button>Sing Up</Button>
//   //     </Form>
//   //   );
//   // }
// }

// export default SignUp;


// // const SignUpForm = () => (
// //   <Form onSubmit={(e) => {
// //     // this.handleSubmit(e);
// //     this.props.handleClose();
// //   }}>
// //     <Form.Group widths='equal'>
// //       <Form.Field
// //         id='form-input-control-first-name'
// //         control={Input}
// //         label='First name'
// //         placeholder='First name'
// //       />
// //       <Form.Field
// //         id='form-input-control-last-name'
// //         control={Input}
// //         label='Last name'
// //         placeholder='Last name'
// //       />
// //       <Form.Field
// //         control={Select}
// //         options={genderOptions}
// //         label={{ children: 'Gender', htmlFor: 'form-select-control-gender' }}
// //         placeholder='Gender'
// //         search
// //         searchInput={{ id: 'form-select-control-gender' }}
// //       />
// //     </Form.Group>
// //     <Form.Field
// //       id='form-textarea-control-opinion'
// //       control={TextArea}
// //       label='Opinion'
// //       placeholder='Opinion'
// //     />
// //     <Form.Field
// //       id='form-input-control-error-email'
// //       control={Input}
// //       label='Email'
// //       placeholder='joe@schmoe.com'
// //       error={{
// //         content: 'Please enter a valid email address',
// //         pointing: 'below',
// //       }}
// //     />
// //     <Form.Field
// //       id='form-button-control-public'
// //       control={Button}
// //       content='Confirm'
// //       label='Label with htmlFor'
// //     />
// //   </Form>
// // )

// // export default SignUpForm
