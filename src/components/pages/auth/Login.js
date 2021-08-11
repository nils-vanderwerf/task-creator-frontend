
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userActions from '../../../redux/actions/userActions';
import './Form.style.css'
import { Button, Form } from 'react-bootstrap'

const Login = props => {
  // initializing dispatch
  const dispatch = useDispatch();
  let currentUser = useSelector(state => state.currentUser)
  let [auth, setAuth] = useState(false)

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
    console.log("B4 DISPATCH >> ", currentUser);
    e.preventDefault();
    dispatch(userActions.loginUserToDB(loginForm));
    // const errorContainer = document.getElementById('error-message')
    // console.log("ON LOGIN SUBMIT >> ", Object.keys(currentUser).length === 0)
    // if (currentUser.base || Object.keys(currentUser).length === 0) {
    //   console.log("CURRENT USER IS AN EMPTY OBJECT", currentUser)
    //   // errorContainer.innerHTML = `Login ${currentUser.base}`
    // } 
    // else {
    //   console.log("CURRENT USER IS NOT AN EMPTY OBJECT", currentUser)
    //   props.history.push('/');
    //   // errorContainer.innerHTML = ""
    // }    
  };


  // Destructuring keys from our local state to use in the form
  const { email, password } = loginForm.user;

  console.log('CurrentUser in Login 1 >> ', !currentUser.base && Object.keys(currentUser).length !== 0);
  if (!currentUser.base && Object.keys(currentUser).length !== 0) {
    console.log('CurrentUser in Login 2 >> ', currentUser);
    props.history.push('/');
  }

  // Component code
  return (
    <div className="auth-form col-12">
      <div className="form-inner-content align-items-center justify-content-center col-sm-4">
        <h1 className="auth-header mb-4" >Login</h1>
        <Form className="form" onSubmit={handleSubmit}>
          <p id="error-message">
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