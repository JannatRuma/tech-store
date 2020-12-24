import Axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { featuredProducts, flattenProducts } from '../utils/helpers';
import url from '../utils/URL'
export const ProductContext = createContext();

const ProductProvider = ({children}) => {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [featured, setFeatured] = useState([])

    useEffect(()=>{
        setLoading(true)
        Axios.get(`${url}/products`)
        .then(res=> {
            const featured = featuredProducts(flattenProducts(res.data))
            const product = flattenProducts(res.data)
            setProducts(product)
            setFeatured(featured)
            setLoading(false)
        })
    }, [])
   
    return (
        <ProductContext.Provider value={{loading, products, featured}}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductProvider;
