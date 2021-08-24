import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

const ButtonContainer = ({ task, showModal }) => {
    return (
        <div className="button-container d-flex justify-content-between">
            <Link to={{
                pathname: `/tasks/${task.id}/edit`
            }}>
                <Button className="col-6"
                    variant="primary">
                    <FontAwesomeIcon icon={faEdit} /> Edit 
                </Button>
            </Link>
            <Button className="col-6" variant="primary" id={task.id} onClick={showModal}>
            <FontAwesomeIcon icon={faTrash}/> Delete 
            </Button>
        </div>
    )
}

export default ButtonContainer;
