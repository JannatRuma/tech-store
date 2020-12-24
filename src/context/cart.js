// cart context
import React, { createContext, useEffect, useState } from 'react';
export const CartContext = createContext();


function getCartFromLocalStorage (){
    return localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[]
}

const CartProvider = ({children}) => {
    const [cart, setCart] = useState(getCartFromLocalStorage);
    const [total, setTotal] = useState(0)
    const [cartItem, setCartItem] = useState(0)

    useEffect(()=>{
        localStorage.setItem('cart', JSON.stringify(cart));
        //cart items
        let newCartItem = cart.reduce((total, cartItem)=>{
            return total+=cartItem.amount;
        }, 0)
        setCartItem(newCartItem)
        // Cart totals
        let newTotal = cart.reduce((total, cartItem)=>{
            return total+=cartItem.amount*cartItem.price;
        }, 0)
        newTotal = parseFloat(newTotal.toFixed(2))
        setTotal(newTotal)
    }, [cart]) 

    //remove item
    const removeItem = id =>{
        let newCart = [...cart].filter(item=> item.id !== id);
        setCart(newCart)
    }
    //increase amount

    const increaseAmount = id =>{
        const newCart = [...cart].map(item=>{
            return item.id === id?{...item, amount:item.amount+1}:{...item}
        })
        setCart(newCart)
    }
    // decrease Amount

    const decreaseAmount = (id, amount) =>{
        if(amount === 1){
            removeItem(id)
            return;
        }
        else{
            const newCart = [...cart].map(item=>{
            return item.id === id?{...item, amount:item.amount-1}:{...item}
        })
        setCart(newCart)
        }
    }

    //Add to cart 
    const addToCart = product => {
        const {id, image, title, price} = product;
        const item = [...cart].find(item=>item.id === id);
        if(item){
            increaseAmount(id);
            return;
        }
        else{
            const newItem = {id, image, title, price, amount:1}
            const newCart = [...cart, newItem];
            setCart(newCart);
        }
    }

    // clear cart 

    const clearCart = () =>{
        setCart([])
    }
    return (
        <CartContext.Provider value={{cart, total, cartItem, removeItem, increaseAmount,decreaseAmount,addToCart,clearCart}}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
