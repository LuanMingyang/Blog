/**
 * 不分行从上到下打印二叉树
 * 从上到下打印出二叉树的每个节点，同一层次的节点按照从左到右的顺序打印。
 * 例如：如下二叉树，依次打印结果为 8,6,10,5,7,9,11
 *               8
 *             /   \
 *            6     10
 *           / \   /  \
 *          5   7 9   11
 * 
 * function TreeNode(x) {
 *   this.val = x;
 *   this.left = null;
 *   this.right = null;
 * }
 * 
 * 从左到右打印，先入先出，相当于队列。
 */
function printFromTopToBottom(root) {
  if (!root) {
    return '';
  }
  let queue = [root];
  let res = [];
  while (queue.length) {
    let node = queue.shift();
    res.push(node.val);
    if (node.left) {
      queue.push(node.left);
    }
    if (node.right) {
      queue.push(node.right);
    }
  }
  return res;
}
