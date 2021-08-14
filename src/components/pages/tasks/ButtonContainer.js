import React from 'react'
import {useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import taskActions from '../../../redux/actions/taskActions';
import { useHistory } from 'react-router-dom';


const ButtonContainer = (props) => {
    const history = useHistory()
    const dispatch = useDispatch();

    console.log(props)

    const handleDeleteTask = async () => {
        await dispatch(taskActions.deleteTaskFromDB({ task: props.task }))
        history.push('/tasks');
    }

    return (
        <div className="button-container d-flex justify-content-between">
        <Link to={{
            pathname: `/tasks/${props.task.id}/edit`
        }}>
            <Button className="col-6"
                variant="primary">
                Edit
            </Button>
        </Link>
        <Button className="col-6" onClick={handleDeleteTask} variant="primary">Delete</Button>
    </div>
    )
}

export default ButtonContainer;
