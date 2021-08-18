import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Home from './components/Home'
import Signup from './components/pages/auth/Signup'
import Login from './components/pages/auth/Login'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import userActions from './redux/actions/userActions';
import taskActions from './redux/actions/taskActions';
import NavBar from './components/NavBar'
import TaskList from './components/pages/tasks/TaskList'
import InputTaskForm from './components/pages/tasks/InputTaskForm'
import ShowTask from './components/pages/tasks/ShowTask'
import './App.css'
import history from './history'
import PrivateRoute from './components/PrivateRoute'

// import { getAllCategories } from '../../../redux/actions/categoryActions';

const App = () => {
  const currentUser = useSelector(state => state.currentUser)
  const tasks = useSelector(state => state.tasks)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userActions.getCurrentUser())
    dispatch(taskActions.getAllTasks())
  }, [window.reload])

  console.log("current user", currentUser)

 

  return (
    <Router history={history}>
      <NavBar/>
      <Switch>
        <Route
          exact path={"/"}
          render={props => (
            <Home
              {...props}
              currentUser={currentUser}
            // handleLogout={this.handleLogout}
            />
          )} />
        <Route exact path="/register" component={Signup} />
        <Route path="/login" component={Login} />
        <PrivateRoute exact path="/tasks">
          <TaskList/>
        </PrivateRoute>
        <Route 
          path="/tasks/new"
          render={props => (
            <InputTaskForm {...props} currentUser={currentUser} />
          )}
        />

        <Route exact path='/tasks/:id'
          render={match => <ShowTask match={match} tasks={tasks} />}/>
        <Route path='/tasks/:id/edit' 
          render={match =>
          <InputTaskForm match={match} />
        } />
       
      </Switch>
    </Router>
  )
}

export default App;