// user context
import React from 'react';
import { useState } from 'react';
import { createContext } from 'react';

export const userContext = createContext(); 
function getUserFromLocalStorage (){
    return localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):{username: null, token: null}
}

const UserProvider = ({children}) => {
  const [user, setUser] = useState(getUserFromLocalStorage());
  const userLogin = user =>{
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user))
  }
  const userLogout = () =>{
      setUser({username:null, token: null})
      localStorage.removeItem('user')
  }

  const [alert, setAlert] = useState({
      show: false,
      msg: "",
      type: 'success'
  })
  const showAlert = ({msg, type="success"}) =>{
    setAlert({show: true, msg, type})
  }
  const hideAlert = () => {
      setAlert({...alert, show:false})
  }
     return (
        <userContext.Provider value={{user, userLogin, userLogout,alert,showAlert,hideAlert}}>
            {children}
        </userContext.Provider>
    );
};

export default UserProvider;