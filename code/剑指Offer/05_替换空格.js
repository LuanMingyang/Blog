/**
 * 请实现一个函数，将一个字符串中的每个空格替换成“%20”。
 * 例如，当字符串为We Are Happy.则经过替换之后的字符串为We%20Are%20Happy。
 * 
 * replace() 方法返回一个新字符串，原字符串不会改变。
 */

function replaceSpace(str) {
  return str.replace(/\s/g, '%20');
}
