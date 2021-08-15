import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Modal, Button, Alert } from "react-bootstrap";
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import taskActions from '../../../redux/actions/taskActions';
import { useHistory } from 'react-router-dom';
import DeleteConfirmation from './DeleteConfirmation';
import ShowTask from './ShowTask';


const ButtonContainer = ({task, showModal, deleteTask}) => {
    const history = useHistory()
    const dispatch = useDispatch();
    const [deleteMessage, setDeleteMessage] = useState(null)


    console.log("Button container Task id", task.id)

    return (
        <div className="button-container d-flex justify-content-between">
            <Link to={{
                pathname: `/tasks/${task.id}/edit`
            }}>
                <Button className="col-6"
                    variant="primary">
                    Edit
                </Button>
            </Link>
            <Button className="col-6" variant="primary" onClick={showModal}>
                Delete
            </Button>
        </div>
    )
}

export default ButtonContainer;
