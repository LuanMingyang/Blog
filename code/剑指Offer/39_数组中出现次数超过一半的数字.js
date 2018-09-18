/**
 * 数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。
 * 例如：输入一个长度为9的数组{1,2,3,2,2,2,5,4,2}，由于数字2在数组中出现了5次，超过数组长度的一半，因此输出2。如果不存在则输出0。
 * 
 * 解法一：基于partition函数 复杂度O(N) 会改变原数组
 * 如果有一个数出现的次数超过了数组长度的一半，那么数组排序后，这个数字一定出现在数组中间位置，即中位数。
 * 基于partition函数，小的放左边，大的放右边；
 * 如果第一个不小于基数的数字的下标刚好是n/2，那么这个数字就是数组中位数；大于n/2，则在左边；小于n/2，则在右边。
 * 注意需要检查寻找出的数字出现的次数是否真的大于数组长度的一半。
 * 
 * 解法二：利用数组特点 复杂度O(N) 不会改变原数组
 * 数组中有一个数字出现的次数超过数组长度的一半，意味着它出现的次数比其他所有数字出现的次数的和还要多。
 * 因此，可以在遍历数组时保存两个值：一个是数组中的数字，一个是次数；
 * 当遍历到下一个数字时，如果下一个数字与保存的数字相同，则次数加一，不同，则次数减一；
 * 当次数为0时，保存下一个数字，并把次数设为1；
 * 最后一次把数字设为1时对应的数字即为要找的数字。
 * 注意也需要检查寻找出的数字出现的次数是否真的大于数组长度的一半。
 */

function moreThanHalfNum_Solution1(numbers) {
  if (numbers && numbers.length === 0) {
    return 0;
  }
  let mid = numbers.length >> 1;
  let l = 0;
  let r = numbers.length - 1;
  let index = partition(numbers, l, r);
  while (index !== mid) {
    if (index > mid) {
      r = index - 1;
      index = partition(numbers, l, r);
    } else {
      l = index + 1;
      index = partition(numbers, l, r);
    }
  }
  return check(numbers, numbers[mid]) ? numbers[mid] : 0;
}

function partition(arr, l, r) {
  let randomIndex = l + Math.floor(Math.random() * (r - l + 1));
  [arr[randomIndex], arr[r]] = [arr[r], arr[randomIndex]];
  let num = arr[l];

  while (l < r) {
    while (num <= arr[r] && l < r) {
      r--;
    }
    [arr[l], arr[r]] = [arr[r], arr[l]];
    while (num >= arr[l] && l < r) {
      l++;
    }
    [arr[l], arr[r]] = [arr[r], arr[l]];
  }
  return l;
}

function moreThanHalfNum_Solution2(numbers) {
  if (numbers && numbers.length === 0) {
    return 0;
  }
  let num = numbers[0];
  let count = 1;
  for (let i = 1; i < numbers.length; i++) {
    if (count === 0) {
      num = numbers[i];
      count = 1;
    } else if (numbers[i] === num) {
      count++;
    } else {
      count--;
    }
  }
  return check(numbers, num) ? num : 0;
}

// 检查num的出现次数是否大于数组长度的一半
function check(numbers, num) {
  let count = 0;
  numbers.forEach(item => {
    count += item === num;
  });
  return count * 2 > numbers.length;
}
