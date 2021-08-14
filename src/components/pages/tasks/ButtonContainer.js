import React from 'react'
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button';

const ButtonContainer = (props) => {
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
        <Button className="col-6" onClick={props.handleDeleteTask} variant="primary">Delete</Button>
    </div>
    )
}

export default ButtonContainer;
