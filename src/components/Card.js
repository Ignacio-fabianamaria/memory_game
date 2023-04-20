import React from 'react';

const Card = ({ id, cardValue }) => {
  return (
    <div className="card" data-id={id}>
      <div className="card-value">{cardValue}</div>
    </div>
  );
};

export default Card;
