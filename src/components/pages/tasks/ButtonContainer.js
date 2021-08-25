import React, { useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Button } from "react-bootstrap";
import { Link, useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { ShowModalContext } from '../../../contexts/showModal';
import { ConfirmMessageContext } from '../../../contexts/confirmMessageContext';
import { TaskToDeleteContext } from '../../../contexts/taskToDeleteContext';
import taskActions, { getAllTasks } from '../../../redux/actions/taskActions'
import DeleteConfirmation from './DeleteConfirmation';
import { Modal } from 'react-bootstrap'


const ButtonContainer = ({ task }) => {
    const tasks = useSelector(state => state.tasks)
    const [showState, setShowState] = useContext(ShowModalContext)
    const [confirmMessage, setConfirmMessage] = useContext(ConfirmMessageContext)
    const [taskToDelete, setTaskToDelete] = useContext(TaskToDeleteContext)
    const history = useHistory();

    const dispatch = useDispatch()

    const showModal = (event) => {
        const targetInt = parseInt(event.target.id)
        console.log("Task Int", targetInt)
        const findTask = tasks.find(item => item["id"] === targetInt)
        console.log("FIND TASK >> ", findTask)
        setTaskToDelete(findTask)
        setShowState(true)
    }
  
    useEffect(() => {
        console.log("Set task to delete", taskToDelete)
    }, [taskToDelete])

    const hideModal = () => setShowState(false)

    const handleDeleteTask = () => {
        dispatch(taskActions.deleteTaskFromDB(taskToDelete))
        let taskMessage = document.getElementById('confirm-message')
        setConfirmMessage(`Task '${taskToDelete.title}' has been deleted`)
        hideModal()
        dispatch(getAllTasks())
        history.push('/');
    }


    return (
        <div className="button-container d-flex justify-content-between">
            <Link to={{
                pathname: `/tasks/${task.id}/edit`
            }}>
                <Button className="col-6"
                    variant="primary">
                    <FontAwesomeIcon icon={faEdit} /> Edit
                </Button>
            </Link>
            <Button className="col-6" variant="primary" id={task.id} onClick={showModal}>
                <FontAwesomeIcon icon={faTrash} /> Delete
            </Button>
            <Modal show={showState} onHide={hideModal}>
                <Modal.Header closeButton onClick={hideModal}>
                    <Modal.Title>Delete Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DeleteConfirmation 
                    showModal={showModal} 
                    hideModal={hideModal}
                    handleDeleteTask={handleDeleteTask} />
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ButtonContainer;
