
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userActions from '../../../redux/actions/userActions';
import './Form.style.css'
import { Button, Form } from 'react-bootstrap'

const Login = props => {
  // initializing dispatch
  const dispatch = useDispatch();
  let currentUser = useSelector(state => state.currentUser)

  // Setting up local state using the useState hook
  // Setting up local state using the useState hook
  const [loginForm, setloginForm] = useState({
    user: {
      email: '',
      password: ''
    }
  });


  // Controlled form functions
  const handleChange = e => {

    setloginForm({
      ...loginForm, user: {
        ...loginForm.user,
        [e.target.name]: e.target.value
      }
    }
    );
  }
  // controlled form functions
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(userActions.loginUserToDB(loginForm));
  };


  // Destructuring keys from our local state to use in the form
  const { email, password } = loginForm.user;

  if (!currentUser.base && Object.keys(currentUser).length !== 0) {
    props.history.push('/tasks');
  }

  // Component code
  return (
    <div className="auth-form col-12">
      <div className="form-inner-content align-items-center justify-content-center col-sm-4">
        <h1 className="auth-header mb-4" >Login</h1>
        <Form className="form" onSubmit={handleSubmit}>
          <p className="error-message">
            {currentUser.base && `Login ${currentUser.base}`}
          </p>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              placeholder="Enter Email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
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
              placeholder="Enter your password"
            />
            <br />
          </Form.Group>
          <Button type="submit">Login</Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;