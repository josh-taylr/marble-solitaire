import React from "react";
import { type Coordinate, type MarbleSolitaire } from "./marble-solitaire";

interface BoardSpaceProps {
  id: number;
  key: string;
  game: MarbleSolitaire;
  color: string;
  coor: Coordinate;
  onPlay: () => void;
}

export class BoardSpace extends React.Component<BoardSpaceProps> {
  handleClick(): void {
    if (this.props.game.play(this.props.coor.row, this.props.coor.col)) {
      console.log("play");
      this.props.onPlay();
    }
  }

  render(): JSX.Element {
    let classes;
    if (this.props.id === 0) {
      classes = "space";
    } else if (
      this.props.game.selctedMarble.row === this.props.coor.row &&
      this.props.game.selctedMarble.col === this.props.coor.col
    ) {
      // a selected marble
      classes = "marble selected";
    } else if (this.props.id > 0) {
      // a marble
      classes = `marble ${this.props.color}`;
    } else {
      // not part of the board
      classes = "empty";
    }

    return (
      <div
        onClick={this.handleClick.bind(this)}
        id={this.props.id.toString()}
        className={classes}
      />
    );
  }
}
