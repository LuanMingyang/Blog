/**
 * 给一个链表，若其中包含环，请找出该链表的环的入口节点，否则，输出null。
 * 
 * function ListNode(x) {
 *   this.val = x;
 *   this.next = null;
 * }
 * 
 * 解题思路：
 * 1. 判断是否有环
 *    定义两个指针，同时从头结点出发。一个为快指针，一次走两步；另一个为慢指针，一次走一步；
 *    （1）如果快指针追上了慢指针，则有环；
 *    （2）如果快指针走到了链表尾节点都没追上慢节点，则无环。
 * 2. 找到环的入口几点
 *    定义两个指针p1、p2同时指向链表头节点；
 *    假设环中包含n个节点，则p1先向前走n步；
 *    然后p1、p2相同速度同时向前走；
 *    当p2走到环入口时，p1正好走完环的一圈回到环入口节点。
 * 3. 确定环中节点个数
 *    在判断是否有环时，两个指针相遇的节点一定为环中节点；
 *    可以从相遇节点出发，再次回到该节点时，移动的步数即为环中节点个数。
 * 
 * 两个结论：
 * 1. 链表头节点到相遇点的距离为环中结点数n。
 * 2. 相遇点到环入口节点的距离 = 链表头节点到环入口节点的距离。
 */
function entryNodeOfLoop(pHead) {
  let pFast = pHead;
  let pSlow = pHead;
  while (pFast && pFast.next) {
    pSlow = pSlow.next;
    pFast = pFast.next.next;
    // 相遇
    if (pSlow === pFast) {
      let p = pHead;
      // 利用结论2
      while (p !== pSlow) {
        p = p.next;
        pSlow = pSlow.next;
      }
      return p;
    }
  }
  return null;
}
