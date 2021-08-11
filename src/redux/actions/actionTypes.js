export const BASE_URL = 'http://localhost:3001';
export const SET_USER = 'SET_USER'
export const CLEAR_USER = 'CLEAR_USER'

// USERS URLS
export const USERS_URL = BASE_URL + '/users';
export const PERSIST_USER_URL = BASE_URL + '/get_current_user';
export const LOGIN_URL = BASE_URL + '/login';
export const SPECIFIC_USER_URL = id => USERS_URL + '/' + id;


export const LOAD_TASKS = 'LOAD_TASKS'
export const CREATE_TASK = 'CREATE_TASK'
export const UPDATE_TASK = 'UPDATE_TASK'
export const TASK_COMPLETED = 'TASK_COMPLETED'
export const DELETE_TASK = 'DELETE_TASK'

export const LOAD_CATEGORIES = 'LOAD_CATEGORIES'

//CONFIRMATION DELETE MESSAGE BOX
export const DISPLAY_DELETE_CONFIRM = 'DELETE_TASK'
export const CLOSE_DELETE_CONFIRM = 'CLOSE_DELETE_CONFIRM'

export const GET_TASKS_URL = BASE_URL + '/tasks';
export const CREATE_TASK_URL = BASE_URL + '/create-new-task';

