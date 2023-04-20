import React, { useState } from 'react';
import Board from './components/Board';
import "./App.css";

function App() {
  const [size, setSize] = useState(12);

  const handleSizeChange = (event) => {
    setSize(parseInt(event.target.value));
  };

  return (
    <div className="app">
      <h1>Jogo da Memória</h1>
      <div className="options">
        <label htmlFor="size">Tamanho do tabuleiro:</label>
        <select id="size" value={size} onChange={handleSizeChange}>
          <option value="12">6 pares</option>
          <option value="16">8 pares</option>
          <option value="20">10 pares</option>
        </select>
      </div>
      <Board size={size} />
    </div>
  );
};
export default App;