import React, { ReactNode, useState } from 'react';
import { Button, List } from 'semantic-ui-react';
import GameLayout from '../GameLayout';

type SquareValue = 'X' | 'O' | null;

const calculateWinner = (squares: SquareValue[]): SquareValue => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

interface SquareProps {
  onClick(): void;
  value: SquareValue;
}

const getImage = (value: SquareValue) => {
  if (value === 'X') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        color="#2f363d"
        width="42"
        height="42"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    );
  }
  if (value === 'O') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        color="#6a737d"
        width="42"
        height="42"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    );
  }
  return null;
};

const Square: React.FC<SquareProps> = ({ value, onClick }: SquareProps) => {
  return (
    <button type="button" className="tic-tac-toe-square" onClick={onClick}>
      {getImage(value)}
    </button>
  );
};

interface BoardProps {
  onClick(i: number): void;
  squares: SquareValue[];
}

const Board: React.FC<BoardProps> = ({ squares, onClick }: BoardProps) => {
  const renderSquare = (i: number): ReactNode => {
    return <Square value={squares[i]} onClick={() => onClick(i)} />;
  };

  return (
    <div>
      <div className="tic-tac-toe-board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="tic-tac-toe-board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="tic-tac-toe-sboard-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

const Game: React.FC = () => {
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [stepNumber, setStepNumber] = useState<number>(0);
  const [history, setHistory] = useState<{ squares: SquareValue[] }[]>([
    {
      squares: Array(9).fill(null),
    },
  ]);

  const handleClick = (i: number): void => {
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(
      newHistory.concat([
        {
          squares,
        },
      ])
    );
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step: number): void => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = history.map((step, move) => {
    const desc = move ? `Go to move #${move}` : 'Go to game start';
    return (
      // eslint-disable-next-line react/no-array-index-key
      <List.Item key={move}>
        <Button size="tiny" basic circular onClick={() => jumpTo(move)}>
          {desc}
        </Button>
      </List.Item>
    );
  });

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div>
      <div className="tic-tac-toe-game">
        <div className="tic-tac-toe-game-board">
          <Board squares={current.squares} onClick={(i) => handleClick(i)} />
        </div>
        <div className="tic-tac-toe-game-info">
          <div className="tic-tac-toe-winner">{status}</div>
          <List>{moves}</List>
        </div>
      </div>
    </div>
  );
};

export default function TicTacToeGame() {
  return (
    <GameLayout title="Tic Tac Toe">
      <Game />
    </GameLayout>
  );
}
