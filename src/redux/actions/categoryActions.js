import {
    LOAD_CATEGORIES,
  } from './actionTypes'

export function loadCategories(categories) {
    return {
      type: LOAD_CATEGORIES,
      payload: categories
    }
  }

  export const getAllCategories = () => dispatch => {
    const config = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    };
  
    fetch(`http://task-creator-app.herokuapp.com/categories`, config)
      .then(r => r.json())
      .then(categories => {
        dispatch(loadCategories(categories));
      });
  };

  export default {loadCategories}