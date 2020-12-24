import React, { useContext } from 'react';
import { CartContext } from '../../context/cart';
import {FaAngleUp, FaAngleDown} from 'react-icons/fa'

const CartItem = (props) => {
  const {id, image, title, price, amount} = props.item;
  const {removeItem, increaseAmount, decreaseAmount} = useContext(CartContext);
  return (
    <article className="cart-item">
      <img src={image} alt={title}/>
      <div>
        <h4>{title}</h4>
        <h5>${price}</h5>
        <button className="cart-btn remove-btn" onClick={()=>removeItem(id)}>remove</button>
      </div>
      <div>
        <button className="cart-btn amount-btn" onClick={()=>increaseAmount(id)}>
          <FaAngleUp></FaAngleUp>
        </button>
        <p className="item-amount">{amount}</p>
         <button className="cart-btn amount-btn" onClick={()=>decreaseAmount(id, amount)}>
          <FaAngleDown></FaAngleDown>
        </button>
      </div>
    </article>
  );
};

export default CartItem;