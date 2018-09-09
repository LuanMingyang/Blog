/**
 * 请实现一个函数用来匹配包括'.'和'*'的正则表达式。
 * 模式中的字符'.'表示任意一个字符，而'*'表示它前面的字符可以出现任意次（包含0次）。
 * 在本题中，匹配是指字符串的所有字符匹配整个模式。
 * 例如：字符串"aaa"与模式"a.a"和"ab*ac*a"匹配，但是与"aa.a"和"ab*a"均不匹配。
 * 
 * 每次从字符串里拿出一个字符和模式中的字符去匹配：
 * 1. 模式中的字符是'.'，则可以匹配字符串中的任意字符；
 * 2. 模式中的字符不是'.'，字符串中的字符与模式中的字符相等，则可以匹配；
 * 3. 模式中的第二个字符为'*'：
 *    3.1 字符串中的字符与模式中的第一个字符不相等，则模式向后移动两个字符，即忽略'*'和它前一个字符；
 *    3.2 字符串中的字符与模式中的第一个字符相等：
 *        3.2.1 模式向后移动两个字符
 *        3.2.2 模式保持不变
 */
function match(str, pattern) {
  if (str == null && pattern == null) {
    return false;
  }
  return matchProcess(str, pattern, str.length, pattern.length, 0, 0);
}

function matchProcess(str, pattern, sLen, pLen, sIndex, pIndex) {
  if (sIndex >= sLen && pIndex >= pLen) {
    return true;
  }
  if (sIndex < sLen && pIndex >= pLen) {
    return false;
  }

  if (pattern[pIndex + 1] === '*') {
    if ((pattern[pIndex] === '.' && sIndex < sLen) || str[sIndex] === pattern[pIndex]) {
      return matchProcess(str, pattern, sLen, pLen, sIndex + 1, pIndex)
             || matchProcess(str, pattern, sLen, pLen, sIndex + 1, pIndex + 2)
             || matchProcess(str, pattern, sLen, pLen, sIndex, pIndex + 2);
    }
    return matchProcess(str, pattern, sLen, pLen, sIndex, pIndex + 2);
  }
  if ((pattern[pIndex] === '.' && sIndex < sLen) || str[sIndex] === pattern[pIndex]) {
    return matchProcess(str, pattern, sLen, pLen, sIndex + 1, pIndex + 1);
  }
  return false;
}
