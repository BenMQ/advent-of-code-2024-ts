const first = (input: string) => {
  const { antennaMap, x, y, lines } = parseInput(input);
  const allLocations = new Set<string>();

  for (const [entry, locations] of antennaMap.entries()) {
    // locations.forEach((loc) => allLocations.add(locToString(loc)));

    getAllPairs(locations)
      .flatMap((pair) => getAntinodes(pair))
      .filter(([a, b]) => a >= 0 && b >= 0 && a < x && b < x)
      .map((loc) => allLocations.add(locToString(loc)));
  }
  return allLocations.size;
};

function getAllPairs<T>(values: T[]): [T, T][] {
  const pairs: [T, T][] = [];
  for (let i = 0; i < values.length - 1; i++) {
    for (let j = i + 1; j < values.length; j++) {
      pairs.push([values[i], values[j]]);
    }
  }
  return pairs;
}

function locToString(value: readonly [number, number]) {
  return `[${value[0]},${value[1]}]`;
}
function getAntinodes(pair: [[number, number], [number, number]]) {
  const x1 = pair[0][0];
  const x2 = pair[1][0];
  const y1 = pair[0][1];
  const y2 = pair[1][1];
  const a1x = x1 - (x2 - x1);
  const a2x = x2 + (x2 - x1);
  const a1y = y1 - (y2 - y1);
  const a2y = y2 + (y2 - y1);

  return [
    [a1x, a1y],
    [a2x, a2y],
  ] as const;
}
const expectedFirstSolution = 14;

const second = (input: string) => {
  const { antennaMap, x, y, lines } = parseInput(input);
  const allLocations = new Set<string>();

  for (const [entry, locations] of antennaMap.entries()) {
    // locations.forEach((loc) => allLocations.add(locToString(loc)));

    getAllPairs(locations)
      .flatMap((pair) => getAntinodes2(x, y, pair))
      .filter(([a, b]) => a >= 0 && b >= 0 && a < x && b < x)
      .map((loc) => allLocations.add(locToString(loc)));
  }
  return allLocations.size;
};

function getGradient(pair: [[number, number], [number, number]]) {
  const x1 = pair[0][0];
  const x2 = pair[1][0];
  const y1 = pair[0][1];
  const y2 = pair[1][1];
  const xdelta = x2 - x1;
  const ydelta = y2 - y1;
  return ydelta / xdelta;
}

function getAntinodes2(
  x: number,
  y: number,
  pair: [[number, number], [number, number]]
) {
  const x1 = pair[0][0];
  const x2 = pair[1][0];
  const y1 = pair[0][1];
  const y2 = pair[1][1];

  const xdelta = x2 - x1;
  const ydelta = y2 - y1;

  const gradient = getGradient(pair);

  const values: [number, number][] = [];

  values.push(pair[0]);
  values.push(pair[1]);

  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      const newGradient = getGradient([pair[0], [i, j]]);
      if (newGradient === gradient) {
        values.push([i, j]);
      }
    }
  }

  return values;
}

const expectedSecondSolution = 34;

export { first, expectedFirstSolution, second, expectedSecondSolution };

const parseInput = (input: string) => {
  const lines = input.split('\n').map((line) => line.trim());
  const x = lines.length;
  const y = lines[0].length;
  const antennaMap = new Map<string, [number, number][]>();
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      if (lines[i][j] !== '.') {
        const antenna = lines[i][j];
        if (antennaMap.has(antenna)) {
          antennaMap.set(antenna, [...antennaMap.get(antenna), [i, j]]);
        } else {
          antennaMap.set(antenna, [[i, j]]);
        }
      }
    }
  }
  return { antennaMap, x, y, lines };
};
