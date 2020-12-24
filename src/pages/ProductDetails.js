import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import { CartContext } from '../context/cart';
import { ProductContext } from '../context/products';

const ProductDetails = () => {
  const {id} = useParams();
  const history = useHistory();
  const {products} = useContext(ProductContext);
  const product = products.find(item=> item.id === parseInt(id));
  const {addToCart} = useContext(CartContext);
  if(products.length === 0){
    return <Loading></Loading>
  }else{
    const {image, title, price, description} = product;
      return (
      <section className="single-product">
        <img src={image} alt={title} className="single-product-image"/>
        <article>
          <h1>{title}</h1>
          <h2>${price}</h2>
          <p>{description}</p>
          <button className="btn btn-primary btn-block" onClick={()=>{
            addToCart(product)
           history.push('/cart')
          }}>add to cart</button>
        </article>
      </section>
    );
  }
  
};

export default ProductDetails;