import React, { useState, useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Alert, Button } from "react-bootstrap";
import { getAllTasks } from '../../../redux/actions/taskActions'
import { ConfirmMessageContext } from '../../../contexts/confirmMessageContext';
import TaskItem from './TaskItem'
import taskActions from '../../../redux/actions/taskActions';
import './Tasks.style.css'
import { display } from '@material-ui/system';
import tasksReducer from '../../../redux/reducers/tasksReducer';

const TaskList = () => {
    const tasks = useSelector(state => state.tasksReducer)
    const [confirmMessage, setConfirmMessage] = useContext(ConfirmMessageContext)

    const dispatch = useDispatch()

    const [showState, setShowState] = useState(false)
    const showModal = () => setShowState(true)
    const hideModal = () => setShowState(false)

    useEffect(() => {
        dispatch(getAllTasks())
    }, [dispatch])

    return (
        <>
            <div className="all-tasks main-container p-10">
                <h1>Your Tasks</h1>
                {confirmMessage && <Alert variant="success hide">{confirmMessage}</Alert>}
                <ul className="task-list d-flex flex-wrap">
                    {tasks.length == 0 && <p>No tasks here yet.  <Link to="/tasks/new">Create a task now. </Link></p>
                    }
                    {tasks && tasks.map(
                        (task, index) => (
                            <div className="task col-sm-4" key={task.id}>
                                <TaskItem
                                    taskIndex={index}
                                    task={task}
                                    showModal={showModal}
                                    hideModal={hideModal}
                                    showState={showState}
                                    confirmMessage={setConfirmMessage}
                                />
                            </div>
                        )
                    )
                    }
                </ul>
            </div>
        </>
    )
}

export default TaskList
