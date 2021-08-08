import { CLOSE_DELETE_CONFIRM, DISPLAY_DELETE_CONFIRM } from "../actions/actionTypes"

const initialState = {
    confirmMessageDisplay: false,
    itemToDelete: null
}

const deleteReducer = (state = initialState, action) => {
    switch (action.type) {
        case DISPLAY_DELETE_CONFIRM:
            return {
                confirmMessageDisplay: true,
                itemToDelete: action.payload,
            };
        case CLOSE_DELETE_CONFIRM:
            return {
                confirmMessageDisplay: false,
                itemToDelete: null
            }
        default:
            return state;
    }
}

export default deleteReducer;