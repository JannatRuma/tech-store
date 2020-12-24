import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../components/Cart/CartItem';
import EmptyCart from '../components/Cart/EmptyCart';
import { CartContext } from '../context/cart';
import { userContext } from '../context/user';

const Cart = () => {
  const {cart, total} = useContext(CartContext);
  const {user} = useContext(userContext)
  if(cart.length === 0){
    return <EmptyCart></EmptyCart>
  }
  return (
   <section className="cart-items section">
     <h2>Your Cart</h2>
     {
       cart.map(item=><CartItem key={item.id} item={item}></CartItem>)
     }
     <h2>total: ${total}</h2>
     {
       (user.token ? (
         <Link to='/checkout' className="btn btn-primary btn-block">
           checkout
         </Link>
       ):(
         <Link to='/login' className="btn btn-primary btn-block">
           login
         </Link>
       ))
     }
   </section>
  );
};

export default Cart;