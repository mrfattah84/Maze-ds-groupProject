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
