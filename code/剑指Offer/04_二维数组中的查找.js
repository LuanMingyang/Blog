/**
 * 在一个二维数组中（每个一维数组的长度相同），每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。
 * 请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。
 * 
 * 例如：输入如下数组，若查找7，则返回true；若查找5，则返回false
 * 1   2   8   9
 * 2   4   9   12
 * 4   7   10  13
 * 6   8   11  15
 * 
 * 解题思路：
 * 注意题目中指出：每一行每一列都是排好序的。
 * 1）从右上角开始进行比较；
 * 2）若比目标数组大，则说明这一列都比目标数字大，不可能存在相等，因此列减一；
 * 3）若比目标数字小，则说明这一行都比目标数字小，不可能存在相等，因此行加一；
 * 4）若等于目标数字，则直接返回true。
 */

function find(matrix, num) {
  let row = 0;
  let col = matrix[0].length - 1;

  while (row < matrix.length && col >= 0) {
    if (matrix[row][col] === num) {
      return true;
    } else if (matrix[row][col] > num) {
      col--;
    } else {
      row++;
    }
  }
  return false;
}