/**
 * 输入一个正数S，打印出所有和为S的连续正数序列（至少含有两个数）。
 * 例如：输入15，由于 1+2+3+4+5 = 4+5+6 = 7+8 = 15，所以打印出3个连续序列 1~5、4~6、7~8
 * 
 * 用两个值small和big分别表示序列的最小值和最大值；
 * small初始化为1，big初始化为2；
 * 如果从small到big的序列和大于S，则可以从序列中去掉较小的值，也就是增大small；
 * 如果从small到big的序列和小于S，则可以让序列包含更多的值，也就是增大big；
 * 一直到small=(S+1)/2为止。
 */

function findContinuousSequence(sum) {
  if (sum < 3) {
    return [];
  }
  let res = [];
  let small = 1;
  let big = 2;
  let middle = (sum + 1) >> 1;
  while(small < middle) {
    let n = big - small + 1;
    let curSum = n * small + n * (n - 1) / 2;
    if (curSum < sum) {
      big++;
    } else if (curSum > sum) {
      small++;
    } else {
      res.push(Array.from({length: n}, (item, i) => i + small));
      big++;
    }
  }
  return res;
}

console.log(findContinuousSequence(15));
