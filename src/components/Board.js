import React, { useState, useEffect } from "react";
import Card from './Card';
import emojis from '../utils/emojis';

function Board({ size }) {
  const [cards, setCards] = useState([]);// inicia como um array vazio e é atualizado quando o componente é montado
  const [selectedCards, setSelectedCards] = useState([]);// armazena emojis dos cartões que foram selecionados. Ele é usado para verificar se dois cartões são iguais
  const [firstCardIndex, setFirstCardIndex] = useState(null);//   é um número que representa o índice do primeiro cartão selecionado. Inicia null, significando que nenhum cartão foi selecionado ainda.

  useEffect(() => {
    //Cria um novo conjunto de card cada vez que a propriedade "size é alterada"
    const emojisCopy = [...emojis];//  clonando o array original, criando uma cópia independente que pode ser modificada sem afetar o array original.
    const partialEmojis = emojisCopy.splice(0, size / 2);// selecionando metade dos emojis presentes no array emojisCopy começando pelo indice 0 e terminando em size/2
    const duplicatedEmojis = [...partialEmojis, ...partialEmojis];// garantido que cada emoji tenha uma cópia no tabuleiro de jogo,
    const shuffledEmojis = shuffleArray(duplicatedEmojis);//shuffleArray é uma função que recebe um array e retorna uma nova versão desse array com os elementos embaralhados aleatoriamente

    const initialCards = shuffledEmojis.map((emoji) => ({
      //map é utilizada para percorrer o array shuffledEmojis e criar um novo array initialCards,onde cada item é um card do jogo.
      // Cada item tem duas propriedades: emoji, que guarda o emoji correspondente, e isFlipped, que indica se o cartão está virado
      emoji,
      isFlipped: false,
    }));

    setCards(initialCards);// o estado cards é atualizado com o valor do array initialCards
  }, [size]);// parâmetro size está sendo utilizado como uma dependência do useEffect, para que, toda vez que size for modificado, a função dentro do useEffect será executada novamente.

  const handleCardClick = (index) => {
    const newCards = [...cards];//cria uma cópia do estado atual dos cartões 
    newCards[index].isFlipped = true;//altera a propriedade isFlipped do cartão clicado para true.

    if (firstCardIndex === null) {//verifica se  firstCardIndex é nula. Se for, significa que esta é a primeira carta que foi clicada
      setFirstCardIndex(index);////Atualiza o estado de firstCardIndex com o índice da carta clicada
      setSelectedCards([newCards[index].emoji]);//Cria um array com o emoji da carta selecionada e atualiza o estado de selectedCards.
    } else if (newCards[firstCardIndex].emoji === newCards[index].emoji) {//verifica se a carta clicada corresponder à carta anteriormente selecionada.
      setSelectedCards([...selectedCards, newCards[index].emoji]);// atualiza com os elementos do array anterior mais o emoji da carta que acabou de ser virada
      setFirstCardIndex(null);//após virar duas cartas, firstCardIndex deve ser redefinida como null para que o jogo possa registrar uma nova jogada
    } else if (firstCardIndex !== index) { //caso a carta clicada não corresponder à carta anteriormente selecionada
      setSelectedCards([...selectedCards, newCards[index].emoji]);// atualiza com os elementos do array anterior mais o emoji da carta que acabou de ser virada
      setTimeout(() => {//caso as cartas viradas não sejam iguais é aguardado 1 segundo antes da ação de virar automaticamente os cards
        newCards[firstCardIndex].isFlipped = false;// atualiza o estado para desvirar a primeira carta
        newCards[index].isFlipped = false;//atualiza o estado para desvirar a segunda carta
        setFirstCardIndex(null);//atualiza para seu estado inicial
        setSelectedCards([]);///atualiza para seu estado inicial
        setCards(newCards);//atualizar o estado de cards quando as cartas viradas não correspondem e são viradas de volta após um segundo.
      }, 1000);
    }

    setCards(newCards);//atualizar o estado de cards quando uma carta é virada corretamente e os emojis correspondem
  };

  const shuffleArray = (array) => {//processo de embaralhamento dos cards no tabuleiro do jogo
    const shuffledArray = [...array];//criando uma copia do array
    shuffledArray.sort(() => Math.random() - 0.5);//método sort para reordenar os cards
    //o retorno de Math.random() é um número aleatório entre 0 e 1, e ao subtrair 0.5, o resultado pode ser positivo ou negativo. 
    //A função sort() espera um valor positivo, negativo ou zero para comparar dois elementos e decidir como será ordenado.
    //Portanto, ao usar Math.random() - 0.5 como a função de comparação, é fornecido um valor aleatório para comparar os elementos

    return shuffledArray;
  };

  return (
    <div className="board">
      {cards.map((card, index) => (
        <Card
          key={index}
          emoji={card.emoji}
          isFlipped={card.isFlipped}
          isSelected={selectedCards.includes(card.emoji)}
          onClick={() => handleCardClick(index)}
        />
      ))}
    </div>
  );
};

export default Board;

/*
O componente Board representa um tabuleiro de um jogo de memória. 
Ele recebe uma propriedade size que determina o número de cartões no tabuleiro
*/