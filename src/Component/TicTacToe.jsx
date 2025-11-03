import React, { useState, useRef } from 'react';
import './TicTacToe.css'; // Assuming CSS is in a separate file
import Circle_icon from '../assets/Circle image.png';
import cross_icon from '../assets/cross image.jpeg';

let initialData = ["", "", "", "", "", "", "", "", ""];

const TicTacToe = () => {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [data, setData] = useState(initialData);

  const titleRef = useRef(null);
  const box0 = useRef(null);
const box1 = useRef(null);
const box2 = useRef(null);
const box3 = useRef(null);
const box4 = useRef(null);
const box5 = useRef(null);
const box6 = useRef(null);
const box7 = useRef(null);
const box8 = useRef(null);

const boxRefs = [box0, box1, box2, box3, box4, box5, box6, box7, box8];


  const toggle = (index) => {
    if (lock || data[index] !== "") return;

    const newData = [...data];
    const currentIcon = count % 2 === 0 ? cross_icon : Circle_icon;
    const currentPlayer = count % 2 === 0 ? "x" : "o";

    newData[index] = currentPlayer;
    setData(newData);

    if (boxRefs[index].current) {
      boxRefs[index].current.innerHTML = `<img src="${currentIcon}" alt="icon" />`;
    }

    setCount(count + 1);
    checkWin(newData);
  };

  const checkWin = (data) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (data[a] && data[a] === data[b] && data[b] === data[c]) {
        won(data[a]);
        return;
      }
    }
  };

  const won = (winner) => {
    setLock(true);
    if (titleRef.current) {
      titleRef.current.innerHTML = `Congratulations: <img src="${winner === "x" ? cross_icon : Circle_icon}" alt="winner" />`;
    }
  };

  const reset = () => {
    setLock(false);
    setCount(0);
    setData([...initialData]);

    if (titleRef.current) {
      titleRef.current.innerHTML = 'Tic Tac Toe Game In <span>React</span>';
    }

    boxRefs.forEach(ref => {
      if (ref.current) {
        ref.current.innerHTML = "";
      }
    });
  };

  return (
    <div className='container'>
      <h1 className="title" ref={titleRef}>Tic Tac Toe Game In <span>React</span></h1>
      <div className="board">
        {[0, 1, 2].map((row) => (
          <div className={`row${row + 1}`} key={row}>
            {[0, 1, 2].map((col) => {
              const idx = row * 3 + col;
              return (
                <div
                  key={idx}
                  className="boxes"
                  ref={boxRefs[idx]}
                  onClick={() => toggle(idx)}
                ></div>
              );
            })}
          </div>
        ))}
      </div>
      <button className="reset" onClick={reset}>Restart Again</button>
    </div>
  );
};

export default TicTacToe;
