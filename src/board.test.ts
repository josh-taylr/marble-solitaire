import exp from "constants";
import { Board } from "./board";

describe("create_board", () => {
  it("creates a board of the specified size", () => {
    const size = 5;
    const goBoard = new Board(size);
    expect(goBoard.board).toHaveLength(size);
    goBoard.board.forEach(row => {
      expect(row).toHaveLength(size);
    });
  });

  it("creates a board with all empty intersections", () => {
    const size = 5;
    const goBoard = new Board(size);
    goBoard.board.forEach(row => {
      row.forEach(intersection => {
        expect(intersection).toBe(Board.EMPTY);
      });
    });
  });
});

describe("switch_player", () => {
  it("switch to black", () => {
    const goBoard = new Board(5);
    goBoard.current_color = Board.BLACK; // breaks encapsulation
    goBoard.switch_player();
    expect(goBoard.current_color).toBe(Board.WHITE);
  })

  it("switch to white", () => {
    const goBoard = new Board(5);
    goBoard.current_color = Board.WHITE; // breaks encapsulation
    goBoard.switch_player();
    expect(goBoard.current_color).toBe(Board.BLACK);
  })
})

describe("pass", () => {
  it("switches player after a pass", () => {
    const goBoard = new Board(5);
    goBoard.pass();
    expect(goBoard.current_color).toBe(Board.WHITE);
  })

  it("ends the game after two consecutive passes", () => {
    const goBoard = new Board(5);
    const endGameSpy = jest.spyOn(goBoard, "end_game");
    goBoard.pass();
    goBoard.pass();
    expect(endGameSpy).toHaveBeenCalled();
  })
})

describe("game_over", () => {
  it("logs the result", () => {
    const goBoard = new Board(5);
    const logSpy = jest.spyOn(console, "log");
    goBoard.end_game();
    expect(logSpy).toHaveBeenCalledWith("GAME OVER");
  })
})

describe("play", () => {
  it("places a stone of the current color on the board", () => {
    const goBoard = new Board(5);
    const current_color = goBoard.current_color;
    goBoard.play(0, 0);
    expect(goBoard.board[0][0]).toBe(current_color);
  })

  it("captures stones of the opposite color that have no liberties", () => {
    const goBoard = new Board(5);
    goBoard.board = [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 1, 2, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0]
    ];
    goBoard.play(2, 3); // black plays at row: 2, col: 3
    expect(goBoard.board[2][2]).toBe(Board.EMPTY);
  })

  it("captures stones of the opposite color at the edge that have no liberties", () => {
    const goBoard = new Board(5);
    goBoard.board = [
      [0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [2, 1, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ];
    goBoard.play(3, 0); // black plays at row: 3, col: 0
    expect(goBoard.board[2][0]).toBe(Board.EMPTY);
  })
})

describe("get_adjacent_intersections", () => {
  it("returns the intersections above, below, left, and right", () => {
    const goBoard = new Board(5);
    const adjacentIntersections = goBoard.get_adjacent_intersections(1, 1);
    expect(adjacentIntersections).toEqual([
      [0, 1],
      [1, 2],
      [2, 1],
      [1, 0],
    ]);
  })

  it("does not include intersections that are off the board", () => {
    const goBoard = new Board(5);
    const adjacentIntersections = goBoard.get_adjacent_intersections(0, 0);
    expect(adjacentIntersections).toEqual([
      [0, 1],
      [1, 0]
    ]);
  })
})