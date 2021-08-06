import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(sessionStorage.getItem('token'));

  const { value, setValue } = useContext(AuthContext);

  setValue(token);

  const newAuth = {
    email: email,
    password: password,
  };

  function loginAction() {
    console.log({ newAuth });

    fetch('http://localhost:5000/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAuth),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        sessionStorage.setItem('token', data.token);
        setToken(data.token);
        console.log(`Local token is ${data.token}`);
        setValue(data.token);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    // check to see if the user is already logged in and return the token if he is
    token && token != '' && token != undefined ? (
      <div>
        <p>`You are logged in with token: {token}`</p>
        <button
          type='button'
          onClick={() => {
            sessionStorage.removeItem('token');
            setToken('');
          }}
        >
          Log Out
        </button>
      </div>
    ) : (
      <div className='wrapper'>
        <h4>Login</h4>
        <form>
          <label>email</label>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label>Password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
        <button type='button' onClick={loginAction}>
          Login
        </button>
      </div>
    )
  );
};

export default Login;
