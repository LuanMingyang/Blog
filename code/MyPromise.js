const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "rejected";

function MyPromise(func) {
  let _this = this;
  _this.status = PENDING; // Promise初始状态为Pending
  _this.value = undefined;  // Promise的返回值
  _this.onResolvedCallbacks = []; // Promise resolve时的回调函数集
  _this.onRejectedCallbacks = []; // Promise reject时的回调函数集

  _this.resolve = function (value) {
    if (_this.status === PENDING) {
      _this.status = RESOLVED;
      _this.value = value;
      _this.onResolvedCallbacks.forEach(cb => cb(value));
    }
  }

  _this.reject = function (reason) {
    if (_this.status === PENDING) {
      _this.status = REJECTED;
      _this.value = reason;
      _this.onRejectedCallbacks.forEach(cb => cb(reason));
    }
  }

  try { // 执行func的过程中有可能出错
    func(_this.resolve, _this.reject) // 执行func
  } catch(e) {
    _this.reject(e)
  }
}
