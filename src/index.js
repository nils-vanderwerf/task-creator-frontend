import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './redux/store/store'
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import { TaskCloneContextProvider } from './contexts/taskCloneContext';

ReactDOM.render(
  <Provider store={store}>
    <TaskCloneContextProvider>
      <App />
    </TaskCloneContextProvider>
  </Provider>,
  document.getElementById('root')
);

