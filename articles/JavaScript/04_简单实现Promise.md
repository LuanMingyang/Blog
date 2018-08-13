# 简单实现 Promise

根据 [Promise/A+ 规范](https://promisesaplus.com/)，实现一个简单的 Promise 对象

## 1. 定义 Promise 对象的三种状态

```javascript
const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "rejected";
```

## 2. 实现一个构造函数

```javascript
function MyPromise(func) {
  let _this = this;
  _this.status = PENDING; // Promise初始状态为Pending
  _this.value = undefined;  // Promise的返回值
  _this.onResolvedCallbacks = []; // Promise resolve时的回调函数集
  _this.onRejectedCallbacks = []; // Promise reject时的回调函数集

  _this.resolve = function (value) {
  }

  _this.reject = function (reason) {
  }

  try { // 执行func的过程中有可能出错
    func(_this.resolve, _this.reject) // 执行func
  } catch(e) {
    _this.reject(e)
  }
}
```

## 3. 实现构造函数中的 resolve 和 reject 方法

判断状态是否为 Pending，是则改变为相应的状态，并调用回调函数。

```javascript
function MyPromise(func) {
  // ...

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

  // ...
}
```

## 4. 实现 then 方法

1）`then`方法应该定义在原型链上；

2）`then`方法返回一个新的 Promise 对象；

3）根据 [Promise/A+ 规范](https://promisesaplus.com/)：

> 2.2.1. Both `onFulfilled` and `onRejected` are optional arguments:
>
> ​      2.2.1.1. If `onFulfilled` is not a function, it must be ignored.
>
> ​      2.2.1.2. If `onRejected` is not a function, it must be ignored.
>
> 2.2.1. `onFulfilled`和`onRejected`都是可选的参数：
>
> ​     2.2.1.1. 如果`onFulfilled`不是函数，则必须忽略它。
>
> ​     2.2.1.2. 如果`onRejected`不是函数，则必须忽略它。

```javascript
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
          // 如果onFulfilled的返回值是一个Promise对象，直接取它的结果做为promise2的结果
          if (x instanceof MyPromise) {
            x.then(resolve, reject);
          } else {
            resolve(x); // 否则，以onFulfilled的返回值做为promise2的结果
          }
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
          if (x instanceof MyPromise) {
            x.then(resolve, reject);
          }
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
          if (x instanceof MyPromise) {
            x.then(resolve, reject)
          }
        } catch(reason) {
          reject(reason)
        }
      })
      _this.onRejectedCallbacks.push(function(value) {
        try {
          var x = onRejected(_this.value);
          if (x instanceof MyPromise) {
            x.then(resolve, reject)
          }
        } catch(reason) {
          reject(reason)
        }
      })
    });
  }
}
```

## 5. 实现 resolutionProcedure 方法

实现不同 Promise 实现之间的无缝可交互。

根据 [Promise/A+ 规范](https://promisesaplus.com/)：

> 2.2.7.1. If either `onFulfilled` or `onRejected` returns a value `x`, run the Promise Resolution Procedure `[[Resolve]](promise2, x)`. 

`resolutionProcedure` 方法的实现规则如下，只需要将规则翻译成代码即可：

> To run `[[Resolve]](promise, x)`, perform the following steps:
>
> ​     2.3.1. If `promise` and `x` refer to the same object, reject `promise` with a `TypeError` as the reason.
>
> ​     2.3.2. If `x` is a promise, adopt its state: 
>
> ​        2.3.2.1. If `x` is pending, `promise` must remain pending until `x` is fulfilled or rejected.
>
> ​        2.3.2.2. If/when `x` is fulfilled, fulfill `promise` with the same value.
>
> ​        2.3.2.3. If/when `x` is rejected, reject `promise` with the same reason.
>
> ​    2.3.3. Otherwise, if `x` is an object or function,
>
> ​       2.3.3.1. Let `then` be `x.then`.
>
> ​       2.3.3.2. If retrieving the property `x.then` results in a thrown exception `e`, reject `promise` with `e` as the reason.
>
> ​       2.3.3.3. If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise`, where:
>
> ​          2.3.3.3.1. If/when `resolvePromise` is called with a value `y`, run `[[Resolve]](promise, y)`.
>
> ​          2.3.3.3.2. If/when `rejectPromise` is called with a reason `r`, reject `promise` with `r`.
>
> ​          2.3.3.3.3. If both `resolvePromise` and `rejectPromise` are called, or multiple calls to the same argument are made, the first call takes precedence, and any further calls are ignored.
>
> ​          2.3.3.3.4. If calling `then` throws an exception `e`,
>
> ​             2.3.3.3.4.1. If `resolvePromise` or `rejectPromise` have been called, ignore it.
>
> ​             2.3.3.3.4.2. Otherwise, reject `promise` with `e` as the reason.
>
> ​       2.3.3.4. If `then` is not a function, fulfill `promise` with `x`.
>
> ​    2.3.4. If `x` is not an object or function, fulfill `promise` with `x`.

```javascript
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
```

使用`resolutionProcedure` 方法替换`then`判断 x 是否为Promise对象的代码如下：

```javascript
MyPromise.prototype.then = function(onFulfilled, onRejected) {
  // ...
  if (_this.status === RESOLVED) {
    return promise2 = new MyPromise(function(resolve, reject) {
      setTimeout(() => {
        try {
          let x = onFulfilled(_this.value);
          // 第1处替换
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
          // 第2处替换
          resolutionProcedure(promise2, x, resolve, reject);
        } catch(reason) {
          reject(reason);
        }
      })
    });
  }

  if (_this.status === PENDING) {
    return promise2 = new Promise(function(resolve, reject) {
      _this.onResolvedCallbacks.push(function(value) {
        try {
          var x = onFulfilled(_this.value);
          // 第3处替换
          resolutionProcedure(promise2, x, resolve, reject);
        } catch(reason) {
          reject(reason)
        }
      })
      _this.onRejectedCallbacks.push(function(value) {
        try {
          var x = onRejected(_this.value);
          // 第4处替换
          resolutionProcedure(promise2, x, resolve, reject);
        } catch(reason) {
          reject(reason)
        }
      })
    });
  }
}
```

## 6. 测试

至此，已经按照规范实现了一个简单的 Promise，[完整代码](https://github.com/LuanMingyang/Blog/blob/master/code/JavaScript/MyPromise.js)。

使用[Promises/A+ Compliance Test Suite](https://github.com/promises-aplus/promises-tests)进行测试：

```javascript
MyPromise.deferred = function() {
  let obj = {};
  obj.promise = new MyPromise(function(resolve, reject) {
    obj.resolve = resolve;
    obj.reject = reject;
  })
  return obj;
}

module.exports = MyPromise;
```

运行：

```
npm i -g promises-aplus-tests
promises-aplus-tests MyPromise.js
```

