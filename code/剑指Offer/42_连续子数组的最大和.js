/**
 * 输入一个整型数组，数组里有正数也有负数。数组中的一个或连续多个整数组成一个子数组。
 * 求所有子数组的和的最大值。要求时间复杂度为O(N)。
 * 
 * 
 * 当当前累加和<=0时，若继续累加下一个数字，累加和会比下一个数字还要小，因此此时将之前的累加和抛弃，从下一个数字开始重新累加；
 * 当当前累加和>0时，继续累加下一个数；
 * 每累加一个数，判断当前累加和是否比最大和还要大，是则更新最大和的值。
 * 
 * 动态规划：
 * f(i)表示第i个数字结尾的子数组的最大和，max(f(i))即为要求的最大和
 *           arr[i]             i === 0 || f(i-1) <= 0
 * f(i) = {
 *           f(i - 1) + arr[i]  i !== 0 || f(i-1) > 0
 */
function greatestSumOfSubarrays(arr) {
  if (!arr || arr.length === 0) {
    return 0;
  }
  let curSum = 0;
  let greatestSum = -Infinity;
  for (let i = 0; i < arr.length; i++) {
    if (curSum <= 0) {
      curSum = arr[i];
    } else {
      curSum += arr[i];
    }
    greatestSum = curSum > greatestSum ? curSum : greatestSum;
  }
  return greatestSum;
}
