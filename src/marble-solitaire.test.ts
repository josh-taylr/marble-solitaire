import { MarbleSolitaire, type BoardType } from "./marble-solitaire";

describe("MarbleSolitaire", () => {
  describe("initBoard", () => {
    it("should return a 2D array of numbers representing a european board", () => {
      const expectedBoard = [
        [-1, -1, 1, 2, 3, -1, -1],
        [-1, 4, 5, 6, 7, 8, -1],
        [9, 10, 11, 12, 13, 14, 15],
        [16, 17, 18, 0, 19, 20, 21],
        [22, 23, 24, 25, 26, 27, 28],
        [-1, 29, 30, 31, 32, 33, -1],
        [-1, -1, 34, 35, 36, -1, -1],
      ];
      const game = new MarbleSolitaire("European" as BoardType);
      game.initBoard();
      expect(game.board).toEqual(expectedBoard);
    });
    it("should return a 2D array of numbers representing an english board", () => {
      const expectedBoard = [
        [-1, -1, 1, 2, 3, -1, -1],
        [-1, -1, 4, 5, 6, -1, -1],
        [7, 8, 9, 10, 11, 12, 13],
        [14, 15, 16, 0, 17, 18, 19],
        [20, 21, 22, 23, 24, 25, 26],
        [-1, -1, 27, 28, 29, -1, -1],
        [-1, -1, 30, 31, 32, -1, -1],
      ];
      const game = new MarbleSolitaire("English" as BoardType);
      game.initBoard();
      expect(game.board).toEqual(expectedBoard);
    });
  });
  describe("availableMoves", () => {
    it("should return an available moves to the left of the given space", () => {
      const game = new MarbleSolitaire("European" as BoardType);
      game.board = [[0, 1, 2]];
      const moves = game.availableMoves(0, 2);
      expect(moves).toEqual([{ row: 0, col: 0 }]);
    });
    it("should return an available moves to the right of the given space", () => {
      const game = new MarbleSolitaire("European" as BoardType);
      game.board = [[1, 2, 0]];
      const moves = game.availableMoves(0, 0);
      expect(moves).toEqual([{ row: 0, col: 2 }]);
    });
    it("should return an available moves above the given space", () => {
      const game = new MarbleSolitaire("European" as BoardType);
      game.board = [[0], [1], [2]];
      const moves = game.availableMoves(2, 0);
      expect(moves).toEqual([{ row: 0, col: 0 }]);
    });
    it("should return an available moves below the given space", () => {
      const game = new MarbleSolitaire("European" as BoardType);
      game.board = [[2], [1], [0]];
      const moves = game.availableMoves(0, 0);
      expect(moves).toEqual([{ row: 2, col: 0 }]);
    });
  });
});
