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
    const [deleteSelected, setDeleteSelected] = useState()
    console.log("Tasks in task list", tasks)

    const dispatch = useDispatch()

    const [showState, setShowState] = useState(false)
    const showModal = (e) => {
        console.log(e.target.id)
        setShowState(true)
        setDeleteSelected(e.target.id)
    }
    const hideModal = () => setShowState(false)

    useEffect(() => {
        dispatch(getAllTasks())
    }, [dispatch, deleteSelected])

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
                        (task) => (
                            <div className="task col-sm-4" id={task.id} key={`task-${task.id}`}>
                                <TaskItem
                                    deleteTaskId={deleteSelected}
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
