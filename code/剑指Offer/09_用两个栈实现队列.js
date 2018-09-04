/**
 * 用两个栈来实现一个队列，完成队列的 push 和 pop 操作。
 * 
 * 栈先入后出，队列先入先出。
 * stack1用于push，stack2用于pop；
 * 
 * （1）push
 * push时直接将元素push进stack1即可。
 * 
 * （2）pop
 * stack1中的元素逐个弹出压入stack2中（即把stack1中的元素“倒”入stack2），则stack2中元素的顺序与stack1相反，最先进入的在栈顶。
 * “倒”必须要满足两个条件：
 * 1）“倒”要倒完
 * 2）stack2不为空不能“倒”
 * 因此，pop时，若stack2不为空，则直接将stack2栈顶元素弹出；
 * 否则，将stack1元素倒入stack2，再将stack2栈顶元素弹出。
 */

function stackConvertQueue() {
  this.stack1 = [];
  this.stack2 = [];
}

stackConvertQueue.prototype.push = function(node) {
  this.stack1.push(node);
}

stackConvertQueue.prototype.pop = function() {
  if (!this.stack2.length) {
    while (this.stack1.length) {
      this.stack2.push(this.stack1.pop());
    }
  }
  return this.stack2.pop();
}
