import React, {useEffect} from 'react'
import {useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getAllTasks } from '../../../redux/actions/taskActions'
import ButtonContainer from './ButtonContainer'

const ShowTask = (props) => {

    // const location = useLocation()
    const params = useParams()
    const tasks = useSelector(state => state)
    console.log("Tasks on show page", tasks)
    const taskToShow = tasks.find(task => task.id == params.id)
    console.log("Task to Show", taskToShow)

    // const [task, setTask] = useState()
    const dispatch = useDispatch()

    useEffect(() => {
            dispatch(getAllTasks())
      }, [])

    return (
        <div class="main-container">
            <h3>Task: {taskToShow.title}</h3>
            <p>Description: {taskToShow.description}</p>
            <div className="categories-list">
                    {taskToShow?.categories.map(cat => (
                        <span>{cat.title}</span>
                    ))}
                </div>
            <div className="col-sm-4">
            <ButtonContainer task={taskToShow}/>
            </div>
        </div>

    )
}

export default ShowTask
