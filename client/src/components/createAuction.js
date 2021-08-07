import React, { useContext, useState } from 'react';
import { AuthContext } from './AuthContext';

const CreateAuction = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(1);

  const { value, setValue } = useContext(AuthContext);

  const submitAuction = () => {
    const newItem = { title, description, duration };

    console.log(value);

    fetch('/api/items', {
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
        <label className='label'>Title</label>
        <br />
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label className='label'>Description</label>
        <br />
        <input
          type='text'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <label className='label'>Duration in minutes</label>
        <br />
        <input
          type='number'
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <br />
        <button className='button' type='button' onClick={submitAuction}>
          Submit Auction
        </button>
      </form>
    ) : (
      <p> You must be logged in to create an auction</p>
    )
  );
};

export default CreateAuction;
