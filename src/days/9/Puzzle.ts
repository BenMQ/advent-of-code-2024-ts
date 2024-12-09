import { skip } from 'node:test';

const first = (input: string) => {
  const disk = parseInput(input);

  function defrag(firstFree: number, lastFilled: number) {
    do {
      firstFree++;
    } while (disk[firstFree] >= 0 && firstFree < disk.length);

    do {
      lastFilled--;
    } while (disk[lastFilled] < 0 && lastFilled >= 0);

    if (firstFree > lastFilled) {
      return;
    }
    const tmp = disk[lastFilled];
    disk[lastFilled] = disk[firstFree];
    disk[firstFree] = tmp;
    defrag(firstFree, lastFilled);
  }

  defrag(-1, disk.length);

  return disk.reduce((acc, v, index) => (v >= 0 ? acc + v * index : acc), 0);
};

const expectedFirstSolution = 1928;

// takes 10 minutes.
const second = (input: string) => {
  let disk = toFileList(parseInput(input));

  function cleanup() {
    disk = disk.reduce((acc, curr) => {
      if (acc.length < 2) {
        return [...acc, curr];
      }
      if (acc.at(-1).id === null && curr.id === null) {
        return [
          ...acc.slice(0, acc.length - 1),
          { id: null, length: curr.length + acc.at(-1).length },
        ];
      }
      return [...acc, curr];
    }, []);
  }

  let skipped = new Set<number>();
  function defrag(count: number) {
    let swapped = false;
    let lastFilled = disk.length;
    do {
      lastFilled--;
    } while (
      lastFilled >= 0 &&
      (disk[lastFilled].id === null ||
        (disk[lastFilled].id !== null && skipped.has(disk[lastFilled].id)))
    );

    for (let i = 0; i < lastFilled; i++) {
      if (disk[i].id === null && disk[i].length === disk[lastFilled].length) {
        const id = disk[lastFilled].id;
        disk[i].id = id;
        disk[lastFilled].id = null;
        cleanup();
        swapped = true;
        break;
      } else if (
        disk[i].id === null &&
        disk[i].length > disk[lastFilled].length
      ) {
        const extraEmptySpace = disk[i].length - disk[lastFilled].length;
        disk[i] = { ...disk[lastFilled] };

        disk[lastFilled].id = null;

        disk = [
          ...disk.slice(0, i + 1),
          { id: null, length: extraEmptySpace } as File,
          ...disk.slice(i + 1),
        ];

        swapped = true;

        cleanup();
        break;
      }

      skipped.add(disk[lastFilled].id);
      swapped = true;
    }

    if (!swapped) {
      return;
    } else {
      defrag(count + 1);
    }
  }

  defrag(0);
  return toDiskList(disk).reduce(
    (acc, v, index) => (v >= 0 ? acc + v * index : acc),
    0
  );
};

const expectedSecondSolution = 2858;

export { first, expectedFirstSolution, second, expectedSecondSolution };

const parseInput = (input: string) => {
  const disk: number[] = [];
  let isFile = true;
  let fileId = 0;

  for (let i = 0; i < input.length; i++) {
    if (isFile) {
      fillDisk(disk, parseInt(input[i]), fileId);
      fileId++;
    } else {
      fillDisk(disk, parseInt(input[i]), -1);
    }
    isFile = !isFile;
  }
  return disk;
};

function toFileList(disk: number[]) {
  let i = 0;
  const output: File[] = [];

  while (i < disk.length) {
    let runLength = 0;
    const fileId = disk[i];
    while (disk[i + runLength] === fileId) runLength++;
    if (fileId < 0) {
      output.push({ id: null, length: runLength });
    } else {
      output.push({ id: fileId, length: runLength });
    }
    i += runLength;
  }
  return output;
}

function printList(disk: File[]) {
  let output = '';
  for (const i of disk) {
    output += repeat(i.id, i.length);
  }
  console.log(output);
}

function toDiskList(files: File[]) {
  let output: number[] = [];
  for (const file of files) {
    if (file.id === null) {
      fillDisk(output, file.length, -1);
    } else {
      fillDisk(output, file.length, file.id);
    }
  }
  return output;
}
function repeat(num: number, t: number) {
  let output = '';
  for (let i = 0; i < t; i++) {
    output += num !== null ? String(num) : '.';
  }
  return output;
}
type File =
  | {
      id: number;
      length: number;
    }
  | {
      id: null;
      length: number;
    };
function fillDisk(disk: number[], length: number, fileId: number) {
  for (let i = 0; i < length; i++) {
    disk.push(fileId);
  }
}
