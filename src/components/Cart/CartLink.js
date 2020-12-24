import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/cart';

const CartLink = () => {
  const {cartItem} = useContext(CartContext);
  return (
    <div className='cart-link-container'>
      <Link to='/cart'>
        cart
      </Link>
     <span className="cart-link-total">{cartItem}</span>
    </div>
  );
};

export default CartLink;