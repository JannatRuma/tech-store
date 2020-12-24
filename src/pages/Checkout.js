import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import EmptyCart from '../components/Cart/EmptyCart';
import { CartContext } from '../context/cart';
import { userContext } from '../context/user';
import {StripeProvider,Elements,CardElement,injectStripe} from 'react-stripe-elements';
import submitOrder from '../strapi/submitOrder';


const Checkout = (props) => {
  const {cart, total, clearCart} = useContext(CartContext)
  const {user, showAlert, hideAlert, alert} = useContext(userContext)
  const history = useHistory()

  const[name, setName] = useState('')
  const[error, setError] = useState('')
  const isEmpty = !name || alert.show;
  const handleSubmit = async(e) =>{
    showAlert({msg: 'submitting order.. please wait.'})
    e.preventDefault()
    const response = await props.stripe
        .createToken()
        .catch(error=>console.log(error))

    const {token} = response;

    if(token){
      setError('')
      const {id} = token;
      let order = await submitOrder({name:name, total:total, items:cart, stripeTokenId:id,userToken:user.token})

      if(order){
        showAlert({msg:'Your Order is Complete'});
        clearCart()
        history.push('/');
        return;
      }else{
        showAlert({msg: 'An error occurred! Please try Again', type: 'danger'})
      }
    }
    else{
      hideAlert()
      setError(response.error.message)
    }
  } 

  if(cart.length < 1){
    return <EmptyCart></EmptyCart>
  }
  return (
    <section className="section form">
      <h2 className="section-title">Checkout</h2>
      <form className="checkout-form">
        <h3>Order Detail: <span>${total}</span></h3>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={name} onChange={(e)=>{
            setName(e.target.value)
          }}/>
        </div>
        <div className="stripe-input">
          <label htmlFor="card-element">Credit or debit Card</label>
          <p className="stripe-info">
            Test using this creadit card <span>4242 4242 4242 4242</span>
            <br/>
            enter any 5 digits from the zip code 
            <br/>
            enter any 3 digits from the CVC  
          </p>
        </div>
        {/* stripe Element */}
        <CardElement className="card-element"></CardElement>
        {error && <p className="form-empty">{error}</p> }
        {
          isEmpty ? (
            <p className="form-empty">Please fill out name field</p>
          ):(
            <button type="submit" onClick={handleSubmit} className="btn btn-primary btn-block">Submit</button>
          )
        }
      </form>
    </section>
  );
};

// export default Checkout;
const CardForm = injectStripe(Checkout)
const StripeWrapper = () => {
  return (
    <StripeProvider apiKey="pk_test_51HiaetDNrnlHeULeqAZNJCtXN87yK8DQZVeaG6s3sRbEtaTTtuyXHuyoAXcT4HBPAD21C4k34z9Q28kMDdrPOQMP00LVwq7Tp7">
     <Elements>
        <CardForm></CardForm>
     </Elements>
    </StripeProvider>
  );
};
export default StripeWrapper;