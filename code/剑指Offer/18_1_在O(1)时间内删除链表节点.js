/**
 * 在O(1)时间内删除链表节点
 * 给定单向链表的头指针和一个节点指针，定义一个函数在O(1)时间内删除该节点。
 * 链表节点定义如下：
 * function ListNode(x) {
 *   this.value = x;
 *   this.next = null;
 * }
 * 
 * 两种删除节点的方法：
 * 1. 常规方法：从链表的头结点开始，顺序遍历查找要删除的节点，并在链表中删除该节点。时间复杂度O(N)。
 * 2. 常规方法因为要找到前一个节点，所以需要从头开始查找。可以不利用前一个节点删除。
 *    通过把下一个节点的值复制到要删除的节点上，然后删除下一个节点，就相当于把需要删除的节点删除了。
 *    时间复杂度O(1)。
 *    需要考虑特殊情况：
 *    （1）要删除的是最后一个节点，没有下一节点，此时只能从头开始遍历找前一个节点。
 *    （2）链表只有一个元素，删除后要将头节点指向null。
 */
function deleteNode(pHead, pToBeDeleted) {
  if (!pHead || !pToBeDeleted) {
    return;
  }
  if (pToBeDeleted.next) {
    let pNext = pToBeDeleted.next;
    pToBeDeleted.value = pNext.value;
    pToBeDeleted.next = pNext.next;
    delete pNext;
    pNext = null;
  } else if (pHead === pToBeDeleted) {
    delete pHead;
    pHead = null;
  } else {
    let pNode = pHead;
    while (pNode.next !== pToBeDeleted) {
      pNode = pNode.next;
    }
    // pNode.next = pToBeDeleted.next;
    pNode.next = null;
    delete pToBeDeleted;
    pToBeDeleted = null;
  }
}
