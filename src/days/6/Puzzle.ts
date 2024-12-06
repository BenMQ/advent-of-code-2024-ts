import { dir } from 'console';
import _ = require('lodash');

const _isGuard = (map: string[], pos: [number, number]) => {
  return map[pos[0]]?.at(pos[1]) == '^';
};

const _isObstacle = (map: string[], pos: [number, number]) => {
  return map[pos[0]]?.at(pos[1]) == '#';
};

const UP = [-1, 0] as const;
const RIGHT = [0, 1] as const;
const DOWN = [1, 0] as const;
const LEFT = [0, -1] as const;

type Direction = typeof UP | typeof DOWN | typeof LEFT | typeof RIGHT;
const turn = (dir: Direction) => {
  if (dir === UP) {
    return RIGHT;
  }
  if (dir === RIGHT) {
    return DOWN;
  }
  if (dir === DOWN) {
    return LEFT;
  }
  if (dir === LEFT) {
    return UP;
  }
};

const move = (pos: [number, number], dir: Direction): [number, number] => {
  return [pos[0] + dir[0], pos[1] + dir[1]];
};
const first = (input: string) => {
  const map = parseMap(input);
  const [x, y] = [map.length, map[0].length];

  const isGuard = _.curry(_isGuard)(map);
  const isObstacle = _.curry(_isObstacle)(map);

  let guard = [-1, -1] as [number, number];
  const visited = [[]] as Set<Direction>[][];

  // initialize, find guard position.
  for (let i = 0; i < x; i++) {
    visited[i] = [];
    for (let j = 0; j < y; j++) {
      if (isGuard([i, j])) {
        guard = [i, j];
      }
      visited[i][j] = new Set<Direction>();
    }
  }
  let guardDir: Direction = UP;
  while (guard[0] >= 0 && guard[1] >= 0 && guard[0] < x && guard[1] < y) {
    // save current position and direction
    visited[guard[0]][guard[1]].add(guardDir);

    const newPos = move(guard, guardDir);

    if (isObstacle(newPos)) {
      guardDir = turn(guardDir);
    } else {
      guard = newPos;
    }
  }

  return visited
    .flatMap((v) => v)
    .map((v) => v.size)
    .filter(Boolean).length;
};

const expectedFirstSolution = 41;

const init = (x: number, y: number) => {
  const visited = [[]] as Set<Direction>[][];

  for (let i = 0; i < x; i++) {
    visited[i] = [];
    for (let j = 0; j < y; j++) {
      visited[i][j] = new Set<Direction>();
    }
  }
  return visited;
};
const second = (input: string) => {
  const map = parseMap(input);
  const [x, y] = [map.length, map[0].length];

  const isGuard = _.curry(_isGuard)(map);
  const isObstacle = _.curry(_isObstacle)(map);

  let guard = [-1, -1] as [number, number];
  let visited = [[]] as Set<Direction>[][];

  for (let i = 0; i < x; i++) {
    visited[i] = [];
    for (let j = 0; j < y; j++) {
      if (isGuard([i, j])) {
        guard = [i, j];
      }
      visited[i][j] = new Set<Direction>();
    }
  }
  let guardDir: Direction = UP;
  let loops = 0;

  const origGuard = guard;

  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      guard = origGuard;
      guardDir = UP;
      visited = init(x, y);

      if (i === guard[0] && j === guard[1]) continue;
      if (isObstacle([i, j])) continue;
      while (guard[0] >= 0 && guard[1] >= 0 && guard[0] < x && guard[1] < y) {
        if (visited[guard[0]][guard[1]].has(guardDir)) {
          loops++;
          break;
        } else {
          visited[guard[0]][guard[1]].add(guardDir);
        }

        const newPos = move(guard, guardDir);

        if (isObstacle(newPos) || (i === newPos[0] && j === newPos[1])) {
          guardDir = turn(guardDir);
        } else {
          guard = newPos;
        }
      }
    }
  }

  return loops;
};

const expectedSecondSolution = 6;

export { first, expectedFirstSolution, second, expectedSecondSolution };

const parseMap = (input: string) => {
  const lines = input.split('\n');
  return lines;
};
