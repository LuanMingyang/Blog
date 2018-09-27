/**
 * 输入一棵二叉树，求该树的深度。
 * 从根节点到叶节点依次经过的节点（含根、叶节点）形成树的一条路径，最长路径的长度为树的深度。
 * 例如：如下二叉树的深度为4。
 *         1
 *      /     \
 *     2       3
 *    / \       \
 *   4   5       6
 *      /
 *     7
 * 
 * function TreeNode(x){
 *   this.val = x;
 *   this.left = null;
 *   this.right = null;
 * }
 * 
 * 如果一棵树只有根节点，深度为1；
 * 如果只有左子树没有右子树，深度为左子树的深度加1；
 * 如果只有右子树没有左子树，深度为右子树的深度加1；
 * 既有左子树又有右子树，深度为左右子树深度的较大值加1。
 */
function treeDepth(pRoot) {
  if (!pRoot) {
    return 0;
  }

  let lDepth = treeDepth(pRoot.left);
  let rDepth = treeDepth(pRoot.right);

  return lDepth > rDepth ? lDepth + 1 : rDepth + 1;
}
