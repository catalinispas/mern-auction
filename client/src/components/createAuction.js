import React, { useState } from 'react';

function CreateAuction() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(1);

  return (
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
    </form>
  );
}

export default CreateAuction;
