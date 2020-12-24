import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/cart';
import { userContext } from '../context/user';

const LoginLink = () => {
  const {user, userLogout} = useContext(userContext)
  const {clearCart} = useContext(CartContext)
  if(user.token){
    return(
      <button className="login-btn" onClick={()=>{
      userLogout();
      clearCart();
    }}>Logout</button>
    )
  }
  return <Link to="/login">Login</Link>
};

export default LoginLink;
