import React, { useContext, useState } from 'react';
import { AuthContext } from './AuthContext';

const CreateAuction = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(1);

  const { value, setValue } = useContext(AuthContext);
  const submitAuction = () => {
    const newItem = { title, description };

    console.log(value);

    fetch('http://localhost:5000/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': value,
      },
      body: JSON.stringify(newItem),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.JSON);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    // check to see if the user is already logged in and return the token if he is
    value && value != '' && value != undefined ? (
      <form>
        <label>Title</label>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label>Description</label>
        <input
          type='text'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <input
          name='duration'
          type='radio'
          value='1'
          defaultChecked
          onChange={() => setDuration(1)}
        />
        <label>1 minute</label>
        <br />
        <input
          name='duration'
          type='radio'
          value='5'
          onChange={() => setDuration(5)}
        />
        <label>5 minutes</label>
        <br />
        <input
          name='duration'
          type='radio'
          value='30'
          onChange={() => setDuration(30)}
        />
        <label>30 minutes</label>
        <button type='button' onClick={submitAuction}>
          Submit Auction
        </button>
      </form>
    ) : (
      <p> You must be logged in to create an auction</p>
    )
  );
};

export default CreateAuction;
