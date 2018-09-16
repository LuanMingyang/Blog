/**
 * 请实现函数复制一个复杂链表，返回复制链表的头结点。
 * 在复杂链表中，每个节点除了有一个next指针指向下一个节点，还有一个sibling指针指向链表中的任意节点或者null。
 * 
 * function ComplexListNode(x){
 *   this.val = x;
 *   this.next = null;
 *   this.sibling = null;
 * }
 * 
 * 思路一：
 * 复制原链表的节点并用next指针连接起来，每个节点都从链表头节点开始遍历设置sibling指针。时间复杂度O(N^2)
 * 思路二：
 * 复制原链表的节点并用next指针连接起来，同时保存原节点N与复制节点N'之间的对应关系。设置sibling指针。
 * 原节点sibling指向S，则复制节点sibling指向S'，因为保存了原节点与复制节点之间的对应关系，可以用O(1)的时间找到S'。
 * 此方法用空间换时间，时间复杂度O(N)，额外空间复杂度O(N)。
 * 思路三：
 * 为原链表的每个节点N创建复制节点N'，并把N'链接在N后面，形成如下结构：
 * A —> A' —> B —> B' —> C —> C' —> D —> D' —> E —> E'
 * 原节点的sibling指向S，则复制节点的sibling指向S的下一个节点S'
 * 最后将链表拆开，奇数位置上的节点链接起来就是原链表，偶数位置上的节点链接起来就是复制链表。
 */
function clone(pHead) {
  if (!pHead) {
    return null;
  }
  // 为原链表的每个节点N创建复制节点N'，并把N'链接在N后面
  let pNode = pHead;
  while (pNode) {
    let pClone = new ComplexListNode(pNode.val);
    pClone.next = pNode.next;
    pNode.next = pClone;
    pNode = pClone.next;
  }

  // 设置复制节点的sibling指针
  pNode = pHead;
  while (pNode) {
    if (pNode.sibling) {
      pNode.next.sibling = pNode.sibling.next;
    }
    pNode = pNode.next.next;
  }

  // 拆分出复制链表
  pNode = pHead;
  let pHeadClone = pNodeClone = pNode.next;
  pNode = pNodeClone.next;
  while (pNode) {
    pNodeClone.next = pNode.next;
    pNodeClone = pNodeClone.next;
    pNode = pNodeClone.next;
  }

  return pHeadClone;
}
