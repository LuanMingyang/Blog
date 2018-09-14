/**
 * 请实现一个函数按照之字形顺序打印二叉树
 * 即将第一行按照从左到右的顺序打印，第二层按照从右到左的顺序打印，第三行按照从左到右的顺序打印，其他行以此类推。
 * 例如：如下二叉树
 * 依次打印结果为：
 * 8
 * 10,6
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
 * 奇数行从左到右打印，偶数行从右到左打印。
 * 先压入根节点，弹出打印
 * 依次压入左右子树，先打印右子树，再打印左子树，相当于栈，先入后出。
 * 奇数行先压右子树，偶数行先压左子树。
 * 需要两个栈，否则，没办法连续打印一层。
 * 如打印第二层时，若只使用一个栈，当弹出10后，需要将10的子树入栈，此时6还在栈中未弹出，会被压入栈底，因此需要使用两个栈。
 */
function printFromTopToBottom(root) {
  if (!root) {
    return '';
  }
  let stack = [[], []];
  let isOdd = 1; // 奇数行
  stack[isOdd].push(root);
  let level = [];
  while (stack[isOdd].length || stack[1 - isOdd].length) {
    let node = stack[isOdd].pop();
    level.push(node.val);
    if (isOdd) { // 当前行是奇数行，则下一行是偶数行
      if (node.left) {
        stack[1 - isOdd].push(node.left);
      }
      if (node.right) {
        stack[1 - isOdd].push(node.right);
      }
    } else {
      if (node.right) {
        stack[1 - isOdd].push(node.right);
      }
      if (node.left) {
        stack[1 - isOdd].push(node.left);
      }
    }
    
    if (stack[isOdd].length === 0) {
      console.log(level.join(','));
      level = [];
      isOdd = 1 - isOdd;
    }
  }
}

let root = {
  val: 8,
  left: {
    val: 6,
    left: {
      val: 5,
      left: {
        val: 0,
        left: null,
        right: null,
      },
      right: {
        val: 1,
        left: null,
        right: null,
      }
    },
    right: {
      val: 7,
      left: {
        val: 2,
        left: null,
        right: null,
      },
      right: {
        val: 3,
        left: null,
        right: null,
      }
    }
  },
  right: {
    val: 10,
    left: {
      val: 9,
      left: {
        val: 4,
        left: null,
        right: null,
      },
      right: {
        val: 5,
        left: null,
        right: null,
      }
    },
    right: {
      val: 11,
      left: {
        val: 6,
        left: null,
        right: null,
      },
      right: {
        val: 7,
        left: null,
        right: null,
      }
    }
  }
}

printFromTopToBottom(root);
