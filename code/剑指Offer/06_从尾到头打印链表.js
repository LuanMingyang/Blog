/**
 * 输入一个链表，按链表值从尾到头的顺序返回一个ArrayList。
 * 
 * function ListNode(x) {
 *   this.val = x;
 *   this.next = null;
 * }
 * 
 * 思路：利用栈，从头结点开始遍历压入栈中，再依次从栈中弹出即为逆序。
 * 
 * 利用 JavaScript 中数组可以从头部压入的特性，进行改写。
 */

function printListFromTailToHead(head) {
  let stack = [];
  while (head) {
    stack.push(head.val);
    head = head.next;
  }
  let arr = [];
  while (stack.length) {
    arr.push(stack.pop());
  }
  return arr;
}

function printListFromTailToHead(head) {
  let arr = [];
  while (head) {
    arr.unshift(head.val);
    head = head.next;
  }
  return arr;
}
