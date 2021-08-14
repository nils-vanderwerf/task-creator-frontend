import React, {useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import userActions from '../redux/actions/userActions.js';
import { Navbar, Nav, Button } from 'react-bootstrap';
import './Nav.style.css'
import history from '../history'

const NavBar = (props) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.currentUser)
  console.log('Current User >> ', currentUser);

  useEffect(() => {
      dispatch(userActions.getCurrentUser());
  }, [dispatch])


  const handleLogout = () => {
    
    console.log("HIIIISSTOOOORRRY", history)
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
          <Link to="/tasks/new">
          <Button style={{marginLeft: "0"}}>Create a task</Button>
        </Link>
        }
        <p>{currentUser && currentUser.first_name && `Welcome ${currentUser.first_name}`}</p>
        {console.log(`Token >> ${localStorage.getItem('token')}`)}
        {!localStorage.getItem('token') &&
          <Link to="/register">Signup</Link>}
        {!localStorage.getItem('token') &&
          <Link to="/login">Login </Link>}
         
        {
          localStorage.getItem('token') &&
          <Link to="/login" onClick={handleLogout}>
            Logout
          </Link>
        }

        {/* </Navbar.Collapse> */}
      </div>
    </Navbar >
  );
};

export default NavBar;