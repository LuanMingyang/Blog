/**
 * 给定一个浮点数base和整数exponent。求base的exponent次方。
 * 不得使用库函数。不需要考虑大数问题。
 * 
 * 注意考虑代码的完整性：
 * 1）是否完成了基本功能
 * 2）输入边界值是否能得到正确的输出
 * 3）是否对各种不合规范的非法输入做出了合理的错误处理
 * 
 * 需要考虑以下情况：
 * 1）exponent可能小于等于0
 * 3）当exponent小于0时，base可能等于0，需要进行错误处理
 * 
 * 采用快速幂方法，时间复杂度为 O(log₂N)，常规求幂方法为O(N)。
 * 快速幂原理参考：https://baike.baidu.com/item/%E5%BF%AB%E9%80%9F%E5%B9%82
 */
function power(base, exponent) {
  if (exponent < 0 && base === 0) {
    // throw new Error('error');
    return Infinity;
  }
  let result = 1;
  let n = exponent > 0 ? exponent : -exponent;
  while (n) {
    if (n & 1) {
      result *= base;
    }
    base *= base;
    n >>= 1;
  }
  return exponent > 0 ? result : 1 / result;
}

function test() {
  let testCase = [
    [0, 0],
    [5, 0],
    [-5, 0],
    [0, 2],
    [0, -2],
    [5, 2],
    [5, -2],
    [-2, 3],
  ];
  testCase.forEach(item => console.log(power(item[0], item[1])));
  testCase.forEach(item => console.log(Math.pow(item[0], item[1])));
}

test();
