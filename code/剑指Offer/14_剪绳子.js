/**
 * 给你一根长度为n的绳子，请把绳子剪成m段（m、n都是整数，n>1且m>1），并且每段绳子的长度记为k[0],k[1],···,k[m-1]。
 * 请问k[0]×k[1]×···×k[m-1]可能的最大乘积是多少？
 * 例如：
 * 当绳子长度是8时，我们把它剪成长度分别为2、3、3的三段，此时得到最大乘积18。
 * 
 * 
 * 动态规划：
 * 如果是求一个问题的最优解（通常是求最大值或最小值），而且该问题能够分解成若干个子问题，并且子问题之间还有重叠的更小的子问题，就可以考虑用动态规划来解决。
 * 动态规划的特点：
 * 1）求一个问题的最优解
 * 2）整体问题的最优解依赖于各个问题的最优解
 * 3）大问题分解成小问题，小问题之间还有相互重叠的更小的子问题
 * 4）从上往下分析问题，从下往上求解问题
 * 
 * 贪心算法：
 * 应用动态规划时，每一步都可能面临若干个选择。
 * 而应用贪心算法时，每一步都可以做出一个贪心的选择，基于这个选择，确定能够得到最优解。
 * 
 * 应用动态规划求解（maxProductAfterCutting_1）:
 * 定义f(n)为把长度为n的绳子剪成若干段后各段长度成绩的最大值。
 * 剪第一刀，有 n-1 种选择，即剪出来的第一段绳子长度 i 可能为 1 ~ n-1。
 * 因此 f(n) = max(f(i)*f(n-i)), 0 < i < n
 * 这是一个从上到下的递归，会有很多重复计算，因此真正求解时按照从下往上的顺序计算。
 * 由题意可知：
 * n < 2时，f(n) = 0,
 * n >= 2时：
 * f(2) = 1;
 * f(3) = 2;
 * f(4) = max{f(1)f(3), f(2)f(2)}
 * f(5) = max{f(1)f(4), f(2)f(3)}
 * ...
 * f(n) = max{f(1)f(n-1), f(2)f(n-2), f(3)f(n-3), ..., f(i)(fn-i), ...}
 * 
 * 应用贪心算法求解（maxProductAfterCutting_2）:
 * 按照如下贪心策略，得到的各段绳子的长度的乘积将最大：
 * 尽可能多地剪长度为3的绳子，长度可能余1或2；
 * 若最后长度余1，则少剪一次长度3，因为 4 剪成 2*2 > 3*1
 */
function maxProductAfterCutting_1(length) {
  if (length < 2) {
    return 0;
  }
  if (length === 2) {
    return 1;
  }
  if (length === 3) {
    return 2;
  }

  // 表示 max(i, 长度为i时剪成若干段各段长度最大的乘积)（即自身长度与乘积最大值中的较大值）
  // 实际上只有在，i<=3 时，才会出现 i > 乘积最大值 的情况，i>3，即表示乘积最大值
  let products = [0, 1, 2, 3];
  let max = 0;
  for (let i = 4; i <= length; i++) {
    max = 0;
    for (let j = 1; j <= i / 2; j++) {
      let product = products[j] * products[i - j];
      max = product > max ? product : max;
      products[i] = max;
    }
  }
  return products[length];
}

function maxProductAfterCutting_2(length) {
  if (length < 2) {
    return 0;
  }
  if (length === 2) {
    return 1;
  }
  if (length === 3) {
    return 2;
  }
  let times3 = (length / 3) >>> 0;
  if (length - times3 * 3 === 1) {
    times3--;
  }
  let times2 = (length - times3 * 3) >> 1;
  return Math.pow(3, times3) * Math.pow(2, times2);
}

function test() {
  let testCase = [1, 2, 3, 4, 5, 8];
  testCase.forEach(n => console.log(maxProductAfterCutting_1(n)));
  testCase.forEach(n => console.log(maxProductAfterCutting_2(n)));
}

test();
