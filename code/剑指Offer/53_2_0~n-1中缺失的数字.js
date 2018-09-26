/**
 * 一个长度为n-1的递增排序数组中的所有数字都是唯一的，并且每个数字都在范围0~n-1之内。
 * 在范围0~n-1内的n个数字中有且只有一个数字不在该数组中，请找出这个数字。
 * 
 * 
 * 解法一：
 * 求出0~n-1所有数字的和，减去数组中所有数字的和，差即为不在数组中的数字。
 * 时间复杂度O(N)
 * 解法二：
 * 因为数组是排序的，因此以不在数组中的数字为分割，前半部分数组，下标与数字相等，后半部分数组，下标比数字小一。
 * 利用二分查找解决。
 */
function getMissingNumber(numbers, length) {
  if (!numbers || numbers.length <= 0) {
    return -1;
  }

  let l = 0;
  let r = length - 1;
  let mid;
  while (l <= r) {
    mid = l + ((r - l) >> 1);
    if (numbers[mid] === mid) {
      l = mid + 1;
    } else {
      // mid === 0 处理缺数数字位于开始的情况
      if ((mid > 0 && numbers[mid - 1] === mid - 1) || mid === 0) {
        return mid;
      }
      r = mid - 1;
    }
  }

  if (l === length) { // 处理缺数数字位于末尾的情况
    return length;
  }

  return -1;
}
