import React from 'react'
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'

const DeleteConfirmation = ({task, handleDeleteTask, hideModal}) => {
    return (
        // <Modal show={show}>
            <>
                <div className="alert alert-danger">
                Are you sure you want to delete this task?
                    {/* {message} */}
                </div>
                {/* onhide modal */}
                <Button variant="default" onClick={hideModal}>
                <FontAwesomeIcon icon={faTimes} /> Cancel
                </Button>
                <Button variant="danger" onClick={handleDeleteTask}>
                <FontAwesomeIcon icon={faTrash}/> Delete
                </Button>
            </>
    )
}

export default DeleteConfirmation;