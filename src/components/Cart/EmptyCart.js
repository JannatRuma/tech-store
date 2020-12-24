import React from 'react';
import { Link } from 'react-router-dom';

const EmptyCart = () => {
  return (
    <section className="empty-cart section">
      <h2>empty cart..</h2>
      <Link to='/products' className="btn btn-primary">
        fill it
      </Link>
    </section>
  );
};

export default EmptyCart;