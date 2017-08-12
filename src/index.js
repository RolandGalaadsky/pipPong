import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './game';

const tableStyle = {
    height: 500,
    width: 700,
};
const paleStyle = {
    height: 100,
    width: 20,
};
const ballParameters = {
    diameter: 20,
    xSpeed: 7,
    ySpeed: 7,
};
const paleSpeed = 6;
const gameParameters = {tableStyle, paleStyle, paleSpeed, ballParameters};

ReactDOM.render(
  <Game gameParameters={gameParameters} />,
  document.getElementById('root')
);

