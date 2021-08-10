import React, { useState } from 'react';
import { Jumbotron } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import userActions from '../../../redux/actions/userActions';
import './Form.style.css'
import { Button, Form } from 'react-bootstrap'
import { FormGroup } from '@material-ui/core';
const Signup = props => {
  // initializing dispatch
  const dispatch = useDispatch();

  // Setting up local state using the useState hook
  const [signupForm, setSignupForm] = useState({
    user: {
      email: '',
      password: '',
      first_name: '',
      last_name: ''
    }
  });

  // Controlled form functions
  const handleChange = e => {

    setSignupForm({
      ...signupForm, user: {
        ...signupForm.user,
        [e.target.name]: e.target.value
      }
    }
    );
    console.log("Signup form", signupForm)
  }

  const handleSubmit = e => {
    e.preventDefault();
    const { history } = props;
    console.log("Sign up data: ", signupForm)
    dispatch(userActions.newUserToDB(signupForm));
    history.push('/');
  };

  // Destructuring keys from our local state to use in the form
  console.log("destructured:", signupForm.user)
  const { email, password, first_name, last_name } = signupForm.user;

  // Component code
  return (
    <div className="auth-form col-12">
       <div className="form-inner-content align-items-center justify-content-center col-sm-4">
      <h1 className="auth-header mb-4">Create a new account</h1>
     
      <Form className="form" onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            placeholder="Enter First Name"
            value={first_name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            placeholder="Enter Last Name"
            value={last_name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            placeholder="Enter Email"
            value={email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter Password"
            value={password}
            onChange={handleChange}
          />
          <br />
        </Form.Group>
        <Button type="submit">Sign Up</Button>
      </Form>
      </div>
    </div>
  );
};

export default Signup;