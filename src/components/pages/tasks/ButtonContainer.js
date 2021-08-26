import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'


const ButtonContainer = ({ task }) => {
    const tasks = useSelector(state => state.tasks)
    const [showState, setShowState] = useContext(ShowModalContext)
    const [confirmMessage, setConfirmMessage] = useContext(ConfirmMessageContext)
    const [taskToDelete, setTaskToDelete] = useContext(TaskToDeleteContext)
    const history = useHistory();

    const dispatch = useDispatch()

    const showModal = (event) => {
        const targetInt = parseInt(event.target.id)
        console.log("Task Int", targetInt)
        const findTask = tasks.find(item => item["id"] === targetInt)
        console.log("FIND TASK >> ", findTask)
        setTaskToDelete(findTask)
        setShowState(true)
    }
  
    useEffect(() => {
        console.log("Set task to delete", taskToDelete)
    }, [taskToDelete])

    const hideModal = () => setShowState(false)

    const handleDeleteTask = () => {
        dispatch(taskActions.deleteTaskFromDB(taskToDelete))
        let taskMessage = document.getElementById('confirm-message')
        setConfirmMessage(`Task '${taskToDelete.title}' has been deleted`)
        hideModal()
        dispatch(getAllTasks())
        history.push('/');
    }


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
