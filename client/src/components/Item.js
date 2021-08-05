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
    const { bids } = item;
    return bids.map((bid) => <li>{bid.author}</li>);
  }
};

export default Item;
