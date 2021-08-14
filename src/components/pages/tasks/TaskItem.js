import React from 'react'
import { Link } from 'react-router-dom'

// import taskActions from '../../redux/actions/taskAction';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './Tasks.style.css'
import ButtonContainer from './ButtonContainer';

const TaskItem = (props) => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.tasksReducer.categories)
    console.log("Task index", props.taskIndex)

    return (
        <>
            <li>
                <Link to={{
                    pathname: `/tasks/${props.task.id}`,
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
            <ButtonContainer 
                task={props.task}/>
            </li>
        </>
    )
}

export default TaskItem