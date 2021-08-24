import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './pages/tasks/Tasks.style.css'

import TaskList from './pages/tasks/TaskList';
import Login from './pages/auth/Login'
import userActions from '../redux/actions/userActions'


const Home = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getCurrentUser());
    }, [dispatch])

    return (
        <div className="main-container">
            {localStorage.getItem('token')
                ?
                <TaskList />
                :
                <Login />
            }
        </div>
    )
};

export default Home;