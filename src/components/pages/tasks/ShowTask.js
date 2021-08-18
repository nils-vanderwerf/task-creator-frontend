import React, {useEffect} from 'react'
import {useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {getAllTasks} from '../../../redux/actions/taskActions'
import userActions from '../../../redux/actions/userActions'
import ButtonContainer from './ButtonContainer'
import { Provider } from 'react-redux'
import store from '../../../redux/store/store'
import currentUser from '../../../redux/reducers/currentUser'

const ShowTask = (props) => {
    const currentUser = useSelector(state => state.currentUser)
    const tasks = useSelector(state => state.tasks)
    const dispatch = useDispatch()
    const params = useParams()
    
    console.log("currentUser", currentUser)
    console.log("Tasks on show page", tasks)
    const taskToShow = tasks.find(task => task.id == params.id)
    console.log(props)

    useEffect(() => {
        dispatch(getAllTasks())
        dispatch(userActions.getCurrentUser())
    }, [])
    // const [task, setTask] = useState()


    return (
        <div class="main-container">
            <h3>Task: {taskToShow?.title}</h3>
            <p>Description: {taskToShow?.description}</p>
            <div className="categories-list">
                    {taskToShow?.categories.map(cat => (
                        <span>{cat?.title}</span>
                    ))}
                </div>
            <div className="col-sm-4">
            <ButtonContainer task={taskToShow}/>
            </div>
        </div>

    )
}

export default ShowTask
