import { combineReducers } from 'redux'
import currentUser from '../reducers/currentUser.js'
import tasks from '../reducers/tasksReducer.js'
import categoriesReducer from '../reducers/categoriesReducer'

const rootReducer = combineReducers({
    currentUser,
    tasks,
    categoriesReducer,
  })

export default rootReducer;