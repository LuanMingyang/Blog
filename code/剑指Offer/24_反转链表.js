/**
 * 定义一个函数，输入一个链表的头结点，反转该链表并输出反转后链表的头结点。
 * 
 * function ListNode(x) {
 *   this.val = x;
 *   this.next = null;
 * }
 * 
 * 在调整某一节点时，除了要知道后一个节点，还要知道前一个节点，防止链表断开。
 */
function reverseList(pHead) {
  let pPrev = null;
  let pNext = null;
  while (pHead) {
    pNext = pHead.next;
    pHead.next = pPrev;
    pPrev = pHead;
    pHead = pNext;
  }
  return pPrev;
}
