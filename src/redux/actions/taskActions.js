import {
  LOAD_TASKS,
  CREATE_TASK,
  UPDATE_TASK,
  TASK_COMPLETED,
  DELETE_TASK,
} from './actionTypes'

export function loadTasks(tasks) {
  console.log("Load tasks function")
  return {
    type: LOAD_TASKS,
    payload: tasks
  }
}

export function createTask(task) {
  console.log("THE TASK", task)
  return {
    type: CREATE_TASK,
    task
  }
}

export function taskCompleted(index) {
  return {
    type: TASK_COMPLETED,
    index: index
  }
}

export function updateTask(task) {
  console.log(task)
  return {
    type: UPDATE_TASK,
    task
  }
}

export function deleteTask(index) {
  return { type: DELETE_TASK, index: index }
}

export const getAllTasks = () => async dispatch => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.token}`
    }
  };

  fetch(`http://localhost:3001/users/${localStorage.getItem('user_id')}/tasks`, config)
    .then(r => r.json())
    .then(tasks => {
      console.log("<=====Fetch request function====>")
      dispatch(loadTasks(tasks));
    })
    .catch(error => console.log("ERROR:", error))
};

const createTaskToDB = taskObj => dispatch => {
  console.log("Task object before delete:", taskObj.task)
  delete taskObj.task.id
  console.log("Task object after delete:", taskObj)
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
      console.log("the data")
      dispatch(createTask(data.task));
    })
    .catch(error => console.log(error))
};

const updateTaskToDB = task => dispatch => {
  console.log("Task object:", task.task)
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
    .then(data => {
      console.log("the data", data.task)
    })
    .catch(error => console.log(error))
};

const deleteTaskFromDB = ({ task }) => dispatch => {
  console.log("Task object:", task)
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
      console.log("the data")
      dispatch(deleteTask(task.id));
    })
    .catch(error => console.log(error))
};

export default {
  loadTasks,
  getAllTasks,
  createTask,
  createTaskToDB,
  updateTaskToDB,
  deleteTaskFromDB
};