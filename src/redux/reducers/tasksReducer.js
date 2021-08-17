import { LOAD_TASKS, CREATE_TASK, DELETE_TASK, UPDATE_TASK } from '../actions/actionTypes'

const tasksReducer = (state = [], action) => {
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
            console.log('ACTION OBJECT: ', action);
          const newState = state.map(task => {
              console.log("=======TRUE OR FALSE=========")
              console.log(`${task.id} === ${action.task.task.id}: `, task.id === action.task.task.id )
              return task.id === action.task.task.id ? 
              action.task : task
            });
          console.log('new state > ', newState);
          return newState;
        case DELETE_TASK:
            return state.filter(task => task.id !== action.index)

        default:
            return state;
    }
}

export default tasksReducer