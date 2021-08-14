import React, {useState, useEffect} from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { getAllTasks } from '../../../redux/actions/taskActions'

const ShowTask = (props) => {
    // const location = useLocation()
    const params = useParams()
    const tasks = useSelector(state => state.tasksReducer)

    // const [task, setTask] = useState()
    const dispatch = useDispatch()

    // useEffect(() => {
    //     const findTask = tasks.find(task => task.id == params.id )
    //     console.log("Find task", findTask, "Props.params:", params.id, "tasks:", tasks)
    //     // setTask(findTask)
    //   }, [])
      
    useEffect(() => {
        dispatch(getAllTasks())
      }, [dispatch])

      console.log("This task", tasks.find(task => task.id == params.id ))
      const showPageTask = tasks.find(task => task.id == params.id)
      console.log("Show page task", showPageTask)
    return (
        <div>
            <h3>{showPageTask.title}</h3>
            <p>{showPageTask.description}</p>
        </div>
    )
}

export default ShowTask
