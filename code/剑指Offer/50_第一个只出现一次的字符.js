/**
 * 在字符串(全部由字母组成)中找出第一个只出现一次的字符，并返回它的位置，如果没有则返回 -1（需要区分大小写）。
 */
function firstNotRepeatingChar(str) {
  if (!str) {
    return -1;
  }
  let map = {};
  for (let i = 0; i < str.length; i++) {
    if(!map[str[i]]) {
      map[str[i]] = 1;
    } else {
      map[str[i]]++;
    }
  }
  for (let key in map) {
    if (map[key] === 1) {
      return str.indexOf(key);
    }
  }
  return -1;
}
