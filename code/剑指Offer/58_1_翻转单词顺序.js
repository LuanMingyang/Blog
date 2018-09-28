/**
 * 输入一个英文句子，翻转句子中单词的顺序，但单词 内字符的顺序不变。为简单起见2，标点符号和普通字母一样处理。
 * 例如：输入字符串"I am a student."，则输出"student. a am I"。
 */

function reverseSentence(str) {
  return str.split(' ').reverse().join(' ');
}
