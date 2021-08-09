import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTasks } from '../../../redux/actions/taskActions'
import TaskItem from './TaskItem'
import './Tasks.style.css'

const TaskList = () => {
    const tasks = useSelector(state => state.tasksReducer)

    console.log(tasks)
    const dispatch = useDispatch()
  
    useEffect(() => {
      dispatch(getAllTasks())
    }, [dispatch])

    return (
        <div class="main-container">
        <div className="all-tasks p-10">
        <h1>Your Tasks</h1>
            <ul className="task-list d-flex flex-wrap">
                {tasks.map(
                    task => <TaskItem key={task.id} task={task}/>)
                }
            </ul>
        </div>
    </div>
    )
}

export default TaskList
