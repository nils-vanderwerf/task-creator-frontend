import { useDispatch } from 'react-redux'
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from 'react-router-dom';


const ButtonContainer = ({task, showModal, deleteTask}) => {
    const history = useHistory()
    const dispatch = useDispatch();

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
