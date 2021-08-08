import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import { closeDeleteConfirm, deleteConfirmMessage } from '../../redux/actions/deleteActions'
import DeleteButton from '../DeleteButton'
import {deleteTask} from '../../redux/actions/taskActions'

// import taskActions from '../../redux/actions/taskAction';

const TaskItem = (props) => {
   
    const handleDeleteTask = () => {
      deleteConfirmMessage(props.task)
    } 

    return (
        <>
        <li>
        <Link to={ { 
            pathname: `/task/${props.task.id}`,
            state: {
                task: props.task.id
            }}}> 
            <h2>{props.task.title}</h2>
        </Link>
            <p>{props.task.description}</p>
            <Link to={ { pathname: `/tasks/${props.task.id}/edit` }}>
                <button> Edit </button>
            </Link>
           
            <DeleteButton
                confirmMessageDisplay={props.confirmMessageDisplay}
                closeDeleteConfirm={props.closeDeleteConfirm}
                item={props.task}
            >
            </DeleteButton>
        </li>
        </>
    )
}

const mapStateToProps = (state) => ({
    confirmMessageDisplay: state.delete.confirmMessageDisplay
})

const mapDispatchToProps = (dispatch) => ({
    deleteConfirmMessage: (item) => dispatch(deleteConfirmMessage(item)),
    closeDeleteConfirm: () => dispatch(closeDeleteConfirm()),
    deleteTask: (id) => dispatch(deleteTask(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem)