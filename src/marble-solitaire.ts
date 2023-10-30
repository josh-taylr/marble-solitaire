export type BoardType = "English" | "European";

const EMPTY_MARBLE = { row: -1, col: -1 };
const EMPTY_SPACE = 0;

export interface Coordinate {
  row: number;
  col: number;
}

export interface Move {
  from: Coordinate;
  target: Coordinate;
  to: Coordinate;
}

export class MarbleSolitaire {
  type: BoardType;
  board: number[][] = [];
  size: number = 7;
  selctedMarble: Coordinate = EMPTY_MARBLE;
  moves: Move[] = [];

  static europeanBoardTemplate = `
    - - a b c - -
    - y d e f z -
    g h i j k l m
    n o p x P O N
    M L K J I H G
    - Z F E D Y -
    - - C B A - -
  `;

  static englishBoardTemplate = `
    - - a b c - -
    - - d e f - -
    g h i j k l m
    n o p x P O N
    M L K J I H G
    - - F E D - -
    - - C B A - -
  `;

  constructor(type: BoardType) {
    this.type = type;
  }

  // returns a 2D array of numbers representing the board for the given type. Dash (-)
  // represents no space (-1), letters represent a space with a marble (>0), though an 'x'
  // represents an empty space (0).
  initBoard(): void {
    const template =
      this.type === "English"
        ? MarbleSolitaire.englishBoardTemplate
        : MarbleSolitaire.europeanBoardTemplate;
    const board = template
      .trim()
      .split("\n")
      .map((row) => row.trim().split(" "));
    let id = 1;
    this.board = board.map((row) =>
      row.map((space) => {
        if (space === "-") {
          return -1;
        } else if (space === "x") {
          return 0;
        } else {
          return id++;
        }
      }),
    );
  }

  isGameOver(): boolean {
    // if there are no available moves, then the game is over
    // if there is only one marble left on the board, then the game is over
    let movesAvailable = 0;
    let marbles = 0;
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[row].length; col++) {
        movesAvailable += this.availableMoves(row, col).length;
        marbles += this.board[row][col] > 0 ? 1 : 0;
      }
    }
    return marbles <= 1 || movesAvailable === 0;
  }

  play(row: number, col: number): boolean {
    if (this.isGameOver()) return false;

    if (!this.isValidSpace(row, col)) return false;

    if (!this.marbleSelected()) {
      if (this.board[row][col] === EMPTY_SPACE) return false;

      const availableMoves = this.availableMoves(row, col);
      if (availableMoves.length === 0) return false;

      // set the selected marble
      this.selctedMarble = { row, col };
      this.moves = availableMoves;

      return true;
    } else {
      if (this.selctedMarble.row === row && this.selctedMarble.col === col) {
        // the same marble was selected so deselect it
        this.selctedMarble = EMPTY_MARBLE;
        this.moves = [];
        return true;
      }

      const move = this.moves.find(
        (move) => move.to.row === row && move.to.col === col,
      );

      if (move == null) return false;

      // the selected space is a valid move so make the move
      const playedMarble = this.board[move.from.row][move.from.col];
      this.board[move.from.row][move.from.col] = EMPTY_SPACE;
      this.board[move.target.row][move.target.col] = EMPTY_SPACE;
      this.board[move.to.row][move.to.col] = playedMarble;

      // this turn is complete
      this.selctedMarble = EMPTY_MARBLE;
      this.moves = [];
      return true;
    }
  }

  availableMoves(row: number, col: number): Move[] {
    const moves: Move[] = [];

    // if there's no marble at the given space, then there are no available moves
    if (this.board[row][col] <= 0) return moves;

    // if there is a marble to the left of the current space, and there is an empty space to the left of that, then push the space to the left of current
    if (
      col > 1 &&
      this.board[row][col - 1] > 0 &&
      this.board[row][col - 2] === 0
    ) {
      moves.push({
        from: { row, col },
        target: { row, col: col - 1 },
        to: { row, col: col - 2 },
      });
    }
    // if there is a marble to the right of the current space, and there is an empty space to the right of that, then push the space to the right of current
    if (
      col < this.board[row].length - 2 &&
      this.board[row][col + 1] > 0 &&
      this.board[row][col + 2] === 0
    ) {
      moves.push({
        from: { row, col },
        target: { row, col: col + 1 },
        to: { row, col: col + 2 },
      });
    }
    // if there is a marble above the current space, and there is an empty space above that, then push the space above current
    if (
      row > 1 &&
      this.board[row - 1][col] > 0 &&
      this.board[row - 2][col] === 0
    ) {
      moves.push({
        from: { row, col },
        target: { row: row - 1, col },
        to: { row: row - 2, col },
      });
    }
    // if there is a marble below the current space, and there is an empty space below that, then push the space below current
    if (
      row < this.board.length - 2 &&
      this.board[row + 1][col] > 0 &&
      this.board[row + 2][col] === 0
    ) {
      moves.push({
        from: { row, col },
        target: { row: row + 1, col },
        to: { row: row + 2, col },
      });
    }
    return moves;
  }

  isValidSpace(row: number, col: number): boolean {
    return (
      row >= 0 &&
      row < this.board.length &&
      col >= 0 &&
      col < this.board[row].length &&
      this.board[row][col] !== -1
    );
  }

  marbleSelected(): boolean {
    return this.selctedMarble !== EMPTY_MARBLE;
  }
}
