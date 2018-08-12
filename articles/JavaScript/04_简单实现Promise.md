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

  // ...
}
```

