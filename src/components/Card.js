import React from "react";


function Card({ emoji, isFlipped, onClick }) {
  return (
    <div
      className={`card ${isFlipped ? "" : "flipped"}`}
      onClick={() => onClick()}
    >
      <div className="card-front"></div>
      <div className="card-back">{emoji}</div>
    </div>
  );
}

export default Card;
