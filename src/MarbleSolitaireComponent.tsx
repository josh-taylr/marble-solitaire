import React from "react";
import { type MarbleSolitaire } from "./marble-solitaire";
import { BoardView } from "./BoardView";

interface MarbleSolitaireProps {
  game: MarbleSolitaire;
}

interface MarbleSolitaireState {
  game: MarbleSolitaire;
}

export class MarbleSolitaireComponent extends React.Component<
  MarbleSolitaireProps,
  MarbleSolitaireState
> {
  colorMap: Map<number, string>;

  constructor(props: MarbleSolitaireProps) {
    super(props);
    this.state = { game: props.game };
    this.state.game.initBoard();

    const ids = this.state.game.board
      .flatMap((row) => [...row])
      .filter((id) => id > 0);

    // create a map with the ids as keys and the values as colors randomly selected from the marbleColors array
    const marbleColorsCopy = [...MarbleSolitaireComponent.marbleColors];
    this.colorMap = new Map<number, string>();

    ids.forEach((id) => {
      const index = Math.floor(Math.random() * marbleColorsCopy.length);
      const color = marbleColorsCopy.splice(index, 1);
      this.colorMap.set(id, color[0]);
    });
  }

  onBoardUpdate(): void {
    this.setState({ game: this.state.game });
  }

  render(): JSX.Element {
    return (
      <div>
        <BoardView
          game={this.state.game}
          colors={this.colorMap}
          onPlay={this.onBoardUpdate.bind(this)}
        />
      </div>
    );
  }

  static marbleColors = [
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
}
