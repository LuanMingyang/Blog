/**
 * 完成一个函数，输入一棵二叉树，输出它的镜像。
 * 
 * function TreeNode(x) {
 *   this.val = x;
 *   this.left = null;
 *   this.right = null;
 * }
 * 
 * 二叉树的镜像定义：
 * 源二叉树：
 *   	    8
 *  	  /   \
 *  	 6    10
 *  	/ \   / \
 *   5   7 9  11
 * 镜像二叉树：
 *  	    8
 *  	  /   \
 *  	10     6
 *  	/ \   / \
 *   11  9 7   5
 * 
 * 
 * 递归交换左右子树即可。
 */
function mirror(root) {
  if (!root) {
    return;
  }
  mirror(root.left);
  mirror(root.right);
  // let temp = root.left;
  // root.left = root.right;
  // root.right = temp;
  [root.left, root.right] = [root.right, root.left];
  return root;
}
