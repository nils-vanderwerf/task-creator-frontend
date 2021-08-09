import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import userActions from '../redux/actions/userActions.js';
import { Navbar, Nav, Button } from 'react-bootstrap';
import './nav.css'

const NavBar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(userActions.logoutUser());
    localStorage.clear();

  };

  return (
    <Navbar bg="dark" expand="lg" style={{ display: 'flex', justifyContent: 'space-evenly' }} >
      <div class="main-container justify-content-between">
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
        {/* <Navbar.Collapse id="basic-navbar-nav"> */}
        <Link to="/tasks/new">
          <Button style={{marginLeft: "0"}}>Create a task</Button>
        </Link>
        <Link to="/">Home</Link>
        {console.log(`Token >> ${localStorage.getItem('token')}`)}
        {!localStorage.getItem('token') &&
          <Link to="/register">Signup</Link>}
        {!localStorage.getItem('token') &&
          <Link to="/login">Login </Link>}
        {
          localStorage.getItem('token') &&
          <Link to="/" onClick={handleLogout}>
            Logout
          </Link>
        }
        {/* </Navbar.Collapse> */}
      </div>
    </Navbar >
  );
};

export default NavBar;