import React from 'react'
import {Link} from 'react-router-dom'

import Button from 'react-bootstrap/Button';

// import taskActions from '../../redux/actions/taskAction';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import taskActions from '../../../redux/actions/taskActions';
import './Tasks.style.css'

const TaskItem = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

    const handleDeleteTask = async () => {
      await dispatch(taskActions.deleteTaskFromDB({task: props.task}))
      history.push('/tasks');
    } 

    return (
        <div className="task col-sm-3">
            <li>
            <Link to={ { 
                pathname: `/task/${props.task.id}`,
                state: {
                    task: props.task.id
                }}}> 
                <h2>{props.task.title}</h2>
            </Link>
                <p>{props.task.description}</p>
                <Link to={ { pathname: `/tasks/${props.task.id}/edit` }}>
                    <Button variant="info"> Edit </Button>
                </Link>
                <Button onClick={handleDeleteTask} variant="info">Delete</Button>
            </li>
        </div>
    )
}

export default TaskItem