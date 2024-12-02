import _ = require('lodash');

const checkReport = (report: number[]) =>
  report.reduce(
    (acc, val, index, arr) => {
      if (index === 0) {
        return acc;
      }
      const delta = index > 0 ? arr.at(index - 1) - val : 0;
      const safe =
        acc.safe &&
        Math.abs(delta) <= 3 &&
        Math.abs(delta) >= 1 &&
        acc.delta * delta >= 0; // same sign

      return {
        safe,
        delta,
      };
    },
    {
      safe: true,
      delta: 0,
    }
  );

const first = (input: string) => {
  const reports = parseList(input);
  return reports.map(checkReport).filter((report) => {
    return report.safe;
  }).length;
};

const expectedFirstSolution = 2;

const second = (input: string) => {
  const reports = parseList(input);
  return reports
    .map((report) => {
      let candidates = [report];
      for (let i = 0; i < report.length; i++) {
        let newCandidate = [...report];
        newCandidate.splice(i, 1);
        candidates.push(newCandidate);
      }
      return candidates;
    })
    .filter((reportCandidates, i) => {
      return (
        reportCandidates.map(checkReport).find((res) => res.safe) !== undefined
      );
    }).length;
};

const expectedSecondSolution = 4;

export { first, expectedFirstSolution, second, expectedSecondSolution };

const parseList = (input: string) => {
  return input.split('\n').map((line) => line.trim().split(/\s+/).map(Number));
};
