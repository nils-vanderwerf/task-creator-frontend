import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './redux/store/store'
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import { TaskCloneContextProvider } from './contexts/taskCloneContext';
import { ConfirmMessageContextProvider } from './contexts/confirmMessageContext';

ReactDOM.render(
  <Provider store={store}>
    <TaskCloneContextProvider>
      <ConfirmMessageContextProvider>
      <App />
      </ConfirmMessageContextProvider>
    </TaskCloneContextProvider>
  </Provider>,
  document.getElementById('root')
);

