/**
 * 定义栈的数据结构，请在该类型中实现一个能够得到栈的所含最小元素的min函数。
 * 在该栈中，调用min、push及pop的时间复杂度都是0(1)。
 * 
 * stackData: 用于压入数据
 * stackMin: 用于压入当前最小元素
 */
function StackWithMin() {
  this.stackData = [];
  this.stackMin = [];
}

StackWithMin.prototype.push = function push(node) {
  this.stackData.push(node);
  this.stackMin.push(this.stackMin.length > 0 ? Math.min(node, this.min()) : node);
}

StackWithMin.prototype.pop = function pop() {
  this.stackMin.pop();
  return this.stackData.pop();
}

StackWithMin.prototype.top = function top() {
  return this.stackData.length > 0 ? this.stackData[this.stackData.length - 1] : null;
}

StackWithMin.prototype.min = function min() {
  return this.stackMin.length > 0 ? this.stackMin[this.stackMin.length - 1] : null;
}