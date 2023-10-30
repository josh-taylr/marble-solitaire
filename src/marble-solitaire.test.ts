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
      expect(moves).toEqual([
        {
          from: { row: 0, col: 2 },
          target: { row: 0, col: 1 },
          to: { row: 0, col: 0 },
        },
      ]);
    });
    it("should return an available moves to the right of the given space", () => {
      const game = new MarbleSolitaire("European" as BoardType);
      game.board = [[1, 2, 0]];
      const moves = game.availableMoves(0, 0);
      expect(moves).toEqual([
        {
          from: { row: 0, col: 0 },
          target: { row: 0, col: 1 },
          to: { row: 0, col: 2 },
        },
      ]);
    });
    it("should return an available moves above the given space", () => {
      const game = new MarbleSolitaire("European" as BoardType);
      game.board = [[0], [1], [2]];
      const moves = game.availableMoves(2, 0);
      expect(moves).toEqual([
        {
          from: { row: 2, col: 0 },
          target: { row: 1, col: 0 },
          to: { row: 0, col: 0 },
        },
      ]);
    });
    it("should return an available moves below the given space", () => {
      const game = new MarbleSolitaire("European" as BoardType);
      game.board = [[2], [1], [0]];
      const moves = game.availableMoves(0, 0);
      expect(moves).toEqual([
        {
          from: { row: 0, col: 0 },
          target: { row: 1, col: 0 },
          to: { row: 2, col: 0 },
        },
      ]);
    });
  });
  describe("play", () => {
    it("should ignore spaces outside the board", () => {
      const game = new MarbleSolitaire("European" as BoardType);
      game.board = [
        [-1, 1, 2, -1],
        [3, 4, 5, 6],
        [7, 8, 9, 10],
        [-1, 11, 12, -1],
      ];
      expect(game.play(-1, 0)).toBe(false);
      expect(game.play(4, 0)).toBe(false);
      expect(game.play(0, -1)).toBe(false);
      expect(game.play(0, 4)).toBe(false);
    });
    it("should ignore invalid spaces", () => {
      const game = new MarbleSolitaire("European" as BoardType);
      game.board = [
        [-1, 1, 2, -1],
        [3, 4, 5, 6],
        [7, 8, 9, 10],
        [-1, 11, 12, -1],
      ];
      expect(game.play(0, 0)).toBe(false);
      expect(game.play(0, 3)).toBe(false);
      expect(game.play(3, 0)).toBe(false);
      expect(game.play(3, 3)).toBe(false);
    });
    describe("first move", () => {
      it("should ignore empty spaces", () => {
        const game = new MarbleSolitaire("European" as BoardType);
        game.board = [[1, 0, 3]];
        expect(game.play(0, 1)).toBe(false);
        expect(game.selctedMarble).toEqual({ row: -1, col: -1 });
        expect(game.moves).toEqual([]);
      });
      it("should ignore marbles with no avaiable moves", () => {
        const game = new MarbleSolitaire("European" as BoardType);
        game.board = [
          [1, 2, 3],
          [4, 0, 6],
          [7, 8, 9],
        ];
        expect(game.play(2, 1)).toBe(false);
        expect(game.selctedMarble).toEqual({ row: -1, col: -1 });
        expect(game.moves).toEqual([]);
      });
      it("should select marble with avaiable move", () => {
        const game = new MarbleSolitaire("European" as BoardType);
        game.board = [
          [1, 2, 3],
          [0, 5, 6],
          [7, 8, 9],
        ];
        expect(game.play(1, 2)).toBe(true);
        expect(game.selctedMarble).toEqual({ row: 1, col: 2 });
        expect(game.moves).toEqual([
          {
            from: { row: 1, col: 2 },
            target: { row: 1, col: 1 },
            to: { row: 1, col: 0 },
          },
        ]);
      });
    });
    describe("second move", () => {
      it("should ignore invalid moves", () => {
        const game = new MarbleSolitaire("European" as BoardType);
        game.board = [
          [1, 2, 3],
          [0, 5, 6],
          [7, 8, 9],
        ];
        game.play(1, 2);
        expect(game.play(0, 0)).toBe(false);
        expect(game.selctedMarble).toEqual({ row: 1, col: 2 });
        expect(game.moves).toEqual([
          {
            from: { row: 1, col: 2 },
            target: { row: 1, col: 1 },
            to: { row: 1, col: 0 },
          },
        ]);
      });
      it("should unselect the marble if selected again", () => {
        const game = new MarbleSolitaire("European" as BoardType);
        game.board = [
          [1, 2, 3],
          [0, 5, 6],
          [7, 8, 9],
        ];
        game.play(1, 2);
        expect(game.play(1, 2)).toBe(true);
        expect(game.selctedMarble).toEqual({ row: -1, col: -1 });
        expect(game.moves).toEqual([]);
      });
      it("should ignore marbles with no valid moves", () => {
        const game = new MarbleSolitaire("European" as BoardType);
        game.board = [
          [1, 2, 3],
          [0, 5, 6],
          [7, 8, 9],
        ];
        game.play(1, 2);
        expect(game.play(0, 1)).toBe(false);
        expect(game.selctedMarble).toEqual({ row: 1, col: 2 });
        expect(game.moves).toEqual([
          {
            from: { row: 1, col: 2 },
            target: { row: 1, col: 1 },
            to: { row: 1, col: 0 },
          },
        ]);
      });
      it("should make the move valid moves", () => {
        const game = new MarbleSolitaire("European" as BoardType);
        game.board = [
          [1, 2, 3],
          [0, 5, 6],
          [7, 8, 9],
        ];
        game.play(1, 2);
        expect(game.play(1, 0)).toBe(true);
        expect(game.selctedMarble).toEqual({ row: -1, col: -1 });
        expect(game.moves).toEqual([]);
        expect(game.board).toEqual([
          [1, 2, 3],
          [6, 0, 0],
          [7, 8, 9],
        ]);
      });
      it("should unselect the marble after a valid move", () => {
        const game = new MarbleSolitaire("European" as BoardType);
        game.board = [
          [1, 2, 3],
          [0, 5, 6],
          [7, 8, 9],
        ];
        game.play(1, 2);
        expect(game.play(1, 2)).toBe(true);
        expect(game.selctedMarble).toEqual({ row: -1, col: -1 });
        expect(game.moves).toEqual([]);
      });
    });
  });
});
