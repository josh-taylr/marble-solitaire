export type BoardType = 'English' | 'European';

const EMPTY_MARBLE = { row: -1, col: -1 };

export interface Coordinate {
  row: number;
  col: number;
}

export class MarbleSolitaire {
  type: BoardType;
  board: number[][] = [];
  size: number = 7;
  selctedMarble: Coordinate = { row: -1, col: -1 };
  moves: Coordinate[] = [];

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
  initBoard() {
    let id = 1;
    const template = this.type === 'English' ? MarbleSolitaire.englishBoardTemplate : MarbleSolitaire.europeanBoardTemplate;
    const board = template.trim().split('\n').map(row => row.trim().split(' '));
    this.board = board.map(row => row.map(space => {
      if (space === '-') {
        return -1;
      } else if (space === 'x') {
        return 0;
      } else {
        return id++;
      }
    }));
  }

  play(row: number, col: number): boolean {

    // the space must have a marble to be played
    if (this.board[row][col] === 0) return false;
    
    // the marble must have available moves
    this.moves = this.availableMoves(row, col);
    if (this.moves.length === 0) return false;

    // not in the middle of a move so set the selected marble
    this.selctedMarble = { row, col };

    return true;
  }

  availableMoves(row: number, col: number): Coordinate[] {
    const moves: Coordinate[] = [];
    if (this.board[row][col] < 0) return moves;
    // if there is a marble to the left of the current space, and there is an empty space to the left of that, then push the space to the left of current
    if (col > 1 && this.board[row][col - 1] > 0 && this.board[row][col - 2] === 0) {
      moves.push({ row: row, col: col - 2});
    }
    // if there is a marble to the right of the current space, and there is an empty space to the right of that, then push the space to the right of current
    if (col < this.board[row].length - 2 && this.board[row][col + 1] > 0 && this.board[row][col + 2] === 0) {
      moves.push({ row: row, col: col + 2 });
    }
    // if there is a marble above the current space, and there is an empty space above that, then push the space above current
    if (row > 1 && this.board[row - 1][col] > 0 && this.board[row - 2][col] === 0) {
      moves.push({ row: row - 2, col: col });
    }
    // if there is a marble below the current space, and there is an empty space below that, then push the space below current
    if (row < this.board.length - 2 && this.board[row + 1][col] > 0 && this.board[row + 2][col] === 0) {
      moves.push({ row: row + 2, col: col });
    }
    return moves;
  }
}