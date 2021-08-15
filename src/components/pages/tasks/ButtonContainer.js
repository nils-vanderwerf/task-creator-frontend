import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Modal, Button } from "react-bootstrap";
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import taskActions from '../../../redux/actions/taskActions';
import { useHistory } from 'react-router-dom';
import DeleteConfirmation from './DeleteConfirmation';


const ButtonContainer = (props) => {
    const history = useHistory()
    const dispatch = useDispatch();

    console.log("Button container Task id", props.task.id)

    const handleDeleteTask = async () => {
        await dispatch(taskActions.deleteTaskFromDB({ task: props.task }))
        history.push('/tasks');
    }
    const [show, setShow] = useState(false)
    const showModal = () => setShow(true)
    const hideModal = () => setShow(false)

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
            <Button className="col-6" variant="primary" onClick={showModal}>
                Delete
            </Button>

            <Modal show={show}>

                <Modal.Header closeButton onClick={hideModal}>
                    <Modal.Title>Delete Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DeleteConfirmation
                        onHide={hideModal}
                        confirmModal={handleDeleteTask}
                        id={props.task.id}
                    />
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ButtonContainer;
