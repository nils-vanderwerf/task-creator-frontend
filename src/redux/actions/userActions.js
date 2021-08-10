// API CONSTANTS
import { SET_USER, 
  CLEAR_USER,
  BASE_URL, 
  USERS_URL, 
  PERSIST_USER_URL, 
  LOGIN_URL, 
  SPECIFIC_USER_URL } from "./actionTypes";

// Redux Actions

const setUserAction = userObj => ({
  type: SET_USER,
  payload: userObj
});

const clearUserAction = () => ({
  type: CLEAR_USER
});

// Fetch
const getCurrentUser = () => dispatch => {
  if (localStorage.getItem('token')) {
    const config = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    };
    
    fetch(`http://localhost:3001/users/${localStorage.getItem('user_id')}`, config)
      .then(r => r.json())
      .then(userInstance => {
        dispatch(setUserAction(userInstance));
      });
  }
};

const newUserToDB = userObj => dispatch => {
  console.log("User object", JSON.stringify(userObj))
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userObj)
  };
  fetch('http://localhost:3001/users', config)
    .then(result => result.json())
    .then(data => {
      console.log("data", data)
      localStorage.setItem('token', data.token);
      dispatch(setUserAction(data.user));
    })
    .catch(error => console.log(error))
};

const deleteUserFromDB = userId => dispatch => {
  const config = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ` + localStorage.token
    }
  };
  fetch(`http://localhost:3001/users/${userId}`, config).then(r => {
    dispatch(clearUserAction());
    localStorage.clear();
  });
};

const loginUserToDB = userCredentials => dispatch => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userCredentials)
  };
  fetch('http://localhost:3001/login', config)
    .then(r => r.json())
    .then(data => {
      console.log('Login data > ', data);
      if (data.base) {
        dispatch(setUserAction(data))
      }
      else {
        
        localStorage.setItem('token', data.token);
        localStorage.setItem('user_id', data.user.id);
        dispatch(setUserAction(data.user));
      }
    })
    .catch(error => console.log('error', error))
};

const logoutUser = () => dispatch => {
  const config = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  };

  fetch(`http://localhost:3001/logout`, config)
    .then(r => r.json())
    .then(() => {
      dispatch(clearUserAction());
      localStorage.clear();
    });
};

export default {
  newUserToDB,
  deleteUserFromDB,
  loginUserToDB,
  getCurrentUser,
  logoutUser
};