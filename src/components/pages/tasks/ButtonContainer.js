import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const ButtonContainer = ({task, showModal, deleteTask}) => {

    return (
        <div className="button-container d-flex justify-content-between">
            <Link to={{
                pathname: `/tasks/${task.id}/edit`
            }}>
                <Button className="col-6"
                    variant="primary">
                    <FontAwesomeIcon icon="edit" /> Edit
                </Button>
            </Link>
            <Button className="col-6" variant="primary" onClick={showModal}>
            <FontAwesomeIcon icon="trash" /> Delete
            </Button>
        </div>
    )
}

export default ButtonContainer;
