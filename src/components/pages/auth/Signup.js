import React, { useState } from 'react';
import { Jumbotron } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import userActions from '../../../redux/actions/userActions';
import './Authentication.style.css'
import { Button, Form } from 'react-bootstrap'
import { FormGroup } from '@material-ui/core';
const Signup = props => {
  // initializing dispatch
  const dispatch = useDispatch();

  // Setting up local state using the useState hook
  const [signupForm, setSignupForm] = useState({
    user: {
      username: '',
      password: ''
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
  const { username, password } = signupForm.user;

  // Component code
  return (
    <div className="auth-form col-md-3">
       <div className="form-inner-content align-items-center justify-content-center">
      <h1 className="auth-header mb-4">Signup Page</h1>
     
      <Form className="form" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Enter Username"
            value={username}
            onChange={handleChange}
            placeholder="Username"
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
            placeholder="Password"
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