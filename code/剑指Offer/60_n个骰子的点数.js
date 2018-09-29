/**
 * 把n骰子扔在地上，所有骰子朝上一面的点数之和为s。输入n，打印出s的所有可能的值的出现概率。
 * 
 * 解法一：
 * n个骰子的点数和最小值为n，最大值为6n。
 * 因此可以先统计出每个点数和出现的次数，再除以所有点数的排列数6^n。
 * 先把n个骰子分为两组：第一组只有1个，第二组有n-1个，第一个骰子1~6每个点数与剩下的n-1个骰子计算点数和；
 * 接着n-1个骰子分为两组：第一组只有1个，第二组有n-2个，把上一轮的点数和与当前骰子点数相加，再和剩下的n-2个骰子计算点数和；
 * 递归上述过程，直到只剩下一个骰子。
 * 定义一个长度为6n-n+1的数组，将和为s的点数出现的次数保存到数组的第s-n个元素里。
 * 解法二：
 * 可以考虑用两个数组来存储骰子点数的没个总数出现的次数。
 * 在一轮循环中，第一个数组中的第n个数字表示为骰子和为n出现的次数；
 * 在下一轮循环中，加上一个新的骰子，此时和n出现的次数应该等于上一轮循环中骰子点数和为n-1、n-2、n-3、n-4、n-5与n-6的次数的总和；
 * 因此把第二个数组的第n个数字设置为前一个数组对应的第n-1、n-2、n-3、n-4、n-5与n-6个数字之和。
 */

function printProbability(number) {
  if (number < 1) {
    return 0;
  }
  let counts = Array(2);
  counts[0] = Array(6 * number + 1).fill(0);
  counts[1] = Array(6 * number + 1).fill(0);
  let flag = 0;
  for (let i = 1; i <= 6; i++) {
    counts[flag][i] = 1;
  }
  for (let i = 2; i <= number; i++) {
    for (let j = 0; j <= 6 * i; j++) {
      counts[1 - flag][j] = 0;
      if (j >= i) {
        for (let k = 1; k <= j && k <= 6; k++) {
          counts[1 - flag][j] += counts[flag][j - k];;
        }
      }
    }
    flag = 1 - flag;
  }
  let res = [];
  let totalCount = Math.pow(6, number);
  for (let i = number; i <= 6 * number; i++) {
    let ratio = (counts[flag][i] / totalCount).toFixed(5);
    res.push(ratio);
  }
  return res;
}
