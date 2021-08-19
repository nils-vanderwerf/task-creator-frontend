import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import taskActions, { getAllTasks } from '../../../redux/actions/taskActions';
import userActions from '../../../redux/actions/userActions';
import { getAllCategories } from '../../../redux/actions/categoryActions';
import { Button, Form, FormControl } from 'react-bootstrap'
import { TaskCloneContext } from '../../../contexts/taskCloneContext';
import { ConfirmMessageContext } from '../../../contexts/confirmMessageContext';
import '../auth/Form.style.css'

const InputTaskForm = ({task}) => {
  const dispatch = useDispatch()
  let categories 
  = useSelector(state => state.categoriesReducer.categories)
  let currentUser = useSelector(state => state.currentUser.id)
  const tasks = useSelector(state => state.tasks)

  
  const location = useLocation()
  const history = useHistory();
  const path = location.pathname
  const params = useParams()
  const taskToEdit = tasks.find(task => task.id == params.id)
  // const [taskClone, setTaskClone] = useContext(TaskCloneContext)
  const [checkedCats, setCheckedCats] = useState([])
  const [setConfirmMessage] = useContext(ConfirmMessageContext)
// Setting up local state using the useState hook


  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(userActions.getCurrentUser());
      dispatch(getAllTasks())
      dispatch(getAllCategories());
      setTaskForm({
        ...taskForm, task: {
          ...taskForm.task,
          category_ids:checkedCats
        }
    })
  }
}, [dispatch, checkedCats])

const [taskForm, setTaskForm] =
useState({
  task: {
    id: taskToEdit && taskToEdit.id,
    title: taskToEdit && taskToEdit.title,
    description: taskToEdit && taskToEdit.description,
    category_ids: checkedCats,
    user_id: currentUser
  }
})

  const handleCheckBoxChange = event => {
    let array = [...checkedCats]
    let index = array.indexOf(event.target.value)

    if (event.target.checked) {
      const selectedEl = categories.find
      (cat => event.target.name === cat.title)
      array = [...checkedCats, selectedEl.id]
      setCheckedCats(array)
      setTaskForm((prevTask) => ({
        ...prevTask,
        task: {
          ...prevTask.task,
          category_ids: array
        }
      }))
    }
    else {
      array.splice(index, 1);
      setCheckedCats(array)
    }
  }
    
    // Controlled form functions
    const handleChange = e => {
      setTaskForm({
        ...taskForm, task: {
          ...taskForm.task,
          [e.target.name]: e.target.value
        }
      });
    }

    const handleCreateTask = e => {
      e.preventDefault();
      dispatch(taskActions.createTaskToDB(taskForm));
      setConfirmMessage(`${taskForm.task.title} has been created.`)
      history.push('/tasks');
    };

    const handleEdit = e => {
      // e.preventDefault();
      dispatch(taskActions.updateTaskToDB(taskForm));
      taskForm.categories = taskForm.category_ids
      delete taskForm.category_ids
      dispatch(taskActions.updateTask(taskForm))
      setConfirmMessage(`${taskToEdit.title} has been updated.`)
      history.push('/tasks');
    }

    // Destructuring keys from our local state to use in the form
    const { title, description } = taskForm.task;
    if (!categories) {
      return null
    }
    else {
    // Component code
    return (
      <div className="auth-form col-12">
        <div className="form-inner-content align-items-center justify-content-center col-md-4 col-sm-6">
          <Form onSubmit={(path === '/tasks/new') ? handleCreateTask : handleEdit}>
            <Form.Group className="mb-3">
              <h1 className="auth-header mb-4">{(path === '/tasks/new') ? "New Task" : "Edit task"}</h1>
              <FormControl className="title"
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
                placeholder="Task Title"
              />
            </Form.Group>
            <br />
            <Form.Group className="description">
              <textarea className="col-3 form-control"
                name="description"
                value={description}
                onChange={handleChange}
                cols="40"
                rows="5"
              />
            </Form.Group>

            <Form.Group>
              <div className="check-container d-flex">
                {categories.map(cat => {
                  return (
                    <div className="form-check col-sm-6 mb-2" key={cat.id}>
                      <input className="form-check-input"
                        type="checkbox"
                        name={cat.title}
                        key={cat.id}
                        value={cat.id}
                        defaultChecked={taskToEdit && taskToEdit.categories && taskToEdit.categories.find(taskCat => taskCat.title === cat.title)}
                        onChange={handleCheckBoxChange}
                        id="flexCheckDefault"></input>
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        {cat.title}
                      </label>
                    </div>
                  )
                })}
              </div>
            </Form.Group>
            <Button type="submit">{(path === '/tasks/new') ? 
            "Create Task" : "Edit Task"} </Button>


          </Form>
        </div>
      </div>
    );
   }
  };

  export default InputTaskForm;