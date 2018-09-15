/**
 * 输入一个整数数组，判断该数组是不是某二叉搜索树的后序遍历的结果。
 * 如果是则返回true，否则返回false。假设输入的数组的任意两个数字都互不相同。
 * 例如：若输入数组[5,7,6,9,11,10,8]，则返回true，因为这个序列是如下二叉搜索树的后序遍历结果；
 *      若输入数组[7,4,5,6]，则返回false，找不到一个二叉搜索树的后序遍历是这个序列。
 * 
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
 * 根据后序遍历特点，后序遍历得到的序列中，最后一个数字是树的根节点的值；
 * 则数组中前面的值可以分为两部分：左子树节点和右子树节点；
 * 左子树节点的值都比根节点小，右子树节点的值都比根节点大；
 * 递归左子树节点与右子树节点。
 */
function verifySquenceOfBST(sequence) {
  if (!sequence || sequence.length < 1) {
    return false;
  }
  let root = sequence[sequence.length - 1];
  let rightStart = sequence.findIndex(item => item >= root); // 找到第一个右子树节点下标，当不存在右子树时等于根节点下标
  for (let j = rightStart; j < sequence.length - 1; j++) {
    if (sequence[j] < root) {
      return false;
    }
  }

  let left = true;
  if (rightStart > 0) {
    left = verifySquenceOfBST(sequence.slice(0, rightStart));
  }
  let right = true;
  if (rightStart < sequence.length - 1) {
    right = verifySquenceOfBST(sequence.slice(rightStart + 1))
  }

  return left && right;
}
