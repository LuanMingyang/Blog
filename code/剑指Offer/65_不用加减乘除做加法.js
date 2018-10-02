/**
 * 写一个函数，求两个整数之和，要求在函数体内不得使用“+”、“-”、“×”、“÷”四则运算符号。
 * 
 * 解题思路：
 * 不能使用四则运算符号，因此想到使用位运算
 * 
 * 加法实际上分为三步，以 5+17=22 为例：
 * 1）第一步只做各位相加不进位 5+17 = 12
 * 2）计算进位 5+7 有进位，进位值为10
 * 3）加上进位 12+10=22
 * 
 * 5的二进制表示：101，17的二进制表示：10001
 * 位运算也分为三步：
 * 1）第一步只做各位相加不进位：101 ^ 10001 = 10100
 * 2）计算进位：(101 & 10001) << 1 = 10
 * 3）加上进位：10100 ^ 10 = 10110 得到结果即为22
 */
function add(num1, num2) {
  let sum, carry;
  while (num2 !== 0) {
    sum = num1 ^ num2;
    carry = (num1 & num2) << 1;
    num1 = sum;
    num2 = carry;
  }
  return num1;
}