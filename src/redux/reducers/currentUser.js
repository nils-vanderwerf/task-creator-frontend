import { SET_USER, CLEAR_USER, SET_ERRORS } from "../actions/actionTypes";

const currentUser = (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return action.payload
    case SET_ERRORS:
      return action.payload
    case CLEAR_USER:
      return {}
    default:
      return state;
  }
};

export default currentUser;