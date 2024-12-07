import _ = require('lodash');

const first = (input: string) => {
  return parseInput(input)
    .filter(({ ans, numbers }) => {
      const has = hasSolution(ans, numbers.reverse(), false);
      return has;
    })
    .map(({ ans }) => ans)
    .reduce((a, b) => a + b, BigInt(0));
};

const expectedFirstSolution = BigInt(3749);

const second = (input: string) => {
  return parseInput(input)
    .filter(({ ans, numbers }) => {
      const has = hasSolution(ans, numbers.reverse(), true);
      return has;
    })
    .map(({ ans }) => ans)
    .reduce((a, b) => a + b, BigInt(0));
};

const expectedSecondSolution = BigInt(11387);

export { first, expectedFirstSolution, second, expectedSecondSolution };

function hasSolution(
  allowConcat: boolean,

  answer: bigint,
  numbers: bigint[]
): boolean {
  // console.log(answer, numbers);
  if (numbers.length === 1) {
    return answer === numbers[0];
  } else {
    const stringAns = '' + answer;
    const stringNextNumber = String(numbers[0]);
    const canBeConcat =
      allowConcat && String(stringAns).endsWith(stringNextNumber);

    return (
      // add
      hasSolution(allowConcat, answer - numbers[0], _.tail(numbers)) ||
      // multiply
      (answer % numbers[0] === BigInt(0) &&
        hasSolution(allowConcat, answer / numbers[0], _.tail(numbers))) ||
      // concat
      (canBeConcat &&
        hasSolution(
          allowConcat,
          BigInt(
            String(stringAns).slice(
              0,
              stringAns.length - stringNextNumber.length
            )
          ),
          _.tail(numbers)
        ))
    );
  }
}

// 190: 10 * 19  1  1
10 + 19;

const parseInput = (input: string) => {
  const lines = input.split('\n');
  return lines.map((line) => {
    const colon = line.indexOf(':')!;
    const ans = BigInt(line.slice(0, colon));
    const numbers = line
      .slice(colon + 1)
      .trim()
      .split(' ')
      .map((v) => BigInt(v));
    return { ans, numbers };
  });
};
