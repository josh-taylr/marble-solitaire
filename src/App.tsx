import React from "react";
import { MarbleSolitaire, type BoardType } from "./marble-solitaire";
import { MarbleSolitaireComponent } from "./MarbleSolitaireComponent";
import "./App.css";

export default function App(): JSX.Element {
  const game = new MarbleSolitaire("European" as BoardType);
  return (
    <div className="App">
      <MarbleSolitaireComponent game={game} />
    </div>
  );
}
