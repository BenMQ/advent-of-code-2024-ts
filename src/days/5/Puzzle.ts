import _ = require('lodash');

const testPage = (rules: number[][], page: number[]) => {
  const targets = rules.reduce(
    (acc, rule) => ({ ...acc, [rule[0]]: -1 }),
    {} as Record<number, number>
  );

  page.forEach((val, index) => (targets[val] = index));

  for (const [before, after] of rules) {
    if (
      targets[before] > -1 &&
      targets[after] > -1 &&
      targets[before] >= targets[after]
    ) {
      return [targets[before], targets[after]];
    }
  }
  return undefined;
};

const first = (input: string) => {
  const [rules, pages] = parseList(input);

  return pages
    .filter((page) => !_.curry(testPage)(rules)(page))
    .map((page) => page[(page.length - 1) / 2])
    .reduce((a, b) => a + b, 0);
};

const expectedFirstSolution = 143;

function swap(arr: number[], x: number, y: number) {
  const tmp = arr[x];
  arr[x] = arr[y];
  arr[y] = tmp;
}
const second = (input: string) => {
  const [rules, pages] = parseList(input);

  const curryRule = _.curry(testPage)(rules);

  const incorrectPages = pages.filter((page) => curryRule(page));

  const fixPage = (page: number[]) => {
    let newCandidate = [...page];

    while (true) {
      const toSwap = curryRule(newCandidate);
      if (toSwap) {
        swap(newCandidate, toSwap[0], toSwap[1]);
      } else {
        break;
      }
    }
    return newCandidate;
  };

  return incorrectPages
    .map(fixPage)
    .map((page) => page[(page.length - 1) / 2])
    .reduce((a, b) => a + b, 0);
};

const expectedSecondSolution = 123;

export { first, expectedFirstSolution, second, expectedSecondSolution };

const parseList = (input: string) => {
  const [rules, pages] = input.split('\n\n');
  const rulesList = rules
    .split('\n')
    .map((line) => line.split('|').map(Number));

  const pagesList = pages
    .split('\n')
    .map((line) => line.split(',').map(Number));

  return [rulesList, pagesList];
};
