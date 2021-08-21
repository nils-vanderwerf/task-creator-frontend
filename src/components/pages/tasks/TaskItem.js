import React, {useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
// import taskActions from '../../redux/actions/taskAction';
import { useDispatch } from 'react-redux';
import taskActions from '../../../redux/actions/taskActions';
import './Tasks.style.css'
import ButtonContainer from './ButtonContainer';
import {Modal } from 'react-bootstrap'
import history from '../../../history';
import DeleteConfirmation from './DeleteConfirmation';

const TaskItem = ({taskId, showState, showModal, hideModal, confirmMessage}) => {
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.tasks)
    const params = useParams()
    console.log("tasks", tasks, "taskId", taskId)
    const task = tasks.find(task => task["id"] === taskId )
    

    const handleDeleteTask = () => {
        console.log("This task ==", task )
        dispatch(taskActions.deleteTaskFromDB(task))
        let taskMessage = document.getElementById('confirm-message')
        confirmMessage(`Task '${task.title}' has been deleted` )
        hideModal()
        history.push('/tasks');
    }

    // useEffect(() => {
    //     dispatch(getAllTasks())
    // }, [])

    return (
        <>
            <li>
            <Link key={taskId} to={`/tasks/${taskId}`} task={task} className="link-button">
                    <h2>{task.title}</h2>
                </Link>
                <p>{task.description}</p>
                <p className="small">Categories:</p>
                <div className="categories-list">
                    {task.categories?.map(cat => (
                        <span key={cat.id}>{cat.title}</span>
                    ))}
                </div>
                <ButtonContainer
                    task={task}
                    deleteTask={handleDeleteTask}
                    showModal={showModal}
                />

                <Modal show={showState} onHide={hideModal}>
                    <Modal.Header closeButton onClick={hideModal}>
                        <Modal.Title>Delete Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <DeleteConfirmation
                            hideModal={hideModal}
                            confirmModal={handleDeleteTask}
                            id={task.id}
                        />
                    </Modal.Body>
                </Modal>
            </li>
        </>
    )
}

export default TaskItem
