import React, {createContext, useState} from "react"
const TaskToDeleteContext = createContext()

const TaskToDeleteContextProvider = (props) => {
    const [taskToDelete, setTaskToDelete] = useState({})
    
    return (
        <TaskToDeleteContext.Provider 
            value={[taskToDelete, setTaskToDelete]}>
                {props.children}
        </TaskToDeleteContext.Provider>
    )
    
}

export { TaskToDeleteContext, TaskToDeleteContextProvider};
