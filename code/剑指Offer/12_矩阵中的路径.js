/**
 * 请设计一个函数，用来判断在一个矩阵中是否存在一条包含某字符串所有字符的路径。
 * 路径可以从矩阵中的任意一个格子开始，每一步可以在矩阵中向左、右、上、下移动一格。
 * 如果一条路径经过了矩阵中的某一格，则之后不能再次进入这个格子。
 * 
 * 例如：
 * 下面 3 X 4 矩阵中包含一条字符串"bfce"的路径
 * 但是矩阵中不包含"abfb"路径，因为字符串的第一个字符b占据了矩阵中的第一行第二个格子之后，路径不能再次进入该格子。
 * a  b  t  g
 * c  f  c  s
 * j  d  e  h
 * 
 * 回溯法：
 * 回溯法从解决问题每一步的所有可能选项里系统地选择出一个可行的解决方案。
 * 适合由多个步骤组成，并且每个步骤都有多个选项的问题。
 * 回溯法解决的问题的所有选项可以形象的用树状结构表示。
 * 在某一步有 n 个可能的选项，该步骤可以看成树状结构中的一个节点，每个选项看成树中节点接连线，经过这些连接线到达子节点。
 * 树的节点对应着终结状态：
 * 若满足要求的约束条件，则找到了一个可行的解决方案；
 * 否则，回溯到上一个节点，尝试其他的选项。若上一节点的所有选项都尝试过并且都不满足条件，则再次回溯到上一节点。
 * 若果，所有的选项都已经尝试过仍没有满足条件的终结状态，则题目无解。
 * 
 * 利用回溯法，除边界外，矩阵中每格有4个相邻格子。
 * 从某一格开始，寻找相邻格子是否是路径中的下一字符，是则继续寻找下一字符，否则回溯到上一格。
 */
function hasPath(matrix, rows, cols, path) {
  let visited = [];
  let curPathLen = 0;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (hasPathProcess(matrix, rows, cols, path, row, col, curPathLen, visited)) {
        return true;
      }
    }
  }
  return false;
}

function hasPathProcess(matrix, rows, cols, path, row, col, curPathLen, visited) {
  if (!path[curPathLen]) {
    return true;
  }
  let hasPath = false;
  if (row >= 0 && row < rows && col >= 0 && col < cols && matrix[row * cols + col] === path[curPathLen] && !visited[row * cols + col]) {
    visited[row * cols + col] = true;
    curPathLen++;
    hasPath = hasPathProcess(matrix, rows, cols, path, row + 1, col, curPathLen, visited)
              || hasPathProcess(matrix, rows, cols, path, row, col + 1, curPathLen, visited)
              || hasPathProcess(matrix, rows, cols, path, row - 1, col, curPathLen, visited)
              || hasPathProcess(matrix, rows, cols, path, row, col - 1, curPathLen, visited);
    if (!hasPath) {
      visited[row * cols + col] = false;
      curPathLen--;
    }
  }
  return hasPath;
}

let res = hasPath("ABCESFCSADEE", 3, 4, "ABCCED");
console.log(res);