import {useSelector} from 'react-redux'

import {Redirect, Route} from 'react-router-dom'

function PrivateRoute({ children, ...rest }) {
    let currentUser = useSelector(state => state.currentUser)
    return (
      <Route
        {...rest}
        render={({ location }) =>
        Object.keys(currentUser).length !== 0 ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login"
              }}
            />
          )
        }
      />
    );
  }
  

  export default PrivateRoute

 