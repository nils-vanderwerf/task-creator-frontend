import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTasks } from '../../../redux/actions/taskActions'
import TaskItem from './TaskItem'
import './Tasks.style.css'

const TaskList = () => {
    const tasks = useSelector(state => state.tasksReducer)

    const dispatch = useDispatch()
  
    useEffect(() => {
      dispatch(getAllTasks())
    }, [dispatch])

    return (
        <div className="main-container">
        <div className="all-tasks p-10">
        <h1>Your Tasks</h1>
            <ul className="task-list d-flex flex-wrap">
                
                {tasks && tasks.map(
                        (task, index) => (
                        <div className="task col-sm-4" key={task.id}>
                            <TaskItem taskIndex={index} task={task}/>
                        </div>
                        )
                    )
                }
            </ul>
        </div>
    </div>
    )
}

export default TaskList
