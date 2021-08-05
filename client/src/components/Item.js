import React, { useState, useEffect } from 'react';

const Item = ({ match }) => {
  const { itemId } = match.params;

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/items/${itemId}`)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log({ result });
          setItem(result);
          setIsLoaded(true);
        },

        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      );
  }, [itemId]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    if (!item) return <p>There are no auctions available at the moment</p>;
    const { bids } = item;
    return (
      <div>
        <div className='title-wrapper'>
          <h4>{item.title}</h4>
          <p>{item.description}</p>
        </div>
        <ul className='itemList'>
          <li className='itemList-item'>
            <p className='itemList-header'>Bid author</p>
            <p className='itemList-header'>Bid amount</p>
          </li>
          {bids.map((bid) => (
            <li className='itemList-item' key={bid._id}>
              <p>{bid.name}</p>
              <p>{bid.amount}$</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

export default Item;
