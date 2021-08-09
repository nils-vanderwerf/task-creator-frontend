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
        <div className="task col-sm-4">
            <li>
            <Link to={ { 
                pathname: `/task/${props.task.id}`,
                state: {
                    task: props.task.id
                }}}> 
                <h2>{props.task.title}</h2>
            </Link>
                <p>{props.task.description}</p>
                <div class="button-container d-flex justify-content-between">
                    <Link to={ { pathname: `/tasks/${props.task.id}/edit` }}>
                        <Button className="col-6" variant="primary"> Edit </Button>
                    </Link>
                    <Button className="col-6" onClick={handleDeleteTask} variant="primary">Delete</Button>
                </div>
            </li>
        </div>
    )
}

export default TaskItem