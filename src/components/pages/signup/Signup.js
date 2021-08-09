import React, { useState } from 'react';
import {Jumbotron}from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import userActions from '../../../redux/actions/userActions';
import './Signup.style.css'          
import {Button } from 'react-bootstrap'                                                
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

    setSignupForm({ ...signupForm, user: {
        ...signupForm.user,
        [e.target.name]: e.target.value }
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
    <div className="signup-page">
      <form onSubmit={handleSubmit}>
        <h1>Signup Page</h1>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          placeholder="Username"
        />
        <br/>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Password"
        />
        <br/>
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default Signup;