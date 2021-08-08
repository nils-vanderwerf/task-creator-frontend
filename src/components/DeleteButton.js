import React from 'react'
import { connect } from 'react-redux';
import { deleteConfirmMessage } from '../redux/actions/deleteActions';


const DeleteButton = ({item, deleteConfirmMessage, confirmMessageDisplay}) => {
    const handleDeleteClick = (item) => {
        if (confirmMessageDisplay) {
            return;
        }
        else {
            deleteConfirmMessage(item)
        }
    }


    return (
        <div>
             <button  
            onClick={
                () => handleDeleteClick()}>
                    Delete
            </button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    confirmMessageDisplay: state.delete.confirmMessageDisplay,
})

const mapDispatchToProps = (dispatch) => ({
    deleteConfirmMessage: (item) => dispatch(deleteConfirmMessage(item))
})

export default connect(mapStateToProps,mapDispatchToProps)(DeleteButton);
