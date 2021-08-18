import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import userActions from '../redux/actions/userActions.js';
import { Navbar } from 'react-bootstrap';
import './Nav.style.css'
import history from '../history'

const NavBar = (props) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.currentUser)

  useEffect(() => {
    dispatch(userActions.getCurrentUser());
  }, [dispatch])


  const handleLogout = () => {
    dispatch(userActions.logoutUser());
    localStorage.clear();
    history.push('/login');
  };

  return (
    <Navbar bg="dark" expand="lg" style={{ display: 'flex', justifyContent: 'space-evenly' }} >
      <div className="main-container justify-content-between">
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
        {/* <Navbar.Collapse id="basic-navbar-nav"> */}
        {
          localStorage.getItem('token') &&
          <div className="nav-logged-in">
            <Link to="/"><img alt="Task creator logo" src="https://i.imgur.com/wRrro7e.png" /></Link>
            
            <p id="welcome">
              {currentUser && currentUser.first_name &&
                `Welcome ${currentUser.first_name}`}
            </p>

            <Link to="/login" onClick={handleLogout}>
              Logout
            </Link>
          </div>
        }
        {!localStorage.getItem('token') &&
          <div className="nav-logged-out">
            
            <Link to="/register">Signup</Link>
            <Link to="/login">Login </Link>
          </div>
        }
        {/* </Navbar.Collapse> */}
      </div>
    </Navbar >
  );
};

export default NavBar;