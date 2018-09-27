/**
 * 给定一棵二叉搜索树，请找出其中的第k小的结点。
 * 例如：如下二叉搜索树里，按节点数值大小顺序，第三小节点的值是4。
 *         5
 *      /     \
 *     3       7
 *    / \     / \
 *   2   4   6   8
 * 
 * function TreeNode(x){
 *   this.val = x;
 *   this.left = null;
 *   this.right = null;
 * }
 * 
 * 二叉搜索树的中序遍历是递增排序的，可以找出第k小节点。
 */
function kthNode(pRoot, k) {
  if (!pRoot) {
    return null;
  }
  return inOrderUnRecur(pRoot, k);
}

// 非递归中序遍历
function inOrderUnRecur(node, k) {
  if (!node) {
    return;
  }
  let stack = [];
  while (stack.length > 0 || node) {
    if (node) {
      stack.push(node);
      node = node.left;
    } else {
      node = stack.pop();
      k--;
      if (k === 0) {
        return node;
      }
      node = node.right;
    }
  }
}
