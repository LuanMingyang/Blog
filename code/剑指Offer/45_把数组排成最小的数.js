/**
 * 输入一个正整数数组，把数组里所有数字拼接起来排成一个数，打印能拼接出的所有数字中最小的一个。
 * 例如：输入数组{3，32，321}，则打印出这三个数字能排成的最小数字为321323。
 * 
 * 定义一种排序规则：
 * 数字a和b，以字符串拼接成ab或ba；
 * 若 ab < ba，则认为a小于b，a应该排在b前；
 * 若 ba < ab，则认为b小于a，b应该排在a前；
 * 若 ab = ba，则认为a等于b。
 * 将数组按上述排序后，拼接，即得到了能拼接出的数字中最小的一个。
 */
function printMinNumber(numbers) {
  if (!numbers || numbers.length <= 0) {
    return '';
  }
  numbers.sort((a, b) => {
    return `${a}${b}` > `${b}${a}`
  });
  return numbers.join('');
}
