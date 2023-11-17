import React from "react";
import { MarbleSolitaire, type BoardType } from "./marble-solitaire";
import { MarbleSolitaireComponent } from "./MarbleSolitaireComponent";
import "./App.css";

export default function App(): JSX.Element {
  const game = new MarbleSolitaire("English" as BoardType);
  return (
    <div className="App">
      <h1>Marble Solitaire</h1>
      <MarbleSolitaireComponent game={game} />
    </div>
  );
}
