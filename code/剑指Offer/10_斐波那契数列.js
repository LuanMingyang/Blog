/**
 * 斐波那契数列定义：
 *           0                 n = 0
 * f(n) = ｛ 1                 n = 1
 *           f(n-1) + f(n-2)   n > 1
 * 
 * 题目一：求斐波那契数列的第 n 项
 * 解析：
 * 递归存在大量重复计算，为避免重复计算，从下往上计算，把已经得到的数列中间项保存起来：
 * 根据 f(0) 和 f(1) 计算出 f(2) ，再根据 f(1) 和 f(2) 计算出 f(3)......
 * 以此类推算出第 n 项
 * 时间复杂度为 O(N)
 * 
 * 题目二：青蛙跳台阶问题
 * 一只青蛙一次可以跳上1级台阶，也可以跳上2级台阶。
 * 求该青蛙跳上一个 n 级的台阶总共有多少种跳法。
 * 解析：
 * 先考虑简单情况，只有1级台阶，只有一种跳法；有2级台阶，可分两次跳，每次跳1级，或者一次跳2级。
 * 一般情况，把 n 级台阶时的跳法看成n的函数，记为 f(n)；
 * 当 n > 2 时，每一次跳时有两种不同的选择：
 * 1) 只跳1级，此时跳法数目等于后面剩下的 n-1 级台阶的跳法数目，即 f(n-1);
 * 2) 跳2级，此时跳法数目等于后面剩下的 n-2 级台阶的跳法数目，即 f(n-2);
 * 因此，n 级台阶的不同跳法总数 f(n) = f(n-1) + f(n-2)
 * 实际上就是斐波那契数列
 * 
 * 题目二变形：变态跳台阶
 * 一只青蛙一次可以跳上1级台阶，也可以跳上2级……它也可以跳上n级。
 * 求该青蛙跳上一个n级的台阶总共有多少种跳法。
 * n 级台阶的不同跳法总数     f(n) = f(n-1) + f(n-2) + f(n-3) + ... + f(1)   ①
 * n-1 级台阶的不同跳法总数 f(n-1) =          f(n-2) + f(n-3) + ... + f(1)   ②
 * ① - ②得：f(n) - f(n-1) = f(n-1) 即 f(n) = 2f(n-1)
 * 
 * 题目三：使用 2×1 的小矩阵横着或者竖着去覆盖更大的矩阵。
 * 请问用 8 个 2×1 的小矩阵无重叠的覆盖一个 2×8 的大矩阵，总共有多少种方法？
 * 
 *  □   □□□□□□□□
 *  □   □□□□□□□□
 * 2×1    2×8
 * 
 * 解析：
 * 把 2×8 的覆盖方法记为 f(8)
 * 有两种选择：横着放或者竖着放
 * 1) 竖着放时，右边还剩下 2×7 的区域，此时覆盖方法为 f(7)
 * 2) 横着放时，当 2×1 的小矩阵横着放在左上角时，左下角必须横着放一个 2×1 的小矩阵，右边还剩下 2×6 的区域，此时覆盖方法为 f(6)
 * 因此，f(8) = f(7) + f(6)
 * 仍然是斐波那契数列
 */
function fibonacci(n) {
  if (n < 2) {
    return n;
  }
  let fibNMinus1 = 1;
  let fibNMinus2 = 0;
  let fibN = 0;
  for (let i = 2; i <= n; i++) {
    fibN = fibNMinus1 + fibNMinus2;
    fibNMinus2 = fibNMinus1;
    fibNMinus1 = fibN;
  }
  return fibN;
}

// 跳台阶
function jumpFloor(number)
{
  if (number <= 2) {
    return number;
  }
  let fibNMinus1 = 2;
  let fibNMinus2 = 1;
  let fibN = 0;
  for (let i = 3; i <= number; i++) {
    fibN = fibNMinus1 + fibNMinus2;
    fibNMinus2 = fibNMinus1;
    fibNMinus1 = fibN;
  }
  return fibN;
}

// 变态跳台阶
function jumpFloorII(number)
{
  if (number <= 1) {
    return number;
  }
  let fibN = 1;
  for (let i = 2; i <= number; i++) {
    fibN *= 2;
  }
  return fibN;
}

// 矩形覆盖
function rectCover(number)
{
  if (number <= 2) {
    return number;
  }
  let fibNMinus1 = 2;
  let fibNMinus2 = 1;
  let fibN = 0;
  for (let i = 3; i <= number; i++) {
    fibN = fibNMinus1 + fibNMinus2;
    fibNMinus2 = fibNMinus1;
    fibNMinus1 = fibN;
  }
  return fibN;
}