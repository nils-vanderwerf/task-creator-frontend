import React from 'react'
import { Link } from 'react-router-dom'

import Button from 'react-bootstrap/Button';

// import taskActions from '../../redux/actions/taskAction';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import taskActions from '../../../redux/actions/taskActions';
import './Tasks.style.css'

const TaskItem = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const categories = useSelector(state => state.tasksReducer.categories)
    console.log("Task index", props.taskIndex)

    const handleDeleteTask = async () => {
        await dispatch(taskActions.deleteTaskFromDB({ task: props.task }))
        history.push('/tasks');
    }

    return (
        <>
            <li>
                <Link to={{
                    pathname: `/task/${props.task.id}`,
                    state: {
                        task: props.task.id
                    }
                }}>
                    <h2>{props.task.title}</h2>
                </Link>
                <p>{props.task.description}</p>
                <div className="categories-list">
                    {props.task.categories.map(cat => (
                        <span>{cat.title}</span>
                    ))}
                </div>
                <div className="button-container d-flex justify-content-between">
                    <Link to={{ pathname: `/tasks/${props.task.id}/edit` }}>
                        <Button className="col-6" variant="primary"> Edit </Button>
                    </Link>
                    <Button className="col-6" onClick={handleDeleteTask} variant="primary">Delete</Button>
                </div>
            </li>
        </>
    )
}

export default TaskItem