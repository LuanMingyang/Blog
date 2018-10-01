/**
 * 假设把某股票的价格按照时间先后顺序存储在数组中，请问买卖该股票一次可能获得的最大利润是多少？
 * 例如：一只股票在某些时间节点的价格为[9,11,8,5,7,12,16,14]，如果能在价格为5的时候买入并在价格为16时卖出，则能收获最大利润11。
 * 
 * 定义diff(i)为当卖出价为数组中第i个数字时可能获得的最大利润；
 * 在扫描到数组中的第i个数字时，只要记住之前的i-1个数字中的最小值，就能算出在当前价位卖出时可能得到的最大利润。
 */

function maxDiff(numbers) {
  if (!numbers || numbers.length < 2) {
    return 0;
  }
  let diff = 0;
  let min = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    diff = Math.max(diff, numbers[i] - min);
    min = Math.min(min, numbers[i]);
  }
  return diff;
}
