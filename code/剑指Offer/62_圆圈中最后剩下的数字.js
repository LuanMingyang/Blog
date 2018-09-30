/**
 * 0,1,...,n-1这n个数字排成一个圆圈，从数字0开始，每次从这个圆圈里删除第m个数字。
 * 求出这个圆圈里剩下的最后一个数字。
 * 
 * 解法一：
 * 用环形链表模拟圆圈
 * 解法二：
 * 分析每次被删除的数字的规律并直接计算出圆圈中最后剩下的数字
 */

function lastRemaining_Solution(n, m) {
  if (n <= 0 || m <= 0) {
    return -1;
  }
  let nums = Array.from({ length: n }, (v, i) => i);
  let del = 0;
  while (nums.length > 1) {
    del = (del + m - 1) % nums.length;
    nums.splice(del, 1);
  }
  return nums[0];
}
