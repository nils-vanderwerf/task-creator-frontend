import { DISPLAY_DELETE_CONFIRM, CLOSE_DELETE_CONFIRM } from "./actionTypes"
export const deleteConfirmMessage = (item) => ({
    type: DISPLAY_DELETE_CONFIRM,
    payload: item, 
  })
  
  export const closeDeleteConfirm = () => ({
    type: CLOSE_DELETE_CONFIRM,
  })
  