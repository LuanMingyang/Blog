/**
 * 在一个排序的链表中，存在重复的结点。
 * 请删除该链表中重复的结点，重复的结点不保留，返回链表头指针。
 * 例如：链表 1->2->3->3->4->4->5 处理后为 1->2->5
 * 链表节点定义如下：
 * function ListNode(x) {
 *   this.val = x;
 *   this.next = null;
 * }
 * 
 * 如果当前节点的值与下一个节点的值相同，那么它们是重复的节点，都需要被删除。
 * 需要把当前节点的前一节点与后面第一个值比当前节点的值大的节点相连。
 */
function deleteDuplication(pHead) {
  if (!pHead || !pHead.next) {
    return pHead;
  }
  let pNode = pHead;
  let pPrev = null;
  let pNext = null;
  while(pNode) {
    pNext = pNode.next;
    if (pNext && pNode.val === pNext.val) {
      while (pNext && pNext.val === pNode.val) {
        pNext = pNext.next;
      }
      if (!pPrev) {
        pHead = pNext;
      } else {
        pPrev.next = pNext;
      }
    } else {
      pPrev = pNode;
    }
    pNode = pNext;
  }
  return pHead;
}

// 可以增加一个头结点来解决
function deleteDuplication(pHead) {
  if (!pHead || !pHead.next) {
    return pHead;
  }
  let newHead = new ListNode(0); // 新增一个头结点
  newHead.next = pHead;
  let pNode = pHead;
  let pPrev = newHead;
  let pNext = null;
  while(pNode) {
    pNext = pNode.next;
    if (pNext && pNode.val === pNext.val) {
      while (pNext && pNext.val === pNode.val) {
        pNext = pNext.next;
      }
      pPrev.next = pNext;
    } else {
      pPrev = pNode;
    }
    pNode = pNext;
  }
  return newHead.next;
}
