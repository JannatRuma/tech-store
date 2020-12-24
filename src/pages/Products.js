import React, { useContext } from 'react';
import Loading from '../components/Loading';
import ProductList from '../components/Products/ProductList';
import { ProductContext } from '../context/products';

const Products = () => {
  const {loading, products} = useContext(ProductContext);
  
  return (
    <div>
      {
      (loading ?(
        <>
          <Loading></Loading>
        </>
      ):(
        <>
        <ProductList title="Our products" products={products}></ProductList>
        </>
      ))
    }
    </div>
  );
};

export default Products;