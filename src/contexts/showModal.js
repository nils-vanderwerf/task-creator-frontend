import React, {createContext, useState} from "react"
const ShowModalContext = createContext()

const ShowModalContextProvider = (props) => {
    const [showState, setShowState] = useState(false)
    
    return (
        <ShowModalContext.Provider 
            value={[showState, setShowState]}>
                {props.children}
        </ShowModalContext.Provider>
    )
    
}

export {ShowModalContext, ShowModalContextProvider};
