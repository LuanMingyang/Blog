/**
 * 请实现一个函数，输入一个整数，输出该数二进制表示中1的个数。
 * 例如：
 * 9 表示成二进制是 1001，有2位是1，因此输入9，输出2。
 * 
 * 位运算：
 * 与（&）：0 & 0 = 0   0 & 1 = 0   1 & 0 = 0   1 & 1 = 1
 * 或（|）：0 | 0 = 0   0 | 1 = 1   1 | 0 = 1   1 | 1 = 1
 * 异或（^）：0 ^ 0 = 0   0 ^ 1 = 1   1 ^ 0 = 1   1 ^ 1 = 0
 * 左移（<<）：m << n表示把m左移n位，最左边n位被丢弃，右边补n个0。00001010 << 3 = 01010000
 * 右移（>>）：m >> n表示把m右移n位，最右边n位被丢弃，无符号数左边补n个0，有符号数补n个符号位。00001010 >> 3 = 00000001, 10001010 >> 2 = 11100010
 * 无符号右移（>>>）：m >>> n表示将m的二进制表示向右移n(< 32)位，最右边n位被丢弃，左边补n个0。10001010 >>> 2 = 00100010
 * 
 * 乘除法运算要比移位运算效率低得多，在实际编程中尽量使用移位运算代替乘除法。
 * 
 * 记住一个结论：
 * 把一个整数减1，再和原整数做与运算，得到的结果相当于把整数二进制表示中最右边的1变成0。
 * 
 * 相关题目：
 * （1）用一条语句判断一个整数是不是2的整数次方。
 * 一个整数如果是2的整数次方，那么它的二进制表示有且只有一位是1，其余所有位都是0。
 * （2）输入两个整数m和n，计算需要改变m的二进制表示中的多少位才能得到n。
 * 先求两个数的异或，统计异或结果中1的位数。
 */
function numberOf1(n) {
  let count = 0;
  while (n) {
    count++;
    n = n & (n - 1);
  }
  return count;
}

function isIntPowerOf2(n) {
  return !!n && !(n & (n - 1));
}

function diffBitCount(m, n) {
  let count = 0;
  let xor = m ^ n;
  while (xor) {
    count++;
    xor = xor & (xor - 1);
  }
  return count;
}

function test() {
  let testCase = [0, 1, 0x7FFFFFFF, 0x80000000, 0xFFFFFFFF];
  testCase.forEach(n => console.log(numberOf1(n)));
}

test();
