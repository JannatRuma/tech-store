import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg'
import { userContext } from '../context/user';
import CartLink from './Cart/CartLink';
import LoginLink from './LoginLink';


const Header = () => {
  const {user} = useContext(userContext)
  return (
    <header className="header">
      <img src={logo} alt="" className="logo"/>
      <nav>
        <ul>
          <div>
            <li>
              <Link to="/">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about">
                About
              </Link>
            </li>
            <li>
              <Link to="/products">
                Product
              </Link>
            </li>
            {
              user.token && (
                <li>
                  <Link to="/checkout">
                    Checkout
                  </Link>
                </li>
              )
            }
          </div>
          <div>
            <CartLink></CartLink>
            <LoginLink></LoginLink>
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Header;