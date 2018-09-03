/**
 * 在一个长度为n的数组里的所有数字都在0到n-1的范围内。
 * 数组中某些数字是重复的，但不知道有几个数字是重复的，也不知道每个数字重复几次。
 * 请找出数组中任意一个重复的数字。
 * 例如，如果输入长度为7的数组{2,3,1,0,2,5,3}，那么对应的输出是重复的数字2或3。
 * 
 * 找到任意重复的一个值并赋值到duplication[0]
 * 函数返回 true/false
 * 
 */

/**
 * 最优解
 * 时间复杂度 O(N)，空间复杂度 O(1)
 * 
 * 利用题目特性：所有数字都在0到n-1的范围内。
 * 即若果没有重复的数字，排序后的数组中，数字 i 会出现在下标为 i 的位置。
 * 
 * 解题思路：
 * 1）扫描到下标为 i 的数字时，num = numbers[i]，比较 num 是否等于 i；
 * 2）若等于则继续扫描下一个数字；
 * 3）否则，num 与 numbers[num] 进行比较；
 * 4）若相等，则 num 为重复数字；
 * 5）否则，交换 numbers[i] 与 numbers[num]，num = numbers[num]，继续3）~5）
 */
function duplicate(numbers, duplication) {
  if (!numbers || numbers.length <= 1) {
    return false;
  }

  if (numbers.some(num => num < 0 || num > numbers.length - 1)) {
    return false;
  }

  for (let i = 0; i < numbers.length; i++) {
    while (numbers[i] !== i) {
      if (numbers[i] === numbers[numbers[i]]) {
        duplication[0] = numbers[i];
        return true;
      }

      let temp = numbers[i];
      [numbers[i], numbers[temp]] = [numbers[temp], numbers[i]];
    }
  }

  return false;
}

// 时间复杂度 O(N)，空间复杂度 O(N)，以空间换时间
function duplicate(numbers, duplication) {
  const map = {};
  for (let i = 0; i < numbers.length; i++) {
    if (map[numbers[i]]) {
      map[numbers[i]]++;
    } else {
      map[numbers[i]] = 1;
    }
  }
  for (let num in map) {
    if (map[num] > 1) {
      duplication[0] = num;
      return true;
    }
  }
  return false;
}
