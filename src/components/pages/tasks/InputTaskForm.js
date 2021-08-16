
import React, { useState, useEffect, useContext } from 'react';
import { FormGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import taskActions from '../../../redux/actions/taskActions';
import userActions from '../../../redux/actions/userActions';
import categoryActions from '../../../redux/actions/categoryActions'
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
  const tasks = useSelector(state => state.tasksReducer)
  
  const location = useLocation()
  const history = useHistory();
  const path = location.pathname
  const params = useParams()
  const taskToEdit = tasks.find(task => task.id == params.id)
  // const [taskClone, setTaskClone] = useContext(TaskCloneContext)
  const [checkedCats, setCheckedCats] = useState([])
  const [confirmMessage, setConfirmMessage] = useContext(ConfirmMessageContext)
  console.log(path == `/tasks/${params.id}/edit`)


  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(userActions.getCurrentUser());
      dispatch(getAllCategories());
      console.log("Mounted current user: ", currentUser)
      // console.log("Task clone on mount: ", taskClone)
      setTaskForm({
        ...taskForm, task: {
          ...taskForm.task,
          category_ids:checkedCats,
          categories: checkedCats
        }
    })
  }
  console.log(taskForm)
}, [dispatch, checkedCats])


useEffect(() => {
  // setTaskClone(taskToEdit)
  taskToEdit && taskToEdit.categories && setCheckedCats(taskToEdit.categories.map(category => category.id))
  // setTaskClone(taskToEdit)
  console.log("Checked cats on mount", checkedCats)
  //set task clone context to taskToEdit variable
  //use task clone context object ti
}, [])


  // Setting up local state using the useState hook
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
    console.log("CHECKED CATS BEFORE CHANGE", checkedCats)
    let array = [...checkedCats]
    let index = array.indexOf(event.target.value)

    if (event.target.checked) {
      const selectedEl = categories.find
      (cat => event.target.name === cat.title)
      array = [...checkedCats, selectedEl.id]
      setCheckedCats(array)
    }
    else {
      console.log("ARRAY BEFORE SPLICE", array)
      array.splice(index, 1);
      console.log("ARRAY AFTER SPLICE", array)
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
      console.log("Submitted task is:", taskForm)
      // console.log("This user is", currentUser)
      dispatch(taskActions.createTaskToDB(taskForm));
      setConfirmMessage(`${taskForm.task.title} has been created.`)
      history.push('/tasks');
    };

    const handleEdit = e => {
      // e.preventDefault();
      dispatch(taskActions.updateTaskToDB(taskForm));
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
                    <div className="form-check col-sm-6 mb-2">
                      <input className="form-check-input"
                        type="checkbox"
                        name={cat.title}
                        key={cat.id}
                        value={cat.id}
                        defaultChecked={taskToEdit && taskToEdit.categories && taskToEdit.categories.find(taskCat => taskCat.title === cat.title)}
                        onChange={handleCheckBoxChange}
                        id="flexCheckDefault"></input>
                      <label className="form-check-label" for="flexCheckDefault">
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