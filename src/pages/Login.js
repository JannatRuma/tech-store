import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { userContext } from '../context/user';
import loginUser from '../strapi/loginUser';
import registerUser from '../strapi/registerUser';

const Login = () => {
  const history = useHistory()
  const {userLogin, alert, showAlert} = useContext(userContext);

  //state values

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('default')
  const [isMember, setIsMember] = useState(true)

  let isEmpty = !email || !password || !username || alert.show;
  const toggoleMember = () => {
    setIsMember(prevMember =>{
      let isMember = !prevMember;
      isMember ? setUsername('default'): setUsername('');
      return isMember;
    })
  }
  const handleSubmit = async e =>{
    showAlert({
      msg: 'Accesing user data. please wait..'
    })
    //alert
    e.preventDefault()
    let response;
    if(isMember){
      response = await loginUser({email, password})
    }else{
      response = await registerUser({email, password, username})

    }
    if(response){
      const {jwt: token, user:{username}} = response.data;
      const newUser = {token, username}
      userLogin(newUser)
      showAlert({
        msg: `You are logged in : ${username}.`
      })
      history.push("/products")
    }else{
      //show alert
      showAlert({
        msg: 'An error Occurred! Please Try Again.',
        type: 'danger'
      })
    }
  }
  return (
    <section className="form section">
      <h2 className="section-title">{isMember? 'Login': 'register'}</h2>
      <form className="login-form">
        {/* email */}
        <div className="form-control">
          <label htmlFor="email">email</label>
          <input type="email" id="email" value={email} onChange={e=> setEmail(e.target.value)}/>
        </div>
        {/* password */}
        <div className="form-control">
          <label htmlFor="password">password</label>
          <input type="password" id="password" value={password} onChange={e=> setPassword(e.target.value)}/>
        </div>
        {/* username */}
        {!isMember && (
          <div className="form-control">
          <label htmlFor="username">username</label>
          <input type="text" id="username" value={username} onChange={e=> setUsername(e.target.value)}/>
        </div>
        )}
        {/* error alert */}
        {isEmpty && (
          <p className="form-empty">
              Please Fill out All Form Fields
          </p>
        )}
        {/* submit */}
        {!isEmpty && (
          <button type="submit" className="btn btn-block btn-primary" onClick={handleSubmit}>submit</button>
        )}
        {/* register link */}
        <p className="register-link">
          {isMember ? 'need to register?':'already a member'}
          <button type="button" onClick={toggoleMember}>click here</button>
        </p>
        
      </form>
    </section>
  );
};

export default Login;