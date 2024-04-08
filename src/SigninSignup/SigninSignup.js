import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form_Style.css'
  

const signUpRequestSend = async (data)=>{
  const POST_URL = "http://localhost:3100/api/users";

  try{
      const api = await fetch(POST_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',},
          body: JSON.stringify(data),
      })

      return api.status;
  }
  catch(e){
      return "Can't POST Data on "+ POST_URL;
  }
}

const loginRequestSend = async (username) =>{
  const GET_URL = "http://localhost:3100/api/users/"+ username;
  
  try{
      const api = await fetch(GET_URL)
      const response = api;

      const result = await response;
      return result;
  }
  catch(e){
      console.log(e);
      return undefined;
  }
}

const SigninSignup = (props)=>{

    const [isLogin, setIsLogin] = useState(true);
    const b1 = useRef();
    const b2 = useRef();

    const toLogin = ()=>{
        setIsLogin(true);
        b1.current.style.backgroundColor = "#ffe600";
        b2.current.style.backgroundColor = "white";    
    }

    const toSignup = ()=>{
        b1.current.style.backgroundColor = "white";
        b2.current.style.backgroundColor = "#ffe600";
        setIsLogin(false);
    }


    return (
        <div className="container">    
            <div className="form-container">
                <div className='btn-group'>
                <button onClick={toLogin} className='menu-btn init-btn' ref={b1}>Login</button> 
                <button onClick={toSignup} className='menu-btn' ref={b2}>Signup</button>
            </div>
                {isLogin ? (
                <LoginForm setLoginFlagValue={props.setLoginFlagValue} changeProfile={props.changeProfile}/>
                ) : (
                <SignupForm setLoginFlagValue={props.setLoginFlagValue}/>
                )}
            </div>    
        </div>
    )
}


function LoginForm(props) {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();

      props.setLoginFlagValue(true);
      loginRequestSend(e.target.email_input.value)

      
      const promise = await loginRequestSend(e.target.email_input.value);
      const data = await promise.json()
      console.log(data);
      if(data != undefined){
        props.changeProfile(data);
        navigate("/")
      }

    };
  
    return (
      <form onSubmit={handleSubmit} name="login">
        <label>
          Email:
          <input type="text" name="email_input"/>
        </label>
        <label>
          Password:
          <input type="password" name="password_input"/>
        </label>
        <button type="submit" name="login_input">Login</button>
      </form>
    );
  }
  
  function SignupForm(props) {
    const navigate = useNavigate();
    const handleSubmit = (e) => {
      e.preventDefault();

      const n = e.target.name_input.value;
      const em = e.target.email_input.value;
      const pass = e.target.password_input.value;

      if(n === '' || em === '' || pass === ''){
        return;
      }

      const data = {
        name: n,
        age: 0,
        gender: "_",
        country: "NULL",        
        username: em,
        password: pass,
        performance: []
      }

      props.setLoginFlagValue(true);
      console.log(signUpRequestSend(data));
      navigate("/login-signup")

    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name_input"/>
        </label>
        <label>
          Username:
          <input type="text" name="email_input"/>
        </label>
        <label>
          Password:
          <input type="password" name="password_input"/>
        </label>
        <button type="submit">Signup</button>
      </form>
    );
  }

export default SigninSignup;