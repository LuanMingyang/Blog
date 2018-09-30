/**
 * 从扑克牌中随机抽5张牌，判断是不是一个顺子，即这5张牌是不是连续的。
 * 2~10为数字本身，A为1，J为11，Q为12，K为13，而大、小王可以看成任意数字。
 * 
 * 大小王可以为任意数字，将其记为0,0可以填补数组中的空缺。
 * 判断五张牌是否为顺子，即判断五张牌的值是否是连续的。
 * 如果数组中的非0数字重复出现，则一定是不连续的；
 * 将数组排序，统计0的个数，统计排序后数组相邻元素之间的空缺总数；
 * 如果空缺的总数小于或等于0的个数，那么是连续的，反之不连续。
 */

function isContinuous(numbers) {
  if (!numbers || numbers.length <= 0) {
    return false;
  }
  let zeroCount = numbers.findIndex(num => num > 0);
  for (let i = zeroCount + 1; i < numbers.length; i++) {
    if (numbers[i] === numbers[i - 1]) {
      return false;
    } else {
      zeroCount -= numbers[i] - numbers[i - 1] - 1;
    }
  }
  return zeroCount >= 0;
}
