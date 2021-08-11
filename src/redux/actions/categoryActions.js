import {
    LOAD_CATEGORIES,
  } from './actionTypes'

export function loadCategories(categories) {
    console.log("Load categories function")
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
  
    fetch(`http://localhost:3001/categories`, config)
      .then(r => r.json())
      .then(categories => {
        console.log("Fetch request function categories ")
        dispatch(loadCategories(categories));
      });
  };

  export default {loadCategories}