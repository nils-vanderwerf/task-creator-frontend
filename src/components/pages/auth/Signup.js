import React, { useState } from 'react';
import { Jumbotron } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import userActions from '../../../redux/actions/userActions';
import './Form.style.css'
import { Button, Form} from 'react-bootstrap'
// import { FormGroup } from '@material-ui/core';
import { validationSchema } from '../../../Validations/ValidationSchema';
// import * as yup from "yup"
import { useFormik } from 'formik';
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";


const Signup = props => {
  // initializing dispatch
  const dispatch = useDispatch();
  let currentUser = useSelector(state => state.currentUser)

  // Setting up local state using the useState hook
  // const [signupForm, setSignupForm] = useState({
  //   user: {
  //     email: '',
  //     password: '',
  //     first_name: '',
  //     last_name: ''
  //   }
  // });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      first_name: '',
      last_name: ''
    },
    onSubmit: values => {
      const formData = { 
        user: values
    }
    console.log("Form data", formData)
    submitForm(formData)
  },
    validationSchema
  });

  const removeErrorMessage = (event) => {
    dispatch(userActions.clearUserAction())
  }

  const submitForm = (formData) => {
    console.log("B4 DISPATCH >> ", currentUser);
    dispatch(userActions.newUserToDB(formData));
    console.log("CURRENT USER IN SUBMIT FORM", currentUser)
  };


  if (!currentUser.errorMessage && Object.keys(currentUser).length !== 0) {
    console.log('CurrentUser in Signup 2 >> ', currentUser);
    props.history.push('/');
  }

  // // Destructuring keys from our local state to use in the form
  // console.log("destructured:", signupForm.user)
  // const { email, password, first_name, last_name } = signupForm.user;

  // Component code
  return (
    <div className="auth-form col-12">
       <div className="form-inner-content align-items-center justify-content-center col-sm-4">
      <h1 className="auth-header mb-4">Create a new account</h1>

     
      <Form className="form" 
        onSubmit={
          (event) => {
            event.preventDefault(); 
            formik.handleSubmit(event)
          }
        }>
      <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            placeholder="Enter First Name"
            value={formik.values.first_name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
           {formik.touched.first_name && formik.errors.first_name ? 
           (
            <p className="error-message">
              <strong>{formik.errors.first_name}</strong>
            </p>
          ) : null}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            placeholder="Enter Last Name"
            value={formik.values.last_name}
            onChange={formik.handleChange}
          />
          {formik.touched.last_name && formik.errors.last_name ? (
         <p className="error-message">
           <strong>{formik.errors.last_name}</strong>
           </p>
       ) : null}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            placeholder="Enter Email"
            value={formik.values.email}
            onChange={(event) => {
              event.preventDefault();
              removeErrorMessage() 
              formik.handleChange(event)
            }
          }
          />
             {formik.touched.email && formik.errors.email ? (
         <p className="error-message">
           <strong>{formik.errors.email}</strong>
          </p>
       ) : null}
          {currentUser.errorMessage ? (
         <p className="error-message">
           <strong>{currentUser.errorMessage}</strong>
          </p>
       ) : null}
        </Form.Group>
     
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.touched.password && formik.errors.password &&
         <p className="error-message">
           <strong>{formik.errors.password}</strong>
           </p>
       }
       {currentUser.base &&
         <p className="error-message">
           <strong>{currentUser.errorMessage}</strong>
           </p>
      }
        </Form.Group>
        <Button type="submit">Sign Up</Button>
      </Form>
      </div>
    </div>
  );
};

export default Signup;