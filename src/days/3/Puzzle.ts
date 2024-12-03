import _ = require('lodash');

const matcher = /mul\((\d{1,3}),(\d{1,3})\)/g;

const first = (input: string) => {
  return [...input.matchAll(matcher)]
    .map((match) => parseInt(match[1]) * parseInt(match[2]))
    .reduce((a, b) => a + b, 0);
};

const expectedFirstSolution = 161;

const second = (input: string) => {
  return first(
    ('do()' + input)
      .split("don't()")
      .filter(Boolean)
      .map((segment) => _.tail(segment.split('do()')).join(''))
      .join('')
  );
};

const expectedSecondSolution = 48;

export { first, expectedFirstSolution, second, expectedSecondSolution };
