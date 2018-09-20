/**
 * 数字以 0123456789101112131415…… 的格式序列化到一个字符序列中。
 * 在这个序列中，第5位（从0开始计数）是5，第13位是1，第19位是4。
 * 请写一个函数，求任意第n位对应的数字。
 */
function digitAtIndex(index) {
  if (index < 0) {
    return -1;
  }
  let digits = 1;
  while (true) {
    let count = digits === 1 ? 10 : 9 * Math.pow(10, digits - 1);
    if (index < count) {
      let startNum = digits === 1 ? 0 : Math.pow(10, digits - 1);
      let num = startNum + ~~(index / digits);
      for (let i = 1, end = digits - index % digits; i < end; i++) {
        num = ~~(num / 10);
      }
      return num;
    }
    index -= digits * count;
    digits++;
  }
}
