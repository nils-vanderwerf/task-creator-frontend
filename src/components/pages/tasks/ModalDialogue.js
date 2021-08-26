import React, {useState, useContext, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DeleteConfirmation from './DeleteConfirmation'
import { ConfirmMessageContext } from '../../../contexts/confirmMessageContext';
import { ShowModalContext } from '../../../contexts/showModal';
import taskActions, { getAllTasks } from '../../../redux/actions/taskActions'
import { Modal } from 'react-bootstrap'
import history from '../../../history';

export const ModalDialogue = (props) => {
    const tasks = useSelector(state => state.tasks)
    const [taskToDelete, setTaskToDelete] = useState()
    const [showState, setShowState] = useContext(ShowModalContext)
    const [confirmMessage, setConfirmMessage] = useContext(ConfirmMessageContext)
    const dispatch = useDispatch()

    const showModal = (event) => {
        const targetInt = parseInt(event.target.id)
        setTaskToDelete(tasks.find(task => task["id"] === targetInt))
        setShowState(true)
    }

    useEffect(() => {
        dispatch(getAllTasks())
    }, [dispatch])
    
    const hideModal = () => setShowState(false)

    const handleDeleteTask = () => {
        dispatch(taskActions.deleteTaskFromDB(taskToDelete))
        let taskMessage = document.getElementById('confirm-message')
        setConfirmMessage(`Task '${taskToDelete.title}' has been deleted` )
        hideModal()
        dispatch(getAllTasks())
        history.push('/tasks');
    }

    return (
        <div>
            <Modal show={showState} onHide={hideModal}>
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
    )
}
