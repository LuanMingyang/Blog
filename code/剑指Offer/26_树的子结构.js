/**
 * 输入两棵二叉树A，B，判断B是不是A的子结构。空树不是任意一棵树的子结构。
 * 
 * function TreeNode(x) {
 *   this.val = x;
 *   this.left = null;
 *   this.right = null;
 * }
 * 
 * 思路：
 * （1）在A树中查找与B树根节点的值一样的节点R；
 * （2）判断A树中以节点R为根节点的子树是否与B树拥有相同的结构；
 * （3）递归的终止条件即A树或B树到达了子节点。
 */
function hasSubTree(pRoot1, pRoot2) {
  let res = false;
  if (pRoot1 && pRoot2) {
    if (pRoot1.val === pRoot2.val) {
      res = isSubTree(pRoot1, pRoot2);
    }
    if (!res) {
      res = HasSubtree(pRoot1.left, pRoot2) || HasSubtree(pRoot1.right, pRoot2);
    }
  }
  return res;
}

function isSubTree(pRoot1, pRoot2) {
  if (!pRoot2) {
    return true;
  }
  if (!pRoot1 || pRoot1.val !== pRoot2.val) {
    return false;
  }
  return isSubTree(pRoot1.left, pRoot2.left) && isSubTree(pRoot1.right, pRoot2.right);;
}

let pRoot1 = {
  val: 8,
  left: {
    val: 8,
    left: {
      val: 9,
      left: null,
      right: null,
    },
    right: {
      val: 2,
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
    }
  },
  right: {
    val: 7,
    left: null,
    right: null,
  }
}

let pRoot2 = {
  val: 8,
  left: {
    val: 9,
    left: null,
    right: null,
  },
  right: {
    val: 2,
    left: null,
    right: null,
  }
}

hasSubTree(pRoot1, pRoot2);
