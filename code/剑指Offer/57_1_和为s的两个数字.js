/**
 * 输入一个递增排序的数组和一个数字S，在数组中查找两个数，使得它们的和正好是S。
 * 如果有多对数字的和等于S，则输出任意一对即可。
 * 
 * 现在数组中选择则两个数字，如果它们的和等于S，就找到了要找的两个数字；
 * 如果和小于S，希望和可以再大一些，因为数组是排序的，因此可以选择较小的数字后面的数字；
 * 如果和大于S，希望和可以再小一些，因为数组是排序的，因此可以选择较大的数字前面的数字；
 * 重复以上过程直到找到和为S的两个数字。
 */

function findNumbersWithSum(array, sum) {
  if (!array || array.length < 2) {
    return [];
  }
  let l = 0;
  let r = array.length - 1;
  while(l < r) {
    let curSum = array[l] + array[r];
    if (curSum < sum) {
      l++;
    } else if (curSum > sum) {
      r--;
    } else {
      return [array[l], array[r]];
    }
  }
  return [];
}
