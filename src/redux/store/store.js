import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware} from 'redux' 
import currentUser from '../reducers/currentUser.js'
import tasks from '../reducers/tasksReducer.js'
import categoriesReducer from '../reducers/categoriesReducer'
import logger from 'redux-logger'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { persistStore, persistReducer } from 'redux-persist'

//persists store
const persistConfig = {
    key: 'root',
    storage,
  }



const rootReducer = combineReducers({
    currentUser,
    tasks,
    categoriesReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)






const store = createStore(rootReducer, applyMiddleware(logger, thunk));
let persistor = persistStore(store)

export default store;
