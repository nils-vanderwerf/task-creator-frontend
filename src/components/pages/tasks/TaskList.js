import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTasks } from '../../../redux/actions/taskActions'
import TaskItem from './TaskItem'

const TaskList = () => {
    const tasks = useSelector(state => state.tasksReducer)

    console.log(tasks)
    const dispatch = useDispatch()
  
    useEffect(() => {
      dispatch(getAllTasks())
    }, [dispatch])

    return (
        <div>
        <h1>Your Tasks</h1>
            <ul className="task-list d-flex flex-wrap">
                {tasks.map(
                    task => <TaskItem key={task.id} task={task}/>)
                }
            </ul>
        </div>
    )
}

export default TaskList
