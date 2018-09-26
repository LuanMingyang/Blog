/**
 * 假设一个单调递增的数组里每个元素都是整数并且是唯一的。
 * 请实现一个函数，找出数组中任意一个数值等于其下标的元素。
 * 例如：在数组[-3, -1, 1, 3, 5]中，数字3和它的下标相等。
 * 
 * 因为数组是递增排序的，因此想到可以利用二分查找
 * 若当前数字大于下标，则说明右边的数字都大于下标，都可以忽略；
 * 若当前数字小于下标，则说明左边的数字都小于下标，都可以忽略。
 */
function getNumberSameAsIndex(numbers) {
  if (!numbers || numbers.length <= 0) {
    return -1;
  }

  let l = 0;
  let r = numbers.length - 1;
  let mid;
  while (l <= r) {
    mid = l + ((r - l) >> 1);
    if (numbers[mid] < mid) {
      l = mid + 1;
    } else if (numbers[mid] > mid) {
      r = mid - 1;
    } else { 
      return mid;
    }
  }

  return -1;
}
