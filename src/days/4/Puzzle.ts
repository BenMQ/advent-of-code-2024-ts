import _ = require('lodash');

const getChar = (input: string[], x: number, y: number) => {
  if (x < 0 || x >= input.length || y < 0 || y >= input[0].length) {
    return '';
  }
  return input[x][y];
};

const first = (input: string) => {
  const puzzle = input.split('\n').map((line) => line.trim());
  const getter = _.curry(getChar)(puzzle);
  const x = puzzle.length;
  const y = puzzle[0].length;
  let counter = 0;
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      if (
        getter(i, j) +
          getter(i + 1, j) +
          getter(i + 2, j) +
          getter(i + 3, j) ===
        'XMAS'
      ) {
        counter++;
      }
      if (
        getter(i, j) +
          getter(i - 1, j) +
          getter(i - 2, j) +
          getter(i - 3, j) ===
        'XMAS'
      ) {
        counter++;
      }
      if (
        getter(i, j) +
          getter(i, j + 1) +
          getter(i, j + 2) +
          getter(i, j + 3) ===
        'XMAS'
      ) {
        counter++;
      }

      if (
        getter(i, j) +
          getter(i, j - 1) +
          getter(i, j - 2) +
          getter(i, j - 3) ===
        'XMAS'
      ) {
        counter++;
      }

      if (
        getter(i, j) +
          getter(i + 1, j - 1) +
          getter(i + 2, j - 2) +
          getter(i + 3, j - 3) ===
        'XMAS'
      ) {
        counter++;
      }

      if (
        getter(i, j) +
          getter(i - 1, j - 1) +
          getter(i - 2, j - 2) +
          getter(i - 3, j - 3) ===
        'XMAS'
      ) {
        counter++;
      }

      if (
        getter(i, j) +
          getter(i + 1, j + 1) +
          getter(i + 2, j + 2) +
          getter(i + 3, j + 3) ===
        'XMAS'
      ) {
        counter++;
      }

      if (
        getter(i, j) +
          getter(i - 1, j + 1) +
          getter(i - 2, j + 2) +
          getter(i - 3, j + 3) ===
        'XMAS'
      ) {
        counter++;
      }
    }
  }
  return counter;
};

const expectedFirstSolution = 18;

const second = (input: string) => {
  const puzzle = input.split('\n').map((line) => line.trim());
  const getter = _.curry(getChar)(puzzle);
  const x = puzzle.length;
  const y = puzzle[0].length;
  let counter = 0;
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      if (getter(i, j) === 'A') {
        const stars = [
          getter(i - 1, j - 1),
          getter(i + 1, j + 1),
          getter(i - 1, j + 1),
          getter(i + 1, j - 1),
        ];
        stars.sort();
        if (
          stars.join('') === 'MMSS' &&
          getter(i - 1, j - 1) != getter(i + 1, j + 1)
        ) {
          counter++;
        }
      }
    }
  }
  return counter;
};

const expectedSecondSolution = 9;

export { first, expectedFirstSolution, second, expectedSecondSolution };

const parseList = (input: string) => {
  return input.split('\n').map((line) => line.trim().split(/\s+/).map(Number));
};
