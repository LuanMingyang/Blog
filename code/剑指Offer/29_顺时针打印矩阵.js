/**
 * 输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字。
 * 例如：
 * 1   2   3   4
 * 5   6   7   8
 * 9   10  11  12
 * 13  14  15  16 
 * 打印结果为：1,2,3,4,8,12,16,15,14,13,9,5,6,7,11,10
 * 
 * 按层打印，从外向内；
 * 选定两个初始点：左上角节点以及右下角节点；
 * 将两点沿对角线向内，遍历所有层。
 * 注意需要处理两种特殊情况：最内一层为一行或一列。
 */
function rotaryPrintMatrix(matrix) {
  let tR = 0;
  let tC = 0;
  let bR = matrix.length - 1;
  let bC = matrix[0].length - 1;
  let res = [];
  while (tR <= bR && tC <= bC) {
    printRectEdge(matrix, tR++, tC++, bR--, bC--, res);
  }
  return res;
}

function printRectEdge(matrix, tR, tC, bR, bC, res) {
  if (tR === bR) { // 同一行
    while (tC <= bC) {
      res.push(matrix[tR][tC++]);
    }
  } else if (tC === bC) { // 同一列
    while (tR <= bR) {
      res.push(matrix[tR++][tC]);
    }
  } else {
    let curR = tR; // 当前行
    let curC = tC; // 当前列
    while (curC < bC) {
      res.push(matrix[tR][curC++]);
    }
    while (curR < bR) {
      res.push(matrix[curR++][bC]);
    }
    while (curC > tC) {
      res.push(matrix[bR][curC--]);
    }
    while (curR > tC) {
      res.push(matrix[curR--][tC]);
    }
  }
}

function test() {
  let matrix = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
    [17, 18, 19, 20],
  ];
  rotaryPrintMatrix(matrix);
}

test();
