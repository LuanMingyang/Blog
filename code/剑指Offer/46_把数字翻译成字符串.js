/**
 * 给定一个数字，按照如下规则把它翻译为字符串：
 * 0翻译成'a'，1翻译成'b'，......，11翻译成'l'，......，25翻译成'z'。一个数字可能有多种翻译。
 * 例如：12258有5种不同的翻译，分别是'bccfi'、'bwfi'、'bczi'、'mcfi'、'mzi'。
 * 实现一个函数，用来计算一个数字有多少种不同的翻译方法。
 * 
 * 从第一位数字开始翻译，有两种选择：
 * 1）单独翻译第一位；
 * 2）与第二位数字一起翻译。
 * 可以按照递归的方法解决，但若从第一位开始递归，则会产生重复子问题；
 * 所以按照递归的思路自上而下分析，但实际自下而上解决问题，避免重复子问题。
 */
function getTranslationCount(number) {
  if (number < 0) {
    return 0;
  } else if (number < 10) {
    return 1;
  }
  let str = `${number}`;
  let len = str.length;
  let res = Array(len);
  let num = Number(str[len - 2] + '' + str[len - 1]);
  res[len - 1] = 1;
  res[len - 2] = num >= 10 && num <= 25 ? 2 : 1;
  for (let i = len - 3; i >= 0; i--) {
    num = Number(str[i] + '' + str[i + 1]);
    let signe = num >= 10 && num <= 25;
    res[i] = res[i + 1] + signe * res[i + 2];
  }
  return res[0];
}
