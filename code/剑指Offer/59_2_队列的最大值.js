/**
 * 请定义一个队列并实现函数max得到队列里的最大值，要求函数max、push、pop的时间复杂度都是O(1)。
 */

function QueueWithMax() {
  this.queueData = [];
  this.queueMax = [];
}

QueueWithMax.prototype.push = function push(node) {
  this.queueData.push(node);
  this.queueMax.unshift(this.queueMax.length > 0 ? Math.max(node, this.max()) : node);
}

QueueWithMax.prototype.pop = function pop() {
  this.queueMax.shift();
  return this.queueData.shift();
}

QueueWithMax.prototype.max = function max() {
  return this.queueMax.length > 0 ? this.queueMax[0] : null;
}
