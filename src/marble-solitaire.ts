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

  play(row: number, col: number): boolean {
    if (!this.isValidSpace(row, col)) return false;

    if (this.selctedMarble !== EMPTY_MARBLE) {
      const move = this.moves.find(
        (move) => move.to.row === row && move.to.col === col,
      );
      if (move != null) {
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
      return false;
    }

    if (this.board[row][col] === EMPTY_SPACE) return false;

    this.moves = this.availableMoves(row, col);
    if (this.moves.length === 0) {
      // the marble must have available moves
      this.moves = [];
      return false;
    }

    if (this.selctedMarble === EMPTY_MARBLE) {
      // not in the middle of a move so set the selected marble
      this.selctedMarble = { row, col };
      return true;
    }

    if (this.selctedMarble.row === row && this.selctedMarble.col === col) {
      // the same marble was selected so deselect it
      this.selctedMarble = EMPTY_MARBLE;
      return true;
    }

    return false;
  }

  availableMoves(row: number, col: number): Move[] {
    const moves: Move[] = [];
    if (this.board[row][col] < 0) return moves;
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
}
