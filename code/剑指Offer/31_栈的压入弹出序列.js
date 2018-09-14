/**
 * 输入两个整数序列，第一个序列表示栈的压入顺序，请判断第二个序列是否为该栈的弹出顺序。
 * 假设压入栈的所有数字均不相等。
 * 例如：序列1,2,3,4,5是某栈的压入顺序，序列4,5,3,2,1是该压栈序列对应的一个弹出序列，但4,3,5,1,2就不可能是该压栈序列的弹出序列。
 * 
 * 建立一个辅助栈。
 * 当辅助栈栈顶的值等于下一个要弹出的值，则直接弹出；
 * 否则，将还未压入辅助栈中的值压入辅助栈，直到把下一个需要弹出的数字压入辅助栈栈顶为止；
 * 如果所有值值都已经压入辅助栈仍未找到下一个要弹出的值，那么不是弹出序列。
 */
function isPopOrder(pushV, popV) {
  if (!pushV || !pushV) {
    return false;
  }
  let stack = [];
  while (stack.length > 0 || pushV.length > 0) {
    while (stack.length > 0 && stack[stack.length - 1] === popV[0]) {
      stack.pop();
      popV.shift();
    } 
    if (popV.length === 0) {
      return true;
    }
    if (pushV.length === 0) {
      break;
    }
    stack.push(pushV.shift());
  }
  return false;
}
