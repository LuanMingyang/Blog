/**
 * 在一个m×n的棋盘的每一格都放有一个礼物，每个礼物都有一定的价值（价值大于0）。
 * 可以从棋盘的左上角开始拿格子里的礼物，并每次向右或者向下移动一格，直到到达棋盘的右下角。
 * 给定一个棋盘及其上面的礼物，计算出最多能拿到多少价值的礼物。
 * 
 * 动态规划问题
 * f(i,j)表示到达坐标为(i,j)的格子时能拿到的礼物价值总和的最大值，g(i,j)表示格子(i,j)里礼物的价值。
 * f(i,j) = max(f(i-1,j), f(i,j-1)) + g(i,j)
 */
function getMaxValue(values, rows, cols) {
  if (!values || rows <= 0 || cols <= 0) {
    return 0;
  }
  let maxValues = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let up = i > 0 ? maxValues[(i - 1) * cols + j] : 0;
      let left = j > 0 ? maxValues[i * cols + j - 1] : 0;
      maxValues[i * cols + j] = Math.max(up, left) + values[i * cols + j];
    }
  }
  return maxValues[rows * cols - 1];
}
