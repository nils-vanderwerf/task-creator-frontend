import React, { useState } from 'react';
import { Jumbotron } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
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
    submitForm(formData)
  },
    validationSchema
  });

//   const validationSchema = yup.object().shape({
//     first_name: yup
//           .string()
//           .min(2, "Too short!")
//           .max(50, "Too long!")
//           .required("Required"),
//     last_name: yup
//           .string()
//           .min(2, "Too short!")
//           .max(50, "Too long!")
//           .required("Required"),
//     email: yup
//           .string()
//           .email("Invalid email")
//           .required("Required"),
//     password: yup
//           .string()
//           .min(4, "Too short!")
//           .max(20, "Too long!")
//           .required("Required")
// })




  // // Controlled form functions
  // const handleChange = e => {
  //   setSignupForm({
  //     ...signupForm, user: {
  //       ...signupForm.user,
  //       [e.target.name]: e.target.value
  //     }
  //   }
  //   );
  //   console.log("Signup form", signupForm)
  // }

  const submitForm = (formData) => {
    const { history } = props;
    dispatch(userActions.newUserToDB(formData));
    history.push('/');
  };

  // // Destructuring keys from our local state to use in the form
  // console.log("destructured:", signupForm.user)
  // const { email, password, first_name, last_name } = signupForm.user;

  // Component code
  return (
    <div className="auth-form col-12">
       <div className="form-inner-content align-items-center justify-content-center col-sm-4">
      <h1 className="auth-header mb-4">Create a new account</h1>

     
      <Form className="form" onSubmit={formik.handleSubmit}>
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
            onChange={formik.handleChange}
          />
             {formik.touched.email && formik.errors.email ? (
         <p className="error-message">
           <strong>{formik.errors.email}</strong>
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
          {formik.touched.password && formik.errors.password ? (
         <p className="error-message">
           <strong>{formik.errors.password}</strong>
           </p>
       ) : null}
        </Form.Group>
        <Button type="submit">Sign Up</Button>
      </Form>
      </div>
    </div>
  );
};

export default Signup;