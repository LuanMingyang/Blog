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
    // 异步执行所有的回调函数，保证顺序执行
    setTimeout(() => {
      if (_this.status === PENDING) {
        _this.status = RESOLVED;
        _this.value = value;
        _this.onResolvedCallbacks.forEach(cb => cb(value));
      }
    });
  }

  _this.reject = function (reason) {
    // 异步执行所有的回调函数，保证顺序执行
    setTimeout(() => {
      if (_this.status === PENDING) {
        _this.status = REJECTED;
        _this.value = reason;
        _this.onRejectedCallbacks.forEach(cb => cb(reason));
      }
    });
  }

  try { // 执行func的过程中有可能出错
    func(_this.resolve, _this.reject) // 执行func
  } catch(e) {
    _this.reject(e)
  }
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
  let _this = this;
  let promise2; // 需要返回一个新的Promise对象

  // 1）根据规范，如果不是function，需要忽略
  // 2）new Promise(resolve => resolve(8)).then().then((value) => console.log(value)}) 
  //    这种情况需要实现值的穿透
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
  onRejected = typeof onRejected === 'function' ? onRejected : r => { throw r };

  if (_this.status === RESOLVED) {
    return promise2 = new MyPromise(function(resolve, reject) {
      // setTimeout 保证 onFulfilled，onRejected 异步执行
      setTimeout(() => {
        try {
          let x = onFulfilled(_this.value);
          resolutionProcedure(promise2, x, resolve, reject);
        } catch(reason) {
          reject(reason);
        }
      });
    });
  }

  if (_this.status === REJECTED) {
    return promise2 = new MyPromise(function(resolve, reject) {
      setTimeout(() => {
        try {
          let x = onRejected(_this.value);
          resolutionProcedure(promise2, x, resolve, reject);
        } catch(reason) {
          reject(reason);
        }
      })
    });
  }

  if (_this.status === PENDING) {
    // 如果Promise对象处于Pending状态，需要等到Promise对象的状态确定后再处理。
    // 因此需要把两种情况的处理逻辑做为callback放入promise1的回调数组里
    return promise2 = new Promise(function(resolve, reject) {
      _this.onResolvedCallbacks.push(function(value) {
        try {
          var x = onFulfilled(_this.value);
          resolutionProcedure(promise2, x, resolve, reject);
        } catch(reason) {
          reject(reason)
        }
      })
      _this.onRejectedCallbacks.push(function(value) {
        try {
          var x = onRejected(_this.value);
          resolutionProcedure(promise2, x, resolve, reject);
        } catch(reason) {
          reject(reason)
        }
      })
    });
  }
}

function resolutionProcedure(promise2, x, resolve, reject) {
  // 2.3.1. x 不能和 promise2 相同，避免循环引用
  if (promise2 === x) {
    return reject(new TypeError("Error"));
  }

  // 2.3.2. x 是一个Promise对象，接受 x 的状态
  if (x instanceof MyPromise) {
    // 2.3.2.x. x 状态为 pending 需要继续等待，否则取 x 的状态
    if (x.status === PENDING) {
      x.then(function (value) {
        // 再次调用该函数确认 x resolve 的参数是什么类型
        // 如果是基本类型就再次 resolve，并把值传给下个 then
        resolutionProcedure(promise2, value, resolve, reject);
      }, reject);
    } else {
      x.then(resolve, reject);
    }
    return;
  }

  // 2.3.3. x 是对象或者函数
  if (x !== null && (typeof x === "object" || typeof x === "function")) {
    let called = false;
    // 2.3.3.2. 
    try {
      let then = x.then;

      if (typeof then === 'function') {
        then.call(x, y => {
          if (called) return;
          called = true;
          resolutionProcedure(promise2, y, resolve, reject);
        }, r => {
          if (called) return;
          called = true;
          reject(r);
        });
      } else { // 2.3.3.4.
        resolve(x);
      }
    } catch(e) {
      // 2.3.3.3.4.1.
      if (called) return;
      called = true;
      // 2.3.3.3.4.2.
      reject(e);
    }
  } else { // 2.3.4.
    resolve(x);
  }
}

MyPromise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected)
}

// for test
MyPromise.deferred = function() {
  let obj = {};
  obj.promise = new MyPromise(function(resolve, reject) {
    obj.resolve = resolve;
    obj.reject = reject;
  })
  return obj;
}

module.exports = MyPromise;
