import React, { useState } from "react";
import { type Coordinate } from "./marble-solitaire";
import { BoardSpace } from "./BoardSpaceView";

interface MarbleSolitaireBoardProps {
  gameBoard: number[][];
  selectedMarble: Coordinate;
  play: (coor: Coordinate) => void;
}

export const MarbleSolitaireBoard = ({
  gameBoard,
  selectedMarble,
  play,
}: MarbleSolitaireBoardProps): JSX.Element => {
  const colors = useColorMap(gameBoard);

  const spaces: React.ReactElement[] = [];
  for (let i = 0; i < gameBoard.length; i++) {
    for (let j = 0; j < gameBoard[i].length; j++) {
      spaces.push(
        <BoardSpace
          id={gameBoard[i][j]}
          key={`space-${i}-${j}`}
          color={colors.get(gameBoard[i][j]) ?? "white"}
          isSelected={selectedMarble.row === i && selectedMarble.col === j}
          onClick={() => {
            play({ row: i, col: j });
          }}
        />,
      );
    }
  }
  return (
    <div className="game-container">
      <div className="board">{spaces}</div>
    </div>
  );
};

const useColorMap = (gameBoard: number[][]): Map<number, string> => {
  const [colorMap] = useState<Map<number, string>>(() => {
    const ids = gameBoard.flatMap((row) => [...row]).filter((id) => id > 0);

    const marbleColorsCopy = [...marbleColors];
    const newColorMap = new Map<number, string>();

    ids.forEach((id) => {
      const index = Math.floor(Math.random() * marbleColorsCopy.length);
      const color = marbleColorsCopy.splice(index, 1);
      newColorMap.set(id, color[0]);
    });

    return newColorMap;
  });
  return colorMap;
};

const marbleColors = [
  "red-500",
  "red-200",
  "red-700",
  "pink-500",
  "pink-200",
  "pink-700",
  "purple-500",
  "purple-200",
  "purple-700",
  "deepPurple-500",
  "deepPurple-200",
  "deepPurple-700",
  "indigo-500",
  "indigo-200",
  "indigo-700",
  "blue-500",
  "blue-200",
  "blue-700",
  "cyan-500",
  "cyan-200",
  "cyan-700",
  "teal-500",
  "teal-200",
  "teal-700",
  "green-500",
  "green-200",
  "green-700",
  "lime-500",
  "lime-200",
  "lime-700",
  "yellow-500",
  "yellow-200",
  "yellow-700",
  "amber-500",
  "amber-200",
  "amber-700",
  "orange-500",
  "orange-200",
  "orange-700",
  "brown-500",
  "brown-200",
  "brown-700",
];
