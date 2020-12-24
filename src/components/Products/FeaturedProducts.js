import React, { useContext } from 'react';
import { ProductContext } from '../../context/products';
import Loading from '../Loading';
import ProductList from './ProductList';

const FeaturedProducts = () => {
  const {loading, featured} = useContext(ProductContext);
  return (
     <div>
      {
      (loading ?(
        <>
          <Loading></Loading>
        </>
      ):(
        <>
        <ProductList title="Featured Products" products={featured}></ProductList>
        </>
      ))
    }
    </div>
  );
};

export default FeaturedProducts;