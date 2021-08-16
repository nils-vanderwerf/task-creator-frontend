import React, {createContext, useState} from "react"
const ConfirmMessageContext = createContext()

const ConfirmMessageContextProvider = (props) => {
    const [confirmMessage, setConfirmMessage] = useState()
    
    return (
        <ConfirmMessageContext.Provider 
            value={[confirmMessage, setConfirmMessage]}>
                {props.children}
        </ConfirmMessageContext.Provider>
    )
    
}

export {ConfirmMessageContext, ConfirmMessageContextProvider};
