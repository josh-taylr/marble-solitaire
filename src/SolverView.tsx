import React from "react";
import { type MarbleSolitaire } from "./marble-solitaire";

interface SolverViewProps {
  game: MarbleSolitaire;
}

interface SolverViewState {
  game: MarbleSolitaire;
  moveList: string;
}

export class SolverView extends React.Component<
  SolverViewProps,
  SolverViewState
> {
  constructor(props: SolverViewProps) {
    super(props);
    this.state = { game: props.game, moveList: "Nothing" };
  }

  onClick(): void {
    const moveList = this.state.game.solve();
    const text = moveList;

    this.setState({ moveList: text.concat() });
  }

  render(): JSX.Element {
    return (
      <div>
        <button onClick={this.onClick.bind(this)}>Solve</button>
        <div>{this.state.moveList.split("\n").join(", ")}</div>
      </div>
    );
  }
}
