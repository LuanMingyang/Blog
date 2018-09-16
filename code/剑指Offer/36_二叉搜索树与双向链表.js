/**
 * 输入一棵二叉搜索树，将该二叉搜索树转换成一个排序的双向链表。
 * 要求不能创建任何新的节点，只能调整树中节点指针的指向。
 * 
 * function TreeNode(x){
 *   this.val = x;
 *   this.left = null;
 *   this.right = null;
 * }
 * 
 * 将问题分解。
 * 在二叉搜索树中，左子树节点的值总是小于父节点的值，右子树节点的值总是大于父节点的值。
 * 转换成排序双向链表时，原来指向左子树的指针改为指向前一个节点，原来指向右子树的节点改为指向后一个节点。
 */
function convert(pRootOfTree) {
  if (!pRootOfTree) {
    return null;
  }
  let pLastNodeInList = null;
  pLastNodeInList = convertProcess(pRootOfTree, pLastNodeInList);

  let pHead = pLastNodeInList;
  while (pHead && pHead.left) {
    pHead = pHead.left;
  }
  return pHead;
}

function convertProcess(pNode, pLastNodeInList) {
  if (!pNode) {
    return;
  }
  if (pNode.left) {
    pLastNodeInList = convertProcess(pNode.left, pLastNodeInList);
  }
  pNode.left = pLastNodeInList;
  if (pLastNodeInList) {
    pLastNodeInList.right = pNode;
  }

  pLastNodeInList = pNode;

  if (pNode.right) {
    pLastNodeInList = convertProcess(pNode.right, pLastNodeInList);
  }

  return pLastNodeInList;
}
