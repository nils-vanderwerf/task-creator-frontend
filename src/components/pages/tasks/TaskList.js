import React, { useState, useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Alert, Button } from "react-bootstrap";
import { getAllTasks } from '../../../redux/actions/taskActions'
import { ConfirmMessageContext } from '../../../contexts/confirmMessageContext';
import TaskItem from './TaskItem'
import './Tasks.style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { ShowModalContext } from '../../../contexts/showModal';


const TaskList = (props) => {
    const tasks = useSelector(state => state.tasks)
    const [confirmMessage, setConfirmMessage] = useContext(ConfirmMessageContext)
    const [showState, setShowState] = useState(ShowModalContext)

    const dispatch = useDispatch()

    const hideModal = () => setShowState(false)

    useEffect(() => {
        dispatch(getAllTasks())
    }, [dispatch])

    return (
        <>
            <div className="all-tasks main-container p-10">
                <h1>Your Tasks</h1>
                <Link to="/tasks/new">
                    <Button className="create-button">
                        <FontAwesomeIcon icon={faPlusCircle} />Create a task
                    </Button>
                </Link>
                {confirmMessage && <Alert variant="success hide">{confirmMessage}</Alert>}
                <ul className="task-list d-flex flex-wrap">
                    {tasks.length === 0 && <p>No tasks here yet.
                        <Link to="/tasks/new"> Create a task now. </Link></p>
                    }
                    {tasks?.map(
                        (task) => (
                            <div className="task col-sm-4" key={`task-${task.id}`}>
                                <TaskItem
                                    taskId={task.id}
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
