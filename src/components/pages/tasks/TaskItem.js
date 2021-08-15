import React from 'react'
import { Link } from 'react-router-dom'

// import taskActions from '../../redux/actions/taskAction';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import taskActions from '../../../redux/actions/taskActions';

import './Tasks.style.css'
import ButtonContainer from './ButtonContainer';
import {Modal} from 'react-bootstrap'
import history from '../../../history';
import DeleteConfirmation from './DeleteConfirmation';

const TaskItem = ({task, showState, showModal, hideModal, deletedMessage}) => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.tasksReducer.categories)

    const handleDeleteTask = async () => {
        await dispatch(taskActions.deleteTaskFromDB({ task: task }))
        deletedMessage(`Task '${task.title}' has been deleted` )
        hideModal()
        history.push('/tasks');
    }

    return (
        <>
            <li>
                <Link to={{
                    pathname: `/tasks/${task.id}`,
                    state: {
                        task: task.id
                    }
                }}>
                    <h2>{task.title}</h2>
                </Link>
                <p>{task.description}</p>
                <p className="small">Categories:</p>
                <div className="categories-list">
                    {task && task.categories && task.categories.map(cat => (
                        <span>{cat.title}</span>
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