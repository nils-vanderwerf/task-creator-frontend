import React, {createContext, useState} from "react"
const CurrentTaskContext = createContext()

const CurrentTaskContextProvider = (props) => {
    const [currentTask, setCurrentTask] = useState()
    
    return (
        <CurrentTaskContext.Provider 
            value={[currentTask, setCurrentTask]}>
                {props.children}
        </CurrentTaskContext.Provider>
    )
    
}

export {CurrentTaskContext, CurrentTaskContextProvider};
