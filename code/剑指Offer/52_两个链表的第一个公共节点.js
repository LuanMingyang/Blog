/**
 * 输入两个链表，找出它们的第一个公共结点。
 * 
 * function ListNode(x) {
 *   this.val = x;
 *   this.next = null;
 * }
 * 
 * 有公共节点的单向链表的特点：
 * 如果两个单向链表有公共节点，那么从某一个节点开始，它们的next都指向同一个节点，
 * 且从第一个公共节点开始，之后它们所有的节点都是重合的，不可能再出现分叉。
 * 如两个单向链表在节点6处交汇：
 * 1 -> 2 -> 3 ->
 *                6 -> 7
 *      4 -> 5 ->
 * 
 * 解法一：
 * 利用栈 时间复杂度O(m+n) 额外空间复杂度O(m+n)
 * 如果两个单向链表有公共节点，两个链表的尾部一定也是公共节点，从链表尾部开始往前比较，最后一个相同的节点就是要找的第一个公共节点。
 * 在单向链表中，只能从头节点开始顺序遍历，因此，利用栈，把两个链表的所有节点压入栈中，使尾节点位于两个栈的栈顶；
 * 比较两个栈的栈顶是否相同，相同则弹出栈顶，继续比较，知道找到最后一个相同的节点。
 * 解法二：
 * 时间复杂度O(m+n) 不再需要额外空间
 * 要保证遍历时可以同时到达两个链表的尾部，只要让较长的链表先向前走若干步。
 * 先遍历两个链表得到两个链表的长度，知道哪个链表比较长，长几步记为n；
 * 再次从头开始遍历两个链表，但让长链表先走n步，两个链表再同时往前走，找到的第一个相同节点即为第一个公共节点。
 */
function findFirstCommonNode(pHead1, pHead2) {
  let len1 = getListLen(pHead1);
  let len2 = getListLen(pHead2);
  let pNode1 = pHead1, pNode2 = pHead2;
  while (len1 > len2) {
    pNode1 = pNode1.next;
    len1--;
  }
  while (len2 > len1) {
    pNode2 = pNode2.next;
    len2--;
  }
  while (pNode1 && pNode2) {
    if (pNode1 === pNode2) {
      return pNode1;
    }
    pNode1 = pNode1.next;
    pNode2 = pNode2.next;
  }
  return null;
}

function getListLen(pHead) {
  let count = 0;
  while (pHead) {
    count++;
    pHead = pHead.next;
  }
  return count;
}