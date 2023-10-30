import React from "react";
import { type Coordinate, type MarbleSolitaire } from "./marble-solitaire";

interface BoardSpaceProps {
  id: number;
  key: string;
  game: MarbleSolitaire;
  color: string;
  coor: Coordinate;
  grid_size: number;
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
    const style: React.CSSProperties = {
      top: this.props.coor.row * this.props.grid_size,
      left: this.props.coor.col * this.props.grid_size,
    };

    // let classes = "intersection";
    // if (this.props.color !== Board.EMPTY) {
    //   classes += this.props.color === Board.BLACK ? " black" : " white";

    let classes = "space";
    if (this.props.id < 0) {
      // not part of the board
      classes += " empty";
    } else if (
      this.props.game.selctedMarble.row === this.props.coor.row &&
      this.props.game.selctedMarble.col === this.props.coor.col
    ) {
      // a selected marble
      classes += " marble";
    } else if (this.props.id > 0) {
      // a marble
      classes += ` ${this.props.color}`;
    } else {
      // empty space
      classes +=
        (this.props.coor.row + this.props.coor.col) % 2 === 0
          ? " even"
          : " odd";
    }

    return (
      <div
        onClick={this.handleClick.bind(this)}
        id={this.props.id.toString()}
        className={classes}
        style={style}
      >
        <p>{this.props.id}</p>
      </div>
    );
  }
}
