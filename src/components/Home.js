import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Home.style.css'
import './pages/tasks/Tasks.style.css'

import TaskList from './pages/tasks/TaskList';
import Login from './pages/auth/Login'
import userActions from '../redux/actions/userActions'


const Home = (props) => {
    const currentUser = useSelector(state => state.currentUser)
    console.log('Current User >> ', currentUser);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getCurrentUser());
    }, [dispatch])

    return (
        <div className="main-container">
            {currentUser?.first_name
                ?
                <TaskList />
                :
                <Login />
            }
        </div>
    )
};

export default Home;