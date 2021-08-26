import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store/store'
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import { ConfirmMessageContextProvider } from './contexts/confirmMessageContext';
import { PersistGate } from 'redux-persist/integration/react'
import { ShowModalContextProvider } from './contexts/showModal';
import { TaskToDeleteContextProvider } from './contexts/taskToDeleteContext';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConfirmMessageContextProvider>
        <ShowModalContextProvider>
          <TaskToDeleteContextProvider>
          <App />
          </TaskToDeleteContextProvider>
        </ShowModalContextProvider>
      </ConfirmMessageContextProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

