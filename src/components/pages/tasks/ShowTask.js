import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import taskActions from '../../../redux/actions/taskActions'
import userActions from '../../../redux/actions/userActions'
import ButtonContainer from './ButtonContainer'

const ShowTask = (props) => {
    const tasks = useSelector(state => state.tasks)
    const dispatch = useDispatch()
    const params = useParams()
    const taskToShow = tasks.find(task => task.id == params.id)

    useEffect(() => {
        dispatch(taskActions.getAllTasks())
        dispatch(userActions.getCurrentUser())
    }, [dispatch])

    return (
        <div className="main-container">
            <h3>Task: {taskToShow.title}</h3>
            <p>Description: {taskToShow.description}</p>
            <div className="categories-list">
                {taskToShow.categories.map(cat => (
                    <span key={cat.id}>{cat?.title}</span>
                ))}
            </div>
            <div className="col-sm-4">
                <ButtonContainer task={taskToShow} />
            </div>
        </div>

    )
}

export default ShowTask;
