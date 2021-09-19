import React from 'react';
import { Link } from 'react-router-dom';

export default function Games() {
  return (
    <>
      <div className="cards">
        <div className="cards-item">
          <Link to="/games/tic-tac-toe">
            <h1>Tic Tac Toe</h1>
          </Link>
        </div>
        <div className="cards-item">
          <Link to="/games/typing">
            <h1>Typing</h1>
          </Link>
        </div>
      </div>
    </>
  );
}
