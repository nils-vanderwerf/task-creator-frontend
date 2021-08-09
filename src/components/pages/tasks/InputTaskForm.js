
import React, { useState, useEffect } from 'react';
import { FormGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import taskActions from '../../../redux/actions/taskActions';
import userActions from '../../../redux/actions/userActions';
import { Button, Form, FormControl } from 'react-bootstrap'
import '../auth/Form.style.css'                                                                                                                                                          
const InputTaskForm = (props) => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser.id)
  const tasks = useSelector(state => state.tasksReducer)
  const location = useLocation()
  const history = useHistory();
  const path = location.pathname
  const params = useParams()
  const taskToEdit = tasks.find(task => task.id == params.id)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(userActions.getCurrentUser());
      console.log("Mounted current user: ", currentUser)
    }
  }, [dispatch])

    // Setting up local state using the useState hook
    const [taskForm, setTaskForm] =  
      useState({
        task: {
          id: (taskToEdit) ? taskToEdit.id : null,
          title: (path === '/tasks/new') ? '' : taskToEdit.title,
          description: (path === '/tasks/new') ? '' : taskToEdit.description,
          user_id: currentUser
        }
      })

      console.log("CURRRRENT USER", taskForm)

  // Controlled form functions
  const handleChange = e => {
    setTaskForm({ ...taskForm, task: {
      ...taskForm.task,
      [e.target.name]: e.target.value 
    }
  });
  }

  const handleCreateTask = e => {
    e.preventDefault();
    console.log("Submitted task is:", taskForm)
    // console.log("This user is", currentUser)
    dispatch(taskActions.createTaskToDB(taskForm));
    history.push('/tasks');
  };

  const handleEdit = e => {
    e.preventDefault();
    dispatch(taskActions.updateTaskToDB(taskForm));
    history.push('/tasks');
  }

  // Destructuring keys from our local state to use in the form
  const { title, description } = taskForm.task;

  // Component code
  return (
    <div className="auth-form col-12">
    <div className="form-inner-content align-items-center justify-content-center col-sm-6">
    <Form onSubmit={(path === '/tasks/new') ? handleCreateTask : handleEdit}>
      <Form.Group className="mb-3">
      <h1 className="auth-header mb-4">{(path === '/tasks/new') ? "New Task" : "Edit task" }</h1>
      <FormControl className="col-3"
        type="text"
        name="title"
        value={title}
        onChange={handleChange}
        placeholder="Task Title"
      />
      </Form.Group>
      <br/>
      <Form.Group className="mb-3">
      <textarea className="col-3 form-control"
        name="description"
        value={description}
        onChange={handleChange}
        cols="40"
        rows="5"
        />
        </Form.Group>
      <Button type="submit">Create Task</Button>
      
    </Form>
    </div>
    </div>
  );
};

export default InputTaskForm;