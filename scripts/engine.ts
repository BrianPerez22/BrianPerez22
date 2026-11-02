// Motor real de 2048 escrito en TypeScript
// Tablero 4x4, spawns aleatorios, movimiento y fusión en línea recta.

export interface Coord {
  r: number;
  c: number;
}

export interface Tile {
  id: number;
  value: number;
}

export type Board = (Tile | null)[][];

export type Direction = 'left' | 'right' | 'up' | 'down';

export interface MergeEvent {
  value: number;
  fromA: Coord;
  fromB: Coord;
  to: Coord;
  direction?: Direction;
}

export interface PlayResult {
  milestones: MergeEvent[];
  maxValue: number;
  moveCount: number;
}

export interface PlayOptions {
  maxMoves?: number;
  target?: number;
  attempts?: number;
}

let idCounter = 1;
export function newId(): number {
  return idCounter++;
}

export function createBoard(): Board {
  return Array.from({ length: 4 }, () => Array<Tile | null>(4).fill(null));
}

export function emptyCells(board: Board): Coord[] {
  const cells: Coord[] = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (!board[r][c]) cells.push({ r, c });
    }
  }
  return cells;
}

export function spawnRandom(board: Board): boolean {
  const cells = emptyCells(board);
  if (cells.length === 0) return false;
  const { r, c } = cells[Math.floor(Math.random() * cells.length)];
  board[r][c] = { id: newId(), value: Math.random() < 0.9 ? 2 : 4 };
  return true;
}

export function lineCoords(direction: Direction, idx: number): Coord[] {
  const coords: Coord[] = [];
  if (direction === 'left') {
    for (let c = 0; c < 4; c++) coords.push({ r: idx, c });
  } else if (direction === 'right') {
    for (let c = 3; c >= 0; c--) coords.push({ r: idx, c });
  } else if (direction === 'up') {
    for (let r = 0; r < 4; r++) coords.push({ r, c: idx });
  } else if (direction === 'down') {
    for (let r = 3; r >= 0; r--) coords.push({ r, c: idx });
  }
  return coords;
}

export function applyMove(board: Board, direction: Direction): { board: Board; mergeEvents: MergeEvent[]; moved: boolean } {
  const newBoard = createBoard();
  const mergeEvents: MergeEvent[] = [];

  for (let idx = 0; idx < 4; idx++) {
    const coords = lineCoords(direction, idx);
    const tiles = coords
      .map(({ r, c }) => ({ coord: { r, c }, tile: board[r][c] }))
      .filter((x): x is { coord: Coord; tile: Tile } => x.tile !== null);

    const resultLine: Tile[] = [];
    let i = 0;
    while (i < tiles.length) {
      if (i + 1 < tiles.length && tiles[i].tile.value === tiles[i + 1].tile.value) {
        const value = tiles[i].tile.value * 2;
        mergeEvents.push({
          value,
          fromA: tiles[i].coord,
          fromB: tiles[i + 1].coord,
          to: coords[resultLine.length],
        });
        resultLine.push({ id: newId(), value });
        i += 2;
      } else {
        resultLine.push(tiles[i].tile);
        i += 1;
      }
    }

    resultLine.forEach((tile, i2) => {
      const { r, c } = coords[i2];
      newBoard[r][c] = tile;
    });
  }

  let moved = false;
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      const av = board[r][c] ? board[r][c]!.value : null;
      const bv = newBoard[r][c] ? newBoard[r][c]!.value : null;
      if (av !== bv) moved = true;
    }
  }

  return { board: newBoard, mergeEvents, moved };
}

function log2v(v: number): number {
  return v ? Math.log2(v) : 0;
}

const WEIGHTS = [
  [65536, 32768, 16384, 8192],
  [512, 1024, 2048, 4096],
  [256, 128, 64, 32],
  [2, 4, 8, 16],
];

export function scoreBoard(board: Board): number {
  let positional = 0;
  let empty = 0;
  let smoothness = 0;
  let maxVal = 0;

  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      const tile = board[r][c];
      if (!tile) {
        empty++;
        continue;
      }
      positional += tile.value * WEIGHTS[r][c];
      if (tile.value > maxVal) maxVal = tile.value;
      if (c < 3 && board[r][c + 1]) smoothness -= Math.abs(log2v(tile.value) - log2v(board[r][c + 1]!.value));
      if (r < 3 && board[r + 1][c]) smoothness -= Math.abs(log2v(tile.value) - log2v(board[r + 1][c]!.value));
    }
  }

  const corner = board[0][0];
  const cornerBonus = corner && corner.value === maxVal ? maxVal * 40 : 0;
  return positional + empty * 400 + smoothness * 4 + cornerBonus;
}

export function expectimax(board: Board, depth: number, isMaxNode: boolean): number {
  if (isMaxNode) {
    let best = -Infinity;
    let any = false;
    for (const dir of ['left', 'right', 'up', 'down'] as Direction[]) {
      const { board: nb, moved } = applyMove(board, dir);
      if (!moved) continue;
      any = true;
      const v = depth === 0 ? scoreBoard(nb) : expectimax(nb, depth, false);
      if (v > best) best = v;
    }
    return any ? best : scoreBoard(board);
  }

  const empties = emptyCells(board);
  if (empties.length === 0 || depth === 0) return scoreBoard(board);

  let total = 0;
  const sample = empties.length > 6
    ? empties.filter(() => Math.random() < 6 / empties.length)
    : empties;
  const cells = sample.length ? sample : empties;

  for (const { r, c } of cells) {
    board[r][c] = { id: 0, value: 2 };
    total += 0.9 * expectimax(board, depth - 1, true);
    board[r][c]!.value = 4;
    total += 0.1 * expectimax(board, depth - 1, true);
    board[r][c] = null;
  }
  return total / cells.length;
}

export function chooseBestMove(board: Board, depth = 1): Direction | null {
  let best: { dir: Direction; score: number } | null = null;
  for (const dir of ['left', 'right', 'up', 'down'] as Direction[]) {
    const { board: nb, moved } = applyMove(board, dir);
    if (!moved) continue;
    const s = expectimax(nb, depth, false);
    if (!best || s > best.score) best = { dir, score: s };
  }
  return best ? best.dir : null;
}

export function playGame({ maxMoves = 6000, target = 2048 }: PlayOptions = {}): PlayResult {
  let board = createBoard();
  spawnRandom(board);
  spawnRandom(board);

  let maxValue = 2;
  const milestones: MergeEvent[] = [];
  let moveCount = 0;

  while (moveCount < maxMoves && maxValue < target) {
    const dir = chooseBestMove(board);
    if (!dir) break;

    const { board: nb, mergeEvents } = applyMove(board, dir);
    board = nb;
    for (const ev of mergeEvents) {
      if (ev.value > maxValue) {
        maxValue = ev.value;
        milestones.push({ ...ev, direction: dir });
      }
    }
    spawnRandom(board);
    moveCount++;
  }

  return { milestones, maxValue, moveCount };
}

export function playUntilTarget({ attempts = 25, maxMoves = 6000, target = 2048 }: PlayOptions = {}): PlayResult {
  let best: PlayResult | null = null;
  for (let a = 0; a < attempts; a++) {
    idCounter = 1;
    const result = playGame({ maxMoves, target });
    if (!best || result.maxValue > best.maxValue) best = result;
    if (result.maxValue >= target) break;
  }
  return best!;
}
