import { LOAD_TASKS, CREATE_TASK, DELETE_TASK, UPDATE_TASK } from '../actions/actionTypes'

const tasks = (state = [], action) => {
    switch (action.type) {
        case LOAD_TASKS:
            return action.payload
        case CREATE_TASK:
            return [
                ...state,
                {
                    id: action.task.id,
                    title: action.task.title,
                    description: action.task.description,
                    categories: action.task.categories
                }
            ]
        case UPDATE_TASK:
          const newState = state.map(task => {
              return task.id === action.task.task.id ? 
              action.task : task
            });
          return newState;
        case DELETE_TASK:
            return state.filter(task => task.id !== action.id)

        default:
            return state;
    }
}

export default tasks