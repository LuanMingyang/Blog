/**
 * 输入一个整数数组，实现一个函数来调整该数组中数字的顺序。
 * 使得所有的奇数位于数组的前半部分，所有的偶数位于数组的后半部分。
 * 并保证奇数和奇数，偶数和偶数之间的相对位置不变。
 * 
 * 要保持稳定性，因此需要记录奇数的数量。
 */
function reOrderArray(arr) {
  let newArr = [];
  let eventCount = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] & 1) {
      newArr.splice(eventCount++, 0, arr[i]);
    } else {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}
