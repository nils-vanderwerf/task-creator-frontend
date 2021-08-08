import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware} from 'redux' 
import currentUser from '../reducers/currentUser.js'
import tasksReducer from '../reducers/tasksReducer.js'
import deleteReducer from '../reducers/deleteReducer.js'
import logger from 'redux-logger'

const rootReducer = combineReducers({
    currentUser,
    tasksReducer,
    deleteReducer
    //
})


const store = createStore(rootReducer, applyMiddleware(logger, thunk));

export default store;