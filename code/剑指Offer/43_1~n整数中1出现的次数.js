/**
 * 输入一个整数n，求1~n这n个整数的十进制表示中1出现的次数。
 * 例如：输入12，1~12这些整数中包含1的数字有1、10、11和12，1一共出现了5次。
 */
function numberOf1Between1AndN_Solution1(n) {
  if (n < 1) {
    return 0;
  }
  let count = 0;
  let numStr = `${n}`;
  let first = numStr[0];
  let len = numStr.length;
  if (+first > 1) {
    count += Math.pow(10, len - 1);
  } else if (+first === 1) {
    count += Number(numStr.slice(1)) + 1;
  }
  count += first * (len - 1) * Math.pow(10, len - 2);
  count += numberOf1Between1AndN_Solution(Number(numStr.slice(1)));
  return count;
}

function numberOf1Between1AndN_Solution2(n) {
  let count = 0;
  for (let i = 1; i <= n; i *= 10) {
    let temp = ~~(n / i);
    count += ~~((temp + 8) / 10) * i + (temp % 10 == 1) * (n % i + 1);
  }
  return count;
}
