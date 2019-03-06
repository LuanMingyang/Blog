/**
 * 在一个数组中除一个数字只出现一次之外，其他数字都出现了三次。请找出那个只出现一次的数字。
 * 
 * 如果一个数字出现三次，那么它的二进制表示的每一位（0或1）也出现三次；
 * 如果把所有出现三次的数字的二进制表示的每一位都分别加起来，那么每一位的和都能被3整除；
 * 把数组中所有数字的二进制表示的每一位都加起来，如果某一位能被3整除，那么这个只出现一次的数字二进制表示中对应的那一位是0，否则就是1。
 */

function findNumberAppearOnce(numbers) {
  if (!numbers || numbers.length < 2) {
    return;
  }

  let bitSum = [];
  for (let i = 0; i < numbers.length; i++) {
    let num = numbers[i];
    let j = 0;
    while (num) {
      bitSum[j] = bitSum[j] > 0 ? bitSum[j] + (num & 1) : num & 1;
      j++;
      num >>= 1;
    }
  }

  let res = 0;
  for (let i = bitSum.length - 1; i >= 0; i--) {
    res <<= 1;
    res += bitSum[i] % 3;
  }

  return res;
}

// https://leetcode-cn.com/problems/single-number-ii/comments/21329
function findNumberAppearOnce2(numbers) {
  if (!numbers || numbers.length < 2) {
    return;
  }

  let x = 0, y = 0;
  numbers.forEach(n => {
    x = (x ^ n) & ~y;
    y = (y ^ n) & ~x;
  });

  return x;
}
