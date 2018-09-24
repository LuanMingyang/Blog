/**
 * 在数组中的两个数字，如果前面一个数字大于后面的数字，则这两个数字组成一个逆序对。
 * 输入一个数组，求出这个数组中的逆序对的总数。
 * 
 * 利用类似归并排序的思想。
 * 合并两个子数组并统计逆序对个数的过程：
 * 定义三个指针：
 * p1指向第一个子数组的最后一个数字
 * p2指向第二个子数组的最后一个数字
 * p3指向辅助数组的最后一个数字
 * 每次比较p1、p2两个指针指向的数字；
 * 如果第一个子数组中的数字大于第二个子数组中的数字，则存在逆序对，逆序对的个数等于第二个子数组中剩余数字的个数；
 * 如果第一个子数组中的数字小于或等于第二个子数组中的数字，则不存在逆序对；
 * 每次比较，都把较大的数字从后往前复制到辅助数组，确保辅助数组的数字是递增排序的；
 * 对应的指针向前移动一位，继续下一轮比较。
 */
function inversePairs(data) {
  if (!data || data.length < 2) {
    return 0;
  }
  return inversePairsCore(data, [...data], 0, data.length - 1);
}

function inversePairsCore(data, help, l, r) {
  if (l === r) {
    return 0;
  }
  let mid = l + ((r - l) >> 1);
  let left = inversePairsCore(help, data, l, mid); // 交换 data 与 help，确保合并子数组时，子数组是递增排序的
  let right = inversePairsCore(help, data, mid + 1, r);

  let count = 0;
  let p1 = mid, p2 = r, p3 = r;
  while (p1 >= l && p2 >= mid + 1) {
    if (data[p1] > data[p2]) {
      help[p3--] = data[p1--];
      count += p2 - mid;
    } else {
      help[p3--] = data[p2--];
    }
  }
  while (p1 >= l) {
    help[p3--] = data[p1--];
  }
  while (p2 >= mid + 1) {
    help[p3--] = data[p2--];
  }
  return left + right + count;
}
