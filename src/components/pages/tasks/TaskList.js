import React, { useState, useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Alert, Button } from "react-bootstrap";
import { getAllTasks } from '../../../redux/actions/taskActions'
import { ConfirmMessageContext } from '../../../contexts/confirmMessageContext';
import TaskItem from './TaskItem'
import './Tasks.style.css'

const TaskList = () => {
    const tasks = useSelector(state => state.tasks)
    const [confirmMessage, setConfirmMessage] = useContext(ConfirmMessageContext)
    console.log("Tasks in task list", tasks)


    const dispatch = useDispatch()

    const [showState, setShowState] = useState(false)
    const showModal = () => setShowState(true)
    const hideModal = () => setShowState(false)

    useEffect(() => {
        dispatch(getAllTasks())
        console.log("Token", localStorage.getItem('token'))
    }, [dispatch])

    return (
        <>
            <div className="all-tasks main-container p-10">
                <h1>Your Tasks</h1>
                <Link to="/tasks/new">
              <Button className="create-button">
                  Create a task
                </Button>
            </Link>
                {confirmMessage && <Alert variant="success hide">{confirmMessage}</Alert>}
                <ul className="task-list d-flex flex-wrap">
                    {tasks.length === 0 && <p>No tasks here yet.
                        <Link to="/tasks/new">Create a task now. </Link></p>
                    }
                    {tasks?.map(
                        (task, index) => (
                            <div className="task col-sm-4" key={task.id}>
                                <TaskItem
                                    taskIndex={index}
                                    taskId={task.id}
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
