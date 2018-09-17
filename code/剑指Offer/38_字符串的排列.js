/**
 * 输入一个字符串，按字典序打印出该字符串中字符的所有排列。
 * 例如：输入字符串abc，则打印出由字符a,b,c所能排列出来的所有字符串abc、acb、bac、bca、cab和cba。
 * 输入字符串可能有字符重复，字符只包括大小写字母。
 * 
 * 将问题分解
 * 把一个字符串看成两部分组成：第一部分是第一个字符串，第二部分是剩下的所有字符。
 * 求整个字符串的排列，可以分为两步：
 * 1）求所有可能出现在第一个位置的字符，即把第一个字符和后面所有的字符交换；
 * 2）固定第一个字符，递归求后面所有字符的排列。
 */

function permutation(str) {
  if (!str) {
    return;
  }
  let res = [];
  let arr = str.split('');;
  permutationProcess(arr, 0, res);
  res = [...new Set(res)].sort();
  return res;
}

function permutationProcess(arr, index, res) {
  if (index >= arr.length) {
    res.push(arr.join(''));
  }
  
  for (let i = index; i < arr.length; i++) {
    [arr[i], arr[index]] = [arr[index], arr[i]];
    permutationProcess(arr, index + 1, res);
    [arr[i], arr[index]] = [arr[index], arr[i]];
  }
}
