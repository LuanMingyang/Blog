/**
 * 地上有一个m行n列的方格。
 * 一个机器人从坐标(0,0)的格子开始移动，它每次可以向左、右、上、下四个方向移动一格，但不能进入行坐标和列坐标的数位之和大于k的格子。
 * 例如：
 * 当k为18时，机器人能够进入方格(35,37)，因为 3 + 5 + 3 + 7 = 18。
 * 但它不能进入方格(35,38)，因为 3 + 5 + 3 + 8 = 19。
 * 请问该机器人能够达到多少个格子？
 * 
 * 采用回溯法
 */
function movingCount(threshold, rows, cols) {
  let visited = [];
  let count = moveProcess(threshold, rows, cols, 0, 0, visited);
  return count;
}

function moveProcess(threshold, rows, cols, row, col, visited) {
  let count = 0;
  let sum = `${row}${col}`.split('').reduce((pre, next) => (pre >>> 0) + (next >>> 0));
  if (row >= 0 && row < rows && col >= 0 && col < cols && !visited[row * cols + col] && sum <= threshold) {
    visited[row * cols + col] = true;
    count = 1 + moveProcess(threshold, rows, cols, row + 1, col, visited)
            + moveProcess(threshold, rows, cols, row, col + 1, visited)
            + moveProcess(threshold, rows, cols, row - 1, col, visited)
            + moveProcess(threshold, rows, cols, row, col - 1, visited);
  }
  return count;
}

let count = movingCount(5, 10, 10);
