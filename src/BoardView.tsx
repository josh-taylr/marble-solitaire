import React from "react";
import { type MarbleSolitaire } from "./marble-solitaire";
import { BoardSpace } from "./BoardSpaceView";

const GRID_SIZE = 48;

interface BoardViewProps {
  game: MarbleSolitaire;
  colors: Map<number, string>;
  onPlay: () => void;
}

export class BoardView extends React.Component<BoardViewProps> {
  render(): JSX.Element {
    const spaces: React.ReactElement[] = [];
    for (let i = 0; i < this.props.game.size; i++) {
      for (let j = 0; j < this.props.game.size; j++) {
        spaces.push(
          <BoardSpace
            id={this.props.game.board[i][j]}
            key={`space-${i}-${j}`}
            game={this.props.game}
            color={
              this.props.colors.get(this.props.game.board[i][j]) ?? "white"
            }
            coor={{ row: i, col: j }}
            onPlay={this.props.onPlay}
            grid_size={GRID_SIZE}
          />,
        );
      }
    }

    const style: React.CSSProperties = {
      width: this.props.game.size * GRID_SIZE,
      height: this.props.game.size * GRID_SIZE,
    };

    return (
      <div style={style} id="board">
        {spaces}
      </div>
    );
  }
}
