import React, {useState, useEffect} from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { getAllTasks } from '../../../redux/actions/taskActions'
import ButtonContainer from './ButtonContainer'

const ShowTask = (props) => {

    // const location = useLocation()
    const params = useParams()
    const tasks = useSelector(state => state.tasksReducer)
    const taskToShow = tasks.find(task => task.id == params.id)
    // const [task, setTask] = useState()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllTasks())
      }, [dispatch])


      console.log("Tasks, params", tasks, params)
      console.log("This task", tasks.find(task => task.id == params.id ))
      console.log("Show page task", taskToShow)
    return (
        <div class="main-container">
            <h3>Task: {taskToShow.title}</h3>
            <p>Description: {taskToShow.description}</p>
            <div className="col-sm-4">
            <ButtonContainer task={taskToShow}/>
            </div>
        </div>

    )
}

export default ShowTask
