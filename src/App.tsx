import React, { useEffect, useState } from "react";
import {
  MarbleSolitaire,
  type BoardType,
  type Coordinate,
} from "./marble-solitaire";
import "./App.css";
import { MarbleSolitaireBoard } from "./MarbleSolitaireComponent";

export default function App(): JSX.Element {
  const newGameBoard = (type: BoardType): MarbleSolitaire => {
    const game = new MarbleSolitaire(boardType);
    game.initBoard();
    return game;
  };

  const [boardType, setBoardType] = useState<BoardType>("European");
  const { board, selectedMarble, changeBoard, play } = useGameProjection(
    newGameBoard(boardType),
  );

  useEffect(() => {
    changeBoard(newGameBoard(boardType));
  }, [boardType]);

  const handleBoardTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setBoardType(event.target.value as BoardType);
  };

  return (
    <div className="App">
      <h1>Marble Solitaire</h1>
      <div>
        <label htmlFor="boardType">Select Board Type:</label>
        <select
          id="boardType"
          value={boardType}
          onChange={handleBoardTypeChange}
        >
          <option value="English">English</option>
          <option value="European">European</option>
        </select>
      </div>
      <p>boardType: {boardType}</p>
      <MarbleSolitaireBoard
        gameBoard={board}
        selectedMarble={selectedMarble}
        play={({ row, col }) => {
          play(row, col);
        }}
      />
    </div>
  );
}

interface ProjectedGame {
  board: number[][];
  selectedMarble: Coordinate;
}

function useGameProjection(initialGame: MarbleSolitaire): ProjectedGame & {
  changeBoard: (board: MarbleSolitaire) => void;
  play: (row: number, col: number) => void;
} {
  const [game, setGame] = useState<MarbleSolitaire>(initialGame);
  const [projection, setProjection] = useState<ProjectedGame>(
    projectGame(game),
  );
  useEffect(() => {
    setProjection(projectGame(game));
  }, [game]);
  return {
    ...projection,
    changeBoard: (board: MarbleSolitaire) => {
      setGame(board);
    },
    play: (row: number, col: number) => {
      game.play(row, col);
      setProjection(projectGame(game));
    },
  };
}

function projectGame(game: MarbleSolitaire): ProjectedGame {
  return { board: game.board, selectedMarble: game.selctedMarble };
}
