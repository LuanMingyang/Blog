/**
 * 把只包含质因子2、3和5的数称作丑数（Ugly Number）。求从小到大的第N个丑数。
 * 习惯上我们把1当做是第一个丑数。
 * 例如6、8都是丑数，但14不是，因为它包含质因子7。
 * 
 * 解法一：
 * 暴力法，逐个判断，直观但不够高效
 * 解法二：
 * 动态规划，创建数组保存已经找到的丑数，通过前面的丑数，生成后面的丑数。空间换时间。
 * 一个丑数应该是另一个丑数乘以2、3或者5得到的。
 * 假设数组里已经有若干个排好序的丑数，并把已有最大的丑数记做M；
 * 对于2、3、5每个数而言都一定存在一个已有丑数Tn（n=2,3,5），使得 Tn 之前的所有丑数乘以n都小于M，之后的所有丑数乘以n都大于M；
 * 记下T2、T3、T5，下一个丑数应该是 min(T2*2, T3*3, T5*5)；
 * 每次生成新的丑数时更新对应的Tn。
 */
function getUglyNumber_Solution1(index) {
  if (index <= 0) {
    return 0;
  }
  let num = 0;
  let uglyCount = 0;
  while (uglyCount < index) {
    num++;
    if (isUgly(num)) {
      uglyCount++;
    }
  }
  return num;
}

function isUgly(num) {
  while (num % 2 === 0) {
    num /= 2;
  }
  while (num % 3 === 0) {
    num /= 3;
  }
  while (num % 5 === 0) {
    num /= 5;
  }
  return num === 1;
}

function getUglyNumber_Solution2(index) {
  if (index <= 0) {
    return;
  }
  let uglyNums = [1];
  let nextUglyIndex = 1;
  let t2Index = 0, t3Index = 0, t5Index = 0;
  while (nextUglyIndex < index) {
    let min = Math.min(uglyNums[t2Index] * 2, uglyNums[t3Index] * 3, uglyNums[t5Index] * 5);
    uglyNums[nextUglyIndex++] = min;
    if (uglyNums[t2Index] * 2 === min) {
      t2Index++;
    }
    if (uglyNums[t3Index] * 3 === min) {
      t3Index++;
    }
    if (uglyNums[t5Index] * 5 === min) {
      t5Index++;
    }
  }
  return uglyNums[index - 1];
}
