import React from 'react';
import Card from './Card';

const Board = ({ cards }) => {
  return (
    <div className="board">
      {cards.map((card) => (
        <Card key={card.id} id={card.id} cardValue={card.value} />
      ))}
    </div>
  );
};

export default Board;
