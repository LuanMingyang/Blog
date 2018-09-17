/**
 * 请实现两个函数，分别用来序列化和反序列化二叉树。
 * 
 * function TreeNode(x){
 *   this.val = x;
 *   this.left = null;
 *   this.right = null;
 * }
 * 
 * 二叉树的序列化是从根节点开始，因此采用前序遍历来序列二叉树；
 * 为了保持二叉树的结构，空节点也需要序列化，即在碰到null时，序列化为一个特殊的字符（如'$'）；
 * 数值之间需要用','隔开。
 */

function serialize(pRoot) {
  let arr = [];
  serializeProcess(pRoot, arr);
  return arr.join(',');
}

function serializeProcess(pRoot, arr) {
  if (!pRoot) {
    arr.push('$');
    return;
  }
  arr.push(pRoot.val);
  serializeProcess(pRoot.left, arr);
  serializeProcess(pRoot.right, arr);
}

function deserialize(s) {
  let arr = s.split(',');
  return deserializeProcess(arr);
}

function deserializeProcess(arr) {
  if (!arr || arr.length < 1) {
    return null;
  }
  let pNode = null;
  let val = arr.shift();
  if (val !== '$') {
    pNode = new TreeNode(val);
    pNode.left = deserializeProcess(arr);
    pNode.right = deserializeProcess(arr);
  }
  return pNode;
}

function TreeNode(x){
  this.val = x;
  this.left = null;
  this.right = null;
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

let str = serialize(root);
let pRoot = deserialize(str);
