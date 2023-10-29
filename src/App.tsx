import { MarbleSolitaire, BoardType } from './marble-solitaire';
import { MarbleSolitaireComponent } from './MarbleSolitaireComponent';
import './App.css';

export default function App() {
  let game = new MarbleSolitaire('European' as BoardType);
  return (
    <div className="App">
      <MarbleSolitaireComponent game={ game }/>
    </div>
  );
}
