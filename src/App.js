import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

//Pages
import Home from './pages/Home'
import About from './pages/About'
import Cart from './pages/Cart'
import Error from './pages/Error'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
//Components
import Header from './components/Header';
import Alert from './components/Alert';
import PrivateRoute from './components/PrivateRoute';

//Components
function App() {
  return (
     <Router>
       <Header></Header>
       <Alert></Alert>
       <Switch>
         <Route exact path="/">
           <Home></Home>
         </Route>
         <Route path="/about">
            <About></About>
         </Route>
         <Route path="/cart">
           <Cart></Cart>
         </Route>
         <PrivateRoute path="/checkout">
           <Checkout></Checkout>
         </PrivateRoute>
         <Route path="/login">
           <Login></Login>
         </Route>
         <Route exact path="/products">
           <Products></Products>
         </Route>
         <Route exact path="/products/:id" children={
           <ProductDetails></ProductDetails>
         }>
         </Route>
         <Route path="*">
           <Error></Error>
         </Route>
       </Switch>
     </Router>
  );
}

export default App;
