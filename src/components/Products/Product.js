import React from 'react';
import { Link } from 'react-router-dom';

const Product = (props) => {
  const {image, title, id, price} = props.item;
  return (
    <article className="product">
      <div className="img-container">
        <img src={image} alt={title}/>
        <Link to={`products/${id}`} className="btn btn-primary product-link">details</Link>
      </div>
      <div className="product-footer">
        <p className="product-title">{title}</p>
        <p className="product-price">${price}</p>
      </div>
    </article>
  );
};

export default Product;