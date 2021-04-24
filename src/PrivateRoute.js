import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

<<<<<<< HEAD
function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  console.log(currentUser);
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    />
  );
=======
function PrivateRoute({component: Component, ...rest}) {
    const {currentUser} = useAuth();
    
    return (
        <Route
            {...rest}
            render = {props => {
               return currentUser ? <Component {...props} /> : <Redirect to ="/login" />
            }}
        >
        </Route>
    )
>>>>>>> a94cd5d311c820153987b0bae1af2e0a2cb07593
}

export default PrivateRoute;
