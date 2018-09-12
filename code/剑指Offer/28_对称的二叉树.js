/**
 * 请实现一个函数，用来判断一棵二叉树是不是对称的。
 * 如果一棵二叉树和它的镜像一样，那么它是对称的。
 * 
 * function TreeNode(x) {
 *   this.val = x;
 *   this.left = null;
 *   this.right = null;
 * }
 * 
 * 定义先序遍历的对称遍历方法为依次遍历父节点、右节点、左节点；
 * 对称二叉树的先序遍历与先序遍历的对称遍历是相等的。
 * 为避免二叉树中不同节点的值相同，为了表现出二叉树的结构，遍历时包括空节点。
 * 如下二叉树：
 *   	    7
 *  	  /   \
 *  	 7     7
 *  	/ \   /
 *   7   7 7
 * 先序遍历结果为：
 * 7,7,7,null,null,7,null,null,7,7,null,null,null
 */
function isSymmetrical(pRoot) {
  if (!pRoot) {
    return true;
  }
  return compareProcess(pRoot.left, pRoot.right);
}

function compareProcess(pRoot1, pRoot2) {
  if (!pRoot1 && !pRoot2) {
    return true;
  }
  if (!pRoot1 || !pRoot2 || pRoot1.val !== pRoot2.val) {
    return false;
  }
  return compareProcess(pRoot1.left, pRoot2.right) && compareProcess(pRoot1.right, pRoot2.left);
}
