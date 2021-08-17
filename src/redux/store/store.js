import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware} from 'redux' 
import currentUser from '../reducers/currentUser.js'
import tasks from '../reducers/tasksReducer.js'
import categoriesReducer from '../reducers/categoriesReducer'
import logger from 'redux-logger'

const rootReducer = combineReducers({
    currentUser,
    tasks,
    categoriesReducer
})

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

export default store;
