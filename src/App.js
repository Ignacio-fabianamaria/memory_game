import React, { useEffect, useState } from 'react';
import Board from './components/Board';
import "./App.css";

function App() {
  const [size, setSize] = useState(12);
  const [song] = useState(new Audio("/Whistle_Cartoon.mp3"));
  const [inLoop, setInLoop] = useState(true);

  const handleSizeChange = (event) => {
    setSize(parseInt(event.target.value));
  };

  const toggleMusica = () => {
    if (!inLoop) {
      song.loop = true;
      song.play();
      setInLoop(true);
    } else {
      song.pause();
      setInLoop(false);
    }
  };

  useEffect(() => {
    // adiciona o intervalo quando inLoop for true
    if (inLoop) {
      const intervalId = setInterval(() => {
        if (song.currentTime >= song.duration - 1.5) {
          song.currentTime = 0;
          song.play();
        }
      }, 100);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [inLoop]);

  return (
    <div className="app">
      <h1>Jogo da Memória</h1>
      <div className="options">
      <button className="buttons" onClick={() => window.location.reload()}>↻</button>
      <button className="buttons" onClick={toggleMusica}>{inLoop ? "||" : "♪"}</button>
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