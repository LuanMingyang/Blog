/**
 * 输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。
 * 假设输入的前序遍历和中序遍历的结果中都不含重复的数字。
 * 例如输入前序遍历序列[1,2,4,7,3,5,6,8]和中序遍历序列[4,7,2,1,5,3,8,6]，则重建二叉树并返回。
 * 
 * function TreeNode(x) {
 *   this.val = x;
 *   this.left = null;
 *   this.right = null;
 * }
 * 
 * 二叉树遍历：
 * 前序：先中，再左，最后右
 * 中序：先左，再中，最后右
 * 后序：先左，再右，最后中
 * 
 * 解题思路：
 * 1）前序遍历第一个总是根节点的值，中序遍历根节点的值在中间，左侧是左子树，右侧是右子树；
 * 2）通过找到中序遍历中根节点的位置，确定左子树的节点数量，从而可以得到左子树及右子树的前序中序遍历；
 * 3）递归构建左右子树。
 */

function reConstructBinaryTree(pre, vin) {
  if (pre.length === 0 || vin.length === 0) {
    return null;
  }
  let root = new TreeNode(pre[0]);
  let rootIndex = vin.indexOf(pre[0]);
  root.left = reConstructBinaryTree(pre.slice(1, rootIndex + 1), vin.slice(0, rootIndex));
  root.right = reConstructBinaryTree(pre.slice(rootIndex + 1), vin.slice(rootIndex + 1));
  return root;
}
