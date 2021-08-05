import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ItemList = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/api/items')
      .then((res) => res.json())
      .then(
        (result) => {
          setItems(result);
          setIsLoaded(true);
        },

        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul className='itemList'>
        <li className='itemList-item'>
          <p className='itemList-header'>Auction Item</p>
          <p className='itemList-header'>Current Bid</p>
        </li>
        {items.map((item) => (
          <Link to={`/bids/${item._id}`}>
            <li className='itemList-item' key={item._id}>
              <h4>{item.title}</h4>
              <p>{item.maxBid > 0 ? `${item.maxBid} $` : 'No bids'}</p>
            </li>
          </Link>
        ))}
      </ul>
    );
  }
};

export default ItemList;