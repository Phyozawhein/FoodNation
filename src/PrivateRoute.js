import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import {useAuth} from "./context/AuthContext"

function PrivateRoute({component: Component, ...rest}) {
    const {currentUser} = useAuth();
    console.log(currentUser)
    return (
        <Route
            {...rest}
            render = {props => {
               return currentUser ? <Component {...props} /> : <Redirect to ="/login" />
            }}
        >
        </Route>
    )
}

export default PrivateRoute
