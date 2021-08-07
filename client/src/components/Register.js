import React, { useContext, useState } from 'react';
import { AuthContext } from './AuthContext';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');

  const { value, setValue } = useContext(AuthContext);

  const newUser = {
    name: userName,
    email,
    password,
  };

  const registerUser = () => {
    alert('registered!');

    fetch('http://localhost:5000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.JSON);
        setValue(data.token);
        sessionStorage.setItem('token', data.token);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h1>Register</h1>
      <label className='label'>name</label>
      <br />
      <input
        className='input'
        type='text'
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <br />
      <label className='label'>email</label>
      <br />
      <input
        className='input'
        type='text'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <label className='label'>password</label>
      <br />
      <input
        className='input'
        type='text'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button classname='button' type='button' onClick={registerUser}>
        Submit Auction
      </button>
    </div>
  );
};

export default Register;
