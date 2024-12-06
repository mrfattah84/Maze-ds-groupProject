//solver inputs
let num = 0;
let start = [0, 0];
let end = [0, 0];
let mazeMatrix = [];

//solver
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
    console.log(row, col);
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

//UI
let state = -1; // 0 for start, 1 for end, 2 for obstacles, 3 for cell scores, 4 for required score, 5 for solving

const maze = document.querySelector('.maze-grid');

for (let i = 0; i < 100; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.contentEditable = 'false';
  maze.appendChild(cell);
}
const promts = [
  'Select the start point.',
  'Select the end point.',
  'Click the cells that you want to be obstacles.',
  'now enter numbers inside cells to set their scores.',
  'Enter the score that you want to achieve in the path.',
  'Here is your path being made.',
];

maze.addEventListener('click', (e) => {
  if (state === 0) {
    e.target.classList.toggle('start');
    state++;
    prompt.textContent = promts[state];
  } else if (state === 1) {
    e.target.classList.toggle('end');
    state++;
    prompt.textContent = promts[state];
  } else if (state === 2) {
    e.target.classList.toggle('clicked');
  } else if (state === 3) {
    document.querySelectorAll('.cell').forEach((cell) => {
      if (cell.classList.length === 1) {
        cell.contentEditable = 'true';
      }
    });
  }
});

const prompt = document.querySelector('.prompt');

document.querySelector('.next').addEventListener('click', (e) => {
  if (state === 4) {
    //saving user required score
    num = parseInt(document.querySelector('input').value) || 0;
  }
  state++;
  prompt.textContent = promts[state];
  if (state === 4) {
    //disabeling user score input
    document.querySelectorAll('.cell').forEach((cell) => {
      cell.contentEditable = 'false';
    });
    // enabling user to input required score
    const input = document.createElement('input');
    input.type = 'number';
    prompt.appendChild(input);
  }
  if (state === 5) {
    //making the maze matrix out of ui elements for the solver
    const cells = document.querySelectorAll('.cell');
    for (let i = 0; i < 10; i++) {
      row = [];
      for (let j = 0; j < 10; j++) {
        cell = cells[i * 10 + j];
        if (cell.classList.contains('start')) {
          start = [i, j];
          row.push(0);
        } else if (cell.classList.contains('end')) {
          end = [i, j];
          row.push(0);
        } else if (cell.classList.contains('clicked')) {
          row.push(null);
        } else {
          row.push(parseInt(cell.textContent) || 0);
        }
      }
      mazeMatrix.push(row);
    }
    console.log(mazeMatrix, num, start, end);
    const paths = Maze(mazeMatrix, num, start, end);
    let min = 0;
    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];
      if (path.length < paths[min].length) {
        min = i;
      }
    }
    const path = paths[min];
    for (let i = 0; i < path.length; i++) {
      const item = path[i];
      cells[item[0] * 10 + item[1]].classList.add('path');
      cells[item[0] * 10 + item[1]].style.opacity = `${(i + 1) / path.length}`;
    }

    console.log(paths);
  }
  if (state >= 6) {
    location.reload();
  }
});
