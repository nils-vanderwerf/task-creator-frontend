import React, {createContext, useState} from "react"
const TaskCloneContext = createContext()

const TaskCloneContextProvider = (props) => {
    const [taskClone, setTaskClone] = useState()

    console.log("Context", taskClone)
    
    return (
        <TaskCloneContext.Provider 
            value={[taskClone, setTaskClone]}>
                {props.children}
        </TaskCloneContext.Provider>
    )
    
}

export {TaskCloneContext, TaskCloneContextProvider};
