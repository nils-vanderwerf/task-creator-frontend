import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {logoutUser } from '../redux/actions/userActions.js';


const NavBar = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-evenly' }}>
      <Link to="/">Home</Link>
      <Link to="/register">Signup</Link>
      <Link to="/login">Login</Link>
      <Link to="/" onClick={handleLogout}>
        Logout
      </Link>
    </nav>
  );
};

export default NavBar;
