import React, { useState, useEffect } from "react";
import Card from './Card';
import emojis from '../utils/emojis';

function Board({ size }) {
    const [cards, setCards] = useState([]);
    const [selectedCards, setSelectedCards] = useState([]);
    const [firstCardIndex, setFirstCardIndex] = useState(null);
  
    useEffect(() => {
      const emojisCopy = [...emojis];
      const selectedEmojis = emojisCopy.splice(0, size / 2);
      const duplicatedEmojis = [...selectedEmojis, ...selectedEmojis];
      const shuffledEmojis = shuffleArray(duplicatedEmojis);
  
      const initialCards = shuffledEmojis.map((emoji) => ({
        emoji,
        isFlipped: false,
      }));
  
      setCards(initialCards);
    }, [size]);
  
    const handleCardClick = (index) => {
      const newCards = [...cards];
      newCards[index].isFlipped = true;
  
      if (firstCardIndex === null) {
        // First card clicked
        setFirstCardIndex(index);
        setSelectedCards([newCards[index].emoji]);
      } else {
        // Second card clicked
        if (newCards[firstCardIndex].emoji === newCards[index].emoji) {
          // Cards match
          setSelectedCards([...selectedCards, newCards[index].emoji]);
          setFirstCardIndex(null);
        } else {
          // Cards do not match
          setSelectedCards([...selectedCards, newCards[index].emoji]);
          setTimeout(() => {
            newCards[firstCardIndex].isFlipped = false;
            newCards[index].isFlipped = false;
            setFirstCardIndex(null);
            setSelectedCards([]);
            setCards(newCards);
          }, 1000);
        }
      }
  
      setCards(newCards);
    };
  
    const shuffleArray = (array) => {
      const shuffledArray = [...array];
  
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [        shuffledArray[j],
          shuffledArray[i],
        ];
      }
  
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