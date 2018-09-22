/**
 * 请从字符串中找出一个最长的不包含重复字符的子字符串，计算该最长子字符串的长度。
 * 假设字符串只包含'a'~'z'的字符。
 * 例如：在字符串'arabcacfr'中，最长的 不含子字符串的字符串是'acfr'，长度为4。
 * 
 * 记录下当前子字符串，如果子字符串中包含下一个字符，则更新子字符串；
 * 每次计算子字符串的长度与最大子字符串长度的较大值保存。
 */
function longestSubstringWithoutDuplication(str) {
  let longest = 0;
  let substr = '';
  for (let i = 0, len = str.length; i < len; i++) {
    let index = substr.indexOf(str[i]);
    if (index > -1) {
      substr = substr.slice(index + 1);
    }
    substr += str[i];
    longest = Math.max(substr.length, longest);
  }
  return longest;
}
