import { LOAD_TASKS, CREATE_TASK, TASK_COMPLETED, DELETE_TASK, UPDATE_TASK } from '../actions/actionTypes'

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
          console.log('Action >> ', action);
          const newState = state.map(task => task.id === action.task.task.id ? action.task.task : task);
          console.log('new state > ', newState);
          return newState;
        // case TASK_COMPLETED:
        //     return state.map(task => (task.id === action.index)
        //         ? { ...task, done: !task.done }
        //         : task
        //     )
        case DELETE_TASK:
            return state.filter(task => task.id !== action.index)

        default:
            return state;
    }
}

export default tasksReducer