import {
  LOAD_TASKS,
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK,
} from './actionTypes'

export function loadTasks(tasks) {
  return {
    type: LOAD_TASKS,
    payload: tasks
  }
}

export function createTask(task) {
  return {
    type: CREATE_TASK,
    task
  }
}

export function updateTask(task) {
  return {
    type: UPDATE_TASK,
    task
  }
}

export function deleteTask(index) {
  return { type: DELETE_TASK, index: index }
}

//middleware
export const getAllTasks = () => dispatch => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.token}`
    }
  };
  fetch(`http://localhost:3001/users/${localStorage.getItem('user_id')}/tasks`, config)
    .then(r => r.json())
    .then(tasks => {
      dispatch(loadTasks(tasks));
    })
    .catch(error => console.log("ERROR:", error))
};

const createTaskToDB = taskObj => dispatch => {
  delete taskObj.task.id
  const config = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(taskObj)
  };

  fetch(`http://localhost:3001/users/${localStorage.getItem('user_id')}/tasks`, config)
    .then(result => result.json())
    .then(data => {
      dispatch(createTask(data.task));
    })
    .catch(error => console.log(error))
};

const updateTaskToDB = task => dispatch => {
  dispatch(updateTask(task));
  const config = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  };

  fetch(`http://localhost:3001/users/${localStorage.getItem('user_id')}/tasks/${task.task.id}`, config)
    .then(result => result.json())
    .then(dispatch(getAllTasks()))
    .catch(error => console.log(error))
};

const deleteTaskFromDB = task => dispatch => {
  const config = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
      'Content-Type': 'application/json'
    }
  };
  
  fetch(`http://localhost:3001/users/${localStorage.getItem('user_id')}/tasks/${task.id}`, config)
    .then(result => result.json())
    .then(() => {
      dispatch(deleteTask(task.id));
    })
    .then(dispatch(getAllTasks()))
    .catch(error => console.log(error))
};

export default {
  loadTasks,
  getAllTasks,
  createTask,
  createTaskToDB,
  updateTask,
  updateTaskToDB,
  deleteTaskFromDB
};