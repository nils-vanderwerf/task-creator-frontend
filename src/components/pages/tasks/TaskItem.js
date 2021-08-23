import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'

// import taskActions from '../../redux/actions/taskAction';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTasks } from '../../../redux/actions/taskActions';
import './Tasks.style.css'
import ButtonContainer from './ButtonContainer';
import history from '../../../history';

const TaskItem = ({taskId, showState, showModal, hideModal, confirmMessage}) => {
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.tasks)
    const params = useParams()
    const task = tasks.find(task => task["id"] === taskId )

    useEffect(() => {
        dispatch(getAllTasks())
    }, [])

    return (
        <>
            <li>
            <Link key={taskId} to={`/tasks/${task.id}`} task={task} className="link-button">
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
                    showModal={showModal}
                />

            </li>
        </>
    )
}

export default TaskItem
