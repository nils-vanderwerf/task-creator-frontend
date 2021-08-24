import React, { useState, useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Alert, Button } from "react-bootstrap";
import taskActions, { getAllTasks } from '../../../redux/actions/taskActions'
import { ConfirmMessageContext } from '../../../contexts/confirmMessageContext';
import TaskItem from './TaskItem'
import './Tasks.style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import DeleteConfirmation from './DeleteConfirmation';
import { Modal } from 'react-bootstrap'
import history from '../../../history';


const TaskList = (props) => {
    const tasks = useSelector(state => state.tasks)
    const [confirmMessage, setConfirmMessage] = useContext(ConfirmMessageContext)
    const [taskToDelete, setTaskToDelete] = useState()
    console.log("Tasks in task list", tasks)

    const dispatch = useDispatch()

    const [showState, setShowState] = useState(false)
    const showModal = (event) => {
        const targetInt = parseInt(event.target.id)
        setTaskToDelete(tasks.find(task => task["id"] === targetInt))
        setShowState(true)
    }
    const hideModal = () => setShowState(false)

    useEffect(() => {
        dispatch(getAllTasks())
    }, [dispatch])


    const handleDeleteTask = () => {
        console.log("Task to delete", taskToDelete)
        dispatch(taskActions.deleteTaskFromDB(taskToDelete))
        let taskMessage = document.getElementById('confirm-message')
        setConfirmMessage(`Task '${taskToDelete.title}' has been deleted` )
        hideModal()
        dispatch(getAllTasks())
        history.push('/tasks');
    }

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
                        <Link to="/tasks/new">Create a task now. </Link></p>
                    }
                    {tasks?.map(
                        (task) => (
                            <div className="task col-xs-12 col-sm-6 col-md-4" key={`task-${task.id}`}>
                                <TaskItem
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
                <Modal show={showState}onHide={hideModal}>
                <Modal.Header closeButton onClick={hideModal}>
                    <Modal.Title>Delete Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DeleteConfirmation
                        hideModal={hideModal}
                        handleDeleteTask={handleDeleteTask}
                    />
                </Modal.Body>
            </Modal>
            </div>
        </>
    )
}

export default TaskList
