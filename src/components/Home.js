import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import './Home.style.css'

import TaskList from './pages/tasks/TaskList';
import userActions from '../redux/actions/userActions'

const Home = (props) => {
    const currentUser = useSelector(state => state.currentUser)
    console.log('Current User >> ', currentUser);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getCurrentUser());
    }, [dispatch])

    return (
        <div class="main-container">
            <h1>Home</h1>
            {currentUser && currentUser.first_name && currentUser.last_name
                ?
                <>
                Welcome {currentUser.first_name}
                <Link to="/tasks/">
                <Button id="view-tasks" className="home" style={{ marginLeft: "0" }}>View Tasks</Button>
            </Link>
            </>
                :
                <>
                Not logged in
                <Link to="/login">
                <Button id="login" className="home" style={{ marginLeft: "0" }}>Login</Button>
            </Link>
            </> 
                }
        </div>
    )
};

export default Home;