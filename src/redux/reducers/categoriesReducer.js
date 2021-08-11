import { LOAD_CATEGORIES } from '../actions/actionTypes'

const categoriesReducer = (state = [], action) => {
    switch (action.type) {
        case LOAD_CATEGORIES:
            return action.payload
        default:
            return state;
    }
}

export default categoriesReducer