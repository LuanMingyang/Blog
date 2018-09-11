/**
 * 输入两个递增排序的链表，合并这两个链表并使新链表中的节点仍然是递增排序的。
 * 
 * function ListNode(x) {
 *   this.val = x;
 *   this.next = null;
 * }
 * 
 * 
 */
function merge(pHead1, pHead2) {
  if (!pHead1) {
    return pHead2;
  } else if (!pHead2) {
    return pHead1;
  }

  let pHead = null;
  if (pHead1.val <= pHead2.val) {
    pHead = pHead1;
    pHead.next = merge(pHead1.next, pHead2);
  } else {
    pHead = pHead2;
    pHead.next = merge(pHead1, pHead2.next);
  }
  return pHead;
}
