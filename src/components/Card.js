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

/*---------------------------------------------------------------------------------------------------------------------
O componente Card representa um cartão com duas faces, em que a face frontal é oculta e a face traseira exibe um emoji.
A propriedade emoji é usada para definir qual emoji será exibido na face traseira.
A propriedade isFlipped é usada para controlar se o cartão está virado ou não.
A propriedade onClick é usada para definir o evento que acontecerá quando o usuário clica no cartão.
----------------------------------------------------------------------------------------------------------------------*/
