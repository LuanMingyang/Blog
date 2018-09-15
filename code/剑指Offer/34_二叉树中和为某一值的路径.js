/**
 * 输入一棵二叉树和一个整数，打印出二叉树中节点值的和为输入整数的所有路径。
 * 从树的根节点开始往下一直到叶节点所经过的节点形成一条路径。
 * 例如：输入如下二叉树和整数20，则打印出两条路径：[8,5,7]，[8,12]
 * 
 *               8
 *             /   \
 *            5     12
 *           / \
 *          4   7
 * 
 * function TreeNode(x) {
 *   this.val = x;
 *   this.left = null;
 *   this.right = null;
 * }
 * 
 * 从根节点开始到叶子节点形成一条路径，因此路径是以根节点为起始点，前序遍历先访问根节点。
 * 因为需要记录路径，因此需要将已经遍历过的节点保存下来；
 * 当到达叶节点，但路径不满足条件时，需要将最后一个节点弹出，回到它的父节点，再继续遍历其他叶节点；
 * 后入先出，因此使用栈来保存路径。
 * 
 * 以上例中二叉树为例：
 * 1）先访问根节点10，根节点压栈，累加和；
 * 2）访问节点5，节点压栈，累加和；
 * 3）访问节点4，节点压栈，累加和；
 * 4）节点4为叶子节点，但路径累加和为17，不满足条件，则将节点4弹出，累加和减去4，回到节点7；
 * 5）访问节点7，节点压栈，累加和；
 * 6）节点7为叶子节点，且路径累加和为20，满足条件，因此找到一条路径；
 * 7）访问节点12，节点压栈，累加和；
 * 8）节点12为叶子节点，且路径累加和为20，满足条件，因此找到一条路径；
 * 9）结束遍历，一共找到两条满足条件的路径。
 */
function findPath(root, expectNumber) {
  let allPath = [];
  let path = [];
  let currentSum = 0;
  findPathProcess(root, expectNumber, allPath, path, currentSum);
  return allPath;
}

function findPathProcess(node, expectNumber, allPath, path, currentSum) {
  if (!node) {
    return;
  }
  currentSum += node.val;
  path.push(node.val);

  if (!node.left && !node.right && currentSum === expectNumber) {
    allPath.push([...path]);
  }

  if (node.left) {
    findPathProcess(node.left, expectNumber, allPath, path, currentSum);
  }
  if (node.right) {
    findPathProcess(node.right, expectNumber, allPath, path, currentSum)
  }

  path.pop();
}

let root = {
  val: 8,
  left: {
    val: 5,
    left: {
      val: 4,
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
    val: 12,
    left: null,
    right: null,
  }
}

let path = findPath(root, 20);
