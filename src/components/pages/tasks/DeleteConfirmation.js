import React from 'react'
import { Button } from "react-bootstrap";

const DeleteConfirmation = ({ taskToDelete, hideModal, confirmModal }) => {
    console.log("Delete Confirmation task", taskToDelete)
    return (
        // <Modal show={show}>
            <>
                <div className="alert alert-danger">
                    Are you sure you want to delete this task?
                    {/* {message} */}
                </div>
                {/* onhide modal */}
                <Button variant="default" onClick={hideModal}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={() => confirmModal()}>
                    Delete
                </Button>
            </>
    )
}

export default DeleteConfirmation;