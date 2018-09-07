/**
 * 输入数字n，按顺序打印出从1到最大的n位十进制数。
 * 比如输入3，则打印1、2、3一直到最大的3位数999。
 * 
 * 由于题目并没有规定n的范围，当输入n很大时，可能会溢出。
 * 因此需要考虑大数问题。
 * 字符串是一种简单、有效地表示大数的方法。
 * 
 * 方案一：在字符串上做加法
 * 方案二：转换为数字排列问题。n位所有十进制数其实就是n个从0到9的全排列，把数字的每一位都从0到9排列一遍，就得到了所有的十进制数。
 */
function printToMaxOfNDigits(n) {
  if (n <= 0) {
    return;
  }
  let number = [];
  for (let i = 0; i < 10; i++) {
    number[0] = i;
    process(number, n, 0);
  }
}

function process(number, n, index) {
  if (index === n - 1) {
    console.log(Number(number.join('')));
    return;
  }
  for (let i = 0; i < 10; i++) {
    number[index + 1] = i;
    process(number, n, index + 1);
  }
}
