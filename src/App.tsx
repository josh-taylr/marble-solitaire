import React from 'react';
import { Board } from './board';
import './App.css';

const GRID_SIZE = 40;

interface IntersectionProps {
  key: string;
  board: Board;
  color: number;
  row: number;
  col: number;
  onPlay: () => void;
}

class BoardIntersection extends React.Component<IntersectionProps> {

  handleClick() {
    if (this.props.board.play(this.props.row, this.props.col)) {
      this.props.onPlay();
    }
  }

  render() {
    const style: React.CSSProperties = {
      top: this.props.row * GRID_SIZE,
      left: this.props.col * GRID_SIZE,
    };

    let classes = "intersection";
    if (this.props.color !== Board.EMPTY) {
      classes += this.props.color === Board.BLACK ? " black" : " white";
    }

    return (
      <div onClick={this.handleClick.bind(this)} className={classes} style={style}></div>
    );
  }
}

interface BoardViewProps {
  board: Board;
  onPlay: () => void;
}

class BoardView extends React.Component<BoardViewProps> {
  render() {
    const intersections: React.ReactElement[] = [];
    for (let i = 0; i < this.props.board.size; i++) {
      for (let j = 0; j < this.props.board.size; j++) {
        intersections.push(
          <BoardIntersection
            key={`intersection-${i}-${j}`}
            board={this.props.board}
            color={this.props.board.board[i][j]}
            row={i}
            col={j}
            onPlay={this.props.onPlay}
          />
        );
      }
    }

    const style: React.CSSProperties = {
      width: this.props.board.size * GRID_SIZE,
      height: this.props.board.size * GRID_SIZE,
    };

    return <div style={style} id="board">{intersections}</div>;
  }
}

interface AlertViewProps {
  board: Board;
}

class AlertView extends React.Component<AlertViewProps> {
  render() {
    let text = "";
    if (this.props.board.game_over) {
      text = "GAME OVER";
    } else if (this.props.board.in_atari) {
      text = "ATARI!";
    } else if (this.props.board.attempted_suicide) {
      text = "SUICIDE!";
    } else {
      text = "Hello, Go!";
    }

    return <div id="alerts">{text}</div>;
  }
}

interface PassViewProps {
  board: Board;
  onPass: () => void;
}

class PassView extends React.Component<PassViewProps> {
  handleClick() {
    this.props.board.pass();
    this.props.onPass();
  }

  render() {
    return (
      <input
        id="pass-btn"
        type="button"
        value="Pass"
        onClick={this.handleClick.bind(this)}
      />
    );
  }
}

interface ContainerViewProps {
  board: Board;
}

interface ContainerViewState {
  board: Board;
}

class ContainerView extends React.Component<ContainerViewProps, ContainerViewState> {
  constructor(props: ContainerViewProps) {
    super(props);
    this.state = { board: props.board };
  }

  onBoardUpdate() {
    this.setState({ board: this.state.board });
  }

  render() {
    return (
      <div>
        <AlertView board={this.state.board} />
        <PassView board={this.state.board} onPass={this.onBoardUpdate.bind(this)}/>
        <BoardView board={this.state.board} onPlay={this.onBoardUpdate.bind(this)} />
      </div>
    );
  }
}

function App() {
  const board = new Board(19);
  return (
    <div className="App">
      <ContainerView board={board}/>
    </div>
  );
}

export default App;
