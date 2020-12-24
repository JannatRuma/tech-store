import React from 'react';
import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { userContext } from '../context/user';

const PrivateRoute = ({children, ...rest}) => {
  const {user} = useContext(userContext)
  return (
    <Route {...rest} render={()=>{
      return(
        user.token ? children : <Redirect to="/login"></Redirect>
      ) 
    }} >
    </Route>
  );
};

export default PrivateRoute;