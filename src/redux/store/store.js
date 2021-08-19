import thunk from 'redux-thunk'
import { createStore, compose, applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'; 
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import rootReducer from '../reducers/rootReducer';

//persists store
const persistConfig = {
    key: 'root',
    storage,
  }

const persistedReducer = persistReducer(persistConfig, rootReducer)

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
  persistedReducer,
  composeEnhancer(applyMiddleware(thunk))
)
let persistor = persistStore(store)
export { store, persistor }