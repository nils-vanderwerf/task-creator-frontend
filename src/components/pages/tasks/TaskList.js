import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTasks } from '../../../redux/actions/taskActions'
import TaskItem from './TaskItem'
import './Tasks.style.css'

const TaskList = () => {
    const tasks = useSelector(state => state.tasksReducer)
    console.log("USER TASKS", tasks)

    console.log(tasks)
    const dispatch = useDispatch()
  
    useEffect(() => {
      dispatch(getAllTasks())
    }, [dispatch])

    return (
        <>
        <div className="all-tasks main-container p-10">
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
    </>
    )
}

export default TaskList
