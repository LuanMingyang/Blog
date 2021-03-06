/**
 * 给定一个数组和滑动窗口的大小，找出所有滑动窗口里数值的最大值。
 * 例如：如果输入数组[2,3,4,2,6,2,5,1]及滑动窗口的大小3，那么一共存在6个滑动窗口，他们的最大值分别为[4,4,6,6,6,5]。
 * 
 * 解法一：
 * 一个滑动窗口可以看成一个队列；
 * 当窗口滑动时，窗口的第一个数字被删除，同时在窗口的末尾添加一个新的数字；
 * 每次保存队列的最大值(实现类似于 30_包含min函数的栈)。
 * 解法二：
 * 不把滑动窗口的每个值都存入队列，而是只把有可能成为滑动窗口最大值的数值存入一个两开口的队列；
 * 以输入数组[2,3,4,2,6,2,5,1]为例：
 * 2：存入队列
 * 3：比2大，因此2不可能是滑动窗口的最大值，把2从队列删除，3存入队列
 * 4：比3大，因此3不可能是滑动窗口的最大值，把3从队列删除，4存入队列
 * 2：比4小，当4滑出窗口后有可能成为最大值，2存入队列
 * 6：比4、2都大，因此4、2不可能是滑动窗口的最大值，把4、2从队列删除，6存入队列
 * 2：比6小，当6滑出窗口后有可能成为最大值，2存入队列
 * 5：比6小，比2大，因此2不可能是滑动窗口的最大值，把2从队尾删除，5存入队列
 * 1：注意到队头的6是数组的第5个数字，此时的滑动窗口已经不包含这个数字了，因此应该把6删除；
 *    为了知道滑动窗口是否包含一个数字，应该在队列里存入数字在数组中的下标，而不是数字；
 *    当一个数字的下标与当前处理的数字的下标之差大于或等于滑动窗口大小时，这个数字已经从滑动窗口中滑出，可以从队列中删除。
 *    1比5小，存入队列。
 */

function maxInWindows(num, size) {
  if (!num || size <= 0 || num.length < size ) {
    return [];
  }
  let maxNumIndex = [];
  let res = [];
  for(let i = 0; i < num.length; i++) {
    if (maxNumIndex.length > 0 && i - maxNumIndex[0] >= size) {
      maxNumIndex.shift();
    }
    maxNumIndex = maxNumIndex.filter(item => num[item] > num[i]);
    maxNumIndex.push(i);
    res.push(num[maxNumIndex[0]]);
  }
  return res.slice(size - 1);
}
