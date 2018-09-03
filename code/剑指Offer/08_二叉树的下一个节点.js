/**
 * 给定一个二叉树和其中的一个节点，请找出中序遍历顺序的下一个节点并且返回。
 * 注意，树中的节点不仅包含左右子节点，同时包含指向父节点的指针。
 * 
 * function TreeLinkNode(x) {
 *   this.val = x;
 *   this.left = null;
 *   this.right = null;
 *   this.parent = null;
 * }
 * 
 * 思路：
 * 注意画图
 * 1）有右子树，则下一节点为右子树的最左节点；
 * 2）无右子树，若当前节点是父节点的左子树，则下一节点是父节点；
 * 3）否则，当前节点与父节点都沿着父节点向上一层，直到找到当前节点是父节点的左节点时停止。
 */

function getNext(pNode) {
  if (!pNode) {
    return null;
  }
  let pNext = null;
  if (pNode.right) {
    pNext = pNode.right;
    while (pNext.left) {
      pNext = pNext.left;
    }
  } else {
    while (pNode.parent) {
      if (pNode.parent.left === pNode) {
        pNext = pNode.parent;
        break;
      }
      pNode = pNode.next;
    }
  }
  return pNext;
}
