type Intersection = [number, number]; // [row, col]

interface Group {
  stones: Intersection[];
  liberties: number;
}

class Board {
  current_color: number;
  size: number;
  board: number[][];
  last_move_passed: boolean;
  in_atari: boolean;
  attempted_suicide: boolean;
  game_over: boolean;

  static EMPTY = 0;
  static BLACK = 1;
  static WHITE = 2;

  constructor(size: number) {
    this.current_color = Board.BLACK;
    this.size = size;
    this.board = this.create_board(size);
    this.last_move_passed = false;
    this.in_atari = false;
    this.attempted_suicide = false;
    this.game_over = false;
  }

  create_board(size: number): number[][] {
    const m: number[][] = [];
    for (let i = 0; i < size; i++) {
      m[i] = [];
      for (let j = 0; j < size; j++) {
        m[i][j] = Board.EMPTY;
      }
    }
    return m;
  }

  switch_player(): void {
    this.current_color = this.current_color === Board.BLACK ? Board.WHITE : Board.BLACK;
  }

  pass(): void {
    if (this.last_move_passed) this.end_game();
    this.last_move_passed = true;
    this.switch_player();
  }

  end_game(): void {
    this.game_over = true
    console.log("GAME OVER");
  }

  play(i: number, j: number): boolean {
    console.log("Played at " + i + ", " + j);
    this.attempted_suicide = this.in_atari = false;

    if (this.board[i][j] !== Board.EMPTY) return false;

    if (this.game_over) return true;

    const color = (this.board[i][j] = this.current_color);
    const captured: Group[] = [];
    const neighbors: Intersection[] = this.get_adjacent_intersections(i, j);
    let atari = false;

    neighbors.forEach(([i,j]: Intersection) => {
      const state = this.board[i][j];
      if (state !== Board.EMPTY && state !== color) {
        const group = this.get_group(i, j);
        console.log(group);
        if (group && group.liberties === 0) captured.push(group);
        else if (group && group.liberties === 1) atari = true;
      }
    });

    const group = this.get_group(i, j);
    if (captured.length === 0 && group && group.liberties === 0) {
      this.board[i][j] = Board.EMPTY;
      this.attempted_suicide = true;
      return false;
    }

    captured.forEach((group) => {
      group.stones.forEach((stone: number[]) => {
        this.board[stone[0]][stone[1]] = Board.EMPTY;
      });
    });

    if (atari) this.in_atari = true;

    this.last_move_passed = false;
    this.switch_player();
    return true;
  }

  get_adjacent_intersections(i: number, j: number): Intersection[] {
    const neighbors: Intersection[] = [];
    if (i > 0) neighbors.push([i - 1, j]);
    if (j < this.size - 1) neighbors.push([i, j + 1]);
    if (i < this.size - 1) neighbors.push([i + 1, j]);
    if (j > 0) neighbors.push([i, j - 1]);
    return neighbors;
  }
  
  get_group(i: number, j: number): Group {
    const color = this.board[i][j];
    
    if (color === Board.EMPTY) return { liberties: 0, stones: [] };
    
    const visited: { [key: string]: boolean } = {};
    const visited_list: Intersection[] = [];
    const queue: Intersection[] = [[i, j]];
    let count = 0;

    while (queue.length > 0) {
      const stone = queue.pop() as Intersection;
      if (visited[stone.toString()]) continue;

      const neighbors = this.get_adjacent_intersections(stone[0], stone[1]);
      neighbors.forEach((n) => {
          const state = this.board[n[0]][n[1]];
          if (state === Board.EMPTY) count++;
          if (state === color) queue.push([n[0], n[1]]);
          });

      visited[stone.toString()] = true;
      visited_list.push([stone[0], stone[1]]);
    }

    return {
      liberties: count,
      stones: visited_list,
    };
  }
}

export { Board }