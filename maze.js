function Maze(arr, num, start, end) {
  let path = [start];
  let res = [];

  pathSum = (path) => {
    return path.reduce((acc, curr) => {
      return acc + arr[curr[0]][curr[1]];
    }, 0);
  };

  checkPath = (item, path) => {
    for (let i = 0; i < path.length; i++) {
      const element = path[i];
      if (element[0] === item[0] && element[1] === item[1]) {
        return false;
      }
    }
    return true;
  };

  function solveMaze(row, col, path) {
    if (row === end[0] && col === end[1] && pathSum(path) === num) {
      res.push(path);
      return true;
    }

    if (
      row > 0 &&
      arr[row - 1][col] !== null &&
      checkPath([row - 1, col], path)
    ) {
      solveMaze(row - 1, col, [...path, [row - 1, col]]);
    }

    if (
      col > 0 &&
      arr[row][col - 1] !== null &&
      checkPath([row, col - 1], path)
    ) {
      solveMaze(row, col - 1, [...path, [row, col - 1]]);
    }

    if (
      row < arr.length - 1 &&
      arr[row + 1][col] !== null &&
      checkPath([row + 1, col], path)
    ) {
      solveMaze(row + 1, col, [...path, [row + 1, col]]);
    }

    if (
      col < arr[0].length - 1 &&
      arr[row][col + 1] !== null &&
      checkPath([row, col + 1], path)
    ) {
      solveMaze(row, col + 1, [...path, [row, col + 1]]);
    }

    return false;
  }

  solveMaze(start[0], start[1], path);

  return res;
}

const res = Maze(
  [
    [0, null, 0],
    [0, 0, 0],
    [0, 1, 0],
  ],
  1,
  [0, 0],
  [2, 2]
);

console.log(res);

let state = 0;
const promts = [
  'Select the start point.',
  'Select the end point.',
  'Click the cells that you want to be obstacles.',
  'now enter numbers inside cells to set their scores.',
  'Enter the score that you want to achieve in the path.',
];
document.querySelector('.maze-grid').addEventListener('click', (e) => {
  if (state === 0) {
    e.target.classList.toggle('start');
  } else if (state === 1) {
    e.target.classList.toggle('end');
  } else if (state === 2) {
    e.target.classList.toggle('clicked');
  }
});

const prompt = document.querySelector('.prompt');
let num = 0;

document.querySelector('.next').addEventListener('click', (e) => {
  if (state === 4) {
    num = document.querySelector('input').value;
  }
  state++;
  prompt.textContent = promts[state];
  if (state === 4) {
    const input = document.createElement('input');
    input.type = 'number';
    input.value = num;
    prompt.appendChild(input);
  }
});
