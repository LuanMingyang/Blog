/**
 * 输入一棵二叉树，判断该二叉树是否是平衡二叉树。
 * 例如：如下二叉树为平衡二叉树。
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
 * 解法一：
 * 在遍历每个节点时，利用函数treeDepth（55_1_二叉树的深度）得到左右子树的深度，如果每个节点的左右子树的深度相差 都不超过1，那么就是平衡二叉树。
 * 一个节点需要重复遍历多次，时间效率低。
 * 解法二：
 * 在遍历每个节点的时候，一边遍历一边判断每个节点是不是平衡的。
 * 每个节点只遍历一次，避免重复。
 */

function isBalanced_Solution1(pRoot) {
  if (!pRoot) {
    return true;
  }

  let lDepth = treeDepth(pRoot.left);
  let rDepth = treeDepth(pRoot.right);
  if (Math.abs(lDepth - rDepth) > 1) {
    return false;
  }

  return isBalanced_Solution1(pRoot.left) && isBalanced_Solution1(pRoot.right);
}

function treeDepth(pRoot) {
  if (!pRoot) {
    return 0;
  }

  let lDepth = treeDepth(pRoot.left);
  let rDepth = treeDepth(pRoot.right);

  return lDepth > rDepth ? lDepth + 1 : rDepth + 1;
}

function isBalanced_Solution2(pRoot) {
  if (!pRoot) {
    return true;
  }
  return treeDepth(pRoot) > -1;
}

function treeDepth(pRoot) {
  if (!pRoot) {
    return 0;
  }

  let lDepth = treeDepth(pRoot.left);
  let rDepth = treeDepth(pRoot.right);

  // 不平衡时返回-1
  return lDepth === - 1 || rDepth === -1 || Math.abs(lDepth - rDepth) > 1 ? -1 : Math.max(lDepth, rDepth) + 1;
}
