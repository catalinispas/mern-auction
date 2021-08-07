import React, { useContext, useState } from 'react';
import { AuthContext } from './AuthContext';

const BidComponent = (props) => {
  const { value, setValue } = useContext(AuthContext);

  const [amount, setAmount] = useState(0);

  console.log(props.itemId);
  console.log(value);

  const placeBid = () => {
    fetch(`/api/items/${props.itemId}/bid`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': value,
      },
      body: JSON.stringify({ amount }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.JSON);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return value && value != '' && value != undefined ? (
    <div>
      <h2>Place a bid</h2>
      <label className='label'>Amount</label>
      <br />
      <input
        className='input'
        type='number'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button className='button' type='button' onClick={placeBid}>
        Submit bid!
      </button>
    </div>
  ) : (
    <div>
      <h2>Bid component</h2>
      <p>You need to be logged in to place a bid!</p>
    </div>
  );
};

export default BidComponent;
