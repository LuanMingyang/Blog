/**
 * 二叉树的递归、非递归遍历
 */

var tree = {
  value: 1,
  left: {
    value: 2,
    left: {
      value: 4
    }
  },
  right: {
    value: 3,
    left: {
      value: 5,
      left: {
        value: 7
      },
      right: {
        value: 8
      }
    },
    right: {
      value: 6
    }
  }
};

// 递归先序遍历
function preOrderRecur(node) {
  if (!node) {
    return;
  }
  console.log(node.value);
  preOrderRecur(node.left);
  preOrderRecur(node.right);
}

// 递归中序遍历
function inOrderRecur(node) {
  if (!node) {
    return;
  }
  inOrderRecur(node.left);
  console.log(node.value);
  inOrderRecur(node.right);
}

// 递归后序遍历
function posOrderRecur(node) {
  if (!node) {
    return;
  }
  posOrderRecur(node.left);
  console.log(node.value);
  posOrderRecur(node.right);
}



// 非递归先序遍历
function preOrderUnRecur(node) {
  if (!node) {
    return;
  }
  let stack = [];
  stack.push(node);
  while (stack.length > 0) {
    node = stack.pop();
    console.log(node.value);
    if (node.right) {
      stack.push(node.right);
    }
    if (node.left) {
      stack.push(node.left);
    }
  }
}

// 非递归中序遍历
function inOrderUnRecur(node) {
  if (!node) {
    return;
  }
  let stack = [];
  while (stack.length > 0 || node) {
    if (node) {
      stack.push(node);
      node = node.left;
    } else {
      node = stack.pop();
      console.log(node.value);
      node = node.right;
    }
  }
}

// 非递归后序遍历(使用两个栈)
function posOrderUnRecur(node) {
  if (!node) {
    return;
  }
  let stack = [];
  let stack2 = [];
  stack.push(node);
  while (stack.length > 0) {
    node = stack.pop();
    stack2.push(node);
    if (node.left) {
      stack.push(node.left);
    }
    if (node.right) {
      stack.push(node.right);
    }
  }

  while (stack2.length > 0) {
    console.log(stack2.pop().value);
  }
}

preOrderUnRecur(tree);
