import * as _ from 'lodash';

const first = (input: string) => {
  const inputRows = parseList(input);

  const [first, second] = _.zip(...inputRows);

  first.sort();
  second.sort();

  return _.zip(first, second)
    .map(([a, b]) => Math.abs(b - a))
    .reduce((prev, curr) => prev + curr, 0);
};

const expectedFirstSolution = 11;

const second = (input: string) => {
  const inputRows = parseList(input);

  const [first, second] = _.zip(...inputRows);

  const appearances = second.reduce(
    (acc, val) => {
      acc[val] = (acc[val] ?? 0) + 1;
      return acc;
    },
    {} as Record<number, number>
  );

  const output = first.reduce((acc, val) => {
    return acc + val * (appearances[val] ?? 0);
  }, 0);
  return output;
};

const expectedSecondSolution = 31;

export { first, expectedFirstSolution, second, expectedSecondSolution };

const parseList = (input: string) => {
  return input.split('\n').map((line) => line.trim().split(/\s+/).map(Number));
};
