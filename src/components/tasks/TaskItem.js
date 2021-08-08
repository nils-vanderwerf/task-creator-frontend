import React from 'react'
import {Link} from 'react-router-dom'

// import taskActions from '../../redux/actions/taskAction';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import taskActions from '../../redux/actions/taskActions';

const TaskItem = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

    const handleDeleteTask = async () => {
      await dispatch(taskActions.deleteTaskFromDB({task: props.task}))
      history.push('/tasks');
    } 

    return (
        <>
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
                <button> Edit </button>
            </Link>
            <button onClick={handleDeleteTask}>Delete</button>
        </li>
        </>
    )
}

export default TaskItem