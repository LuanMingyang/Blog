/**
 * 分行从上到下打印二叉树
 * 从上到下打印出二叉树的每个节点，同一层次的节点按照从左到右的顺序打印，每一层打印到一行。
 * 例如：如下二叉树
 * 依次打印结果为：
 * 8
 * 6,10
 * 5,7,9,11
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
 * 同时需要记录当前行是否打印完，以及下一行需要打印的节点个数。
 */
function printFromTopToBottom(root) {
  if (!root) {
    return '';
  }
  let queue = [root];
  let currentLevel = 1;
  let nextLevel = 0;
  let level = [];
  while (queue.length) {
    let node = queue.shift();
    level.push(node.val);
    if (node.left) {
      queue.push(node.left);
      nextLevel++;
    }
    if (node.right) {
      queue.push(node.right);
      nextLevel++;
    }
    if (--currentLevel === 0) {
      console.log(level.join(','));
      level = [];
      currentLevel = nextLevel;
      nextLevel = 0;
    }
  }
}

let root = {
  val: 8,
  left: {
    val: 6,
    left: {
      val: 5,
      left: null,
      right: null,
    },
    right: {
      val: 7,
      left: null,
      right: null,
    }
  },
  right: {
    val: 10,
    left: {
      val: 9,
      left: null,
      right: null,
    },
    right: {
      val: 11,
      left: null,
      right: null,
    }
  }
}

printFromTopToBottom(root);
