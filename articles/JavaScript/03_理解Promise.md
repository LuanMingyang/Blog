# 理解 Promise

## 1. 什么是Prmoise

根据 [Promise/A+ 规范](https://promisesaplus.com/)：

> A *promise* represents the eventual result of an asynchronous operation. The primary way of interacting with a promise is through its `then` method, which registers callbacks to receive either a promise’s eventual value or the reason why the promise cannot be fulfilled. 
>
> Promise 代表了异步操作的最终结果。与 Promise 交互的主要方式是通过它的`then`方法，`then`方法注册回调来接收一个 Promise 的最终值，或者是 Promise 不能实现的原因。 

所谓 Promise 就是一个对象，用来传递异步操作的消息。

通过 Promise对象，可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。

![](https://github.com/LuanMingyang/Blog/images/promise.png)

实际上 Promise/A+ 规范中仅指定了 Promise 对象的`then`方法的行为，其它一切我们常见的方法/函数都并没有指定，包括`catch`，`race`，`all`等常用方法。 

## 2. Promise 对象的特点

1. 对象的状态不受外界影响

2. Promise 对象**只有三种状态**

   `Pending`（进行中）、`Resolved`（已完成，又称 Fulfilled）、`Rejected`（已失败）

   只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态.。

3. 一旦状态改变，就不会再变，任何时候都可以得到这个结果。

   Promise 对象的**状态改变只有两种可能**：`Pending => Resolved`或`Pending => Rejected`

   只要有一种改变发生，状态就不会再变。

## 3. Promise 对象的缺点

1. 无法取消 Promise，一旦新建它就会立即执行，无法中途取消。
2. 如果不设置回调函数，Promise 内部抛出的错误不会反应到外部。
3. 当处于 Pending 状态时，无法得知目前进展到哪一个阶段（刚开始还是即将完成）。

## 4. Promise 基本用法

```javascript
var promise = new Promise(function(resolve, reject) {
  // ...some code
  if (/* 异步操作成功 */) {
    resolve(value);
  } else {
    reject(reason);   
  }
});

promise.then((value) => {
  console.log(value)
}, (reason) => {
  console.log(reason); 
});
```

Promise 构造函数接受一个函数作为参数，该函数有两个参数`resolve`和`reject`。

- `resolve`将 Promise 对象状态由`Pending => Resolved`

  在异步操作成功时调用，将异步操作的结果作为参数传递出去

- `reject`将 Promise 对象状态由`Pending => Rejected`

  在异步操作失败时调用，将异步操作错误作为参数传递出去

`then`方法接受两个回调函数作为参数，都接受 Promise 对象传出的值作为参数。第一个回调函数在 Promise 对象的状态变为 Resolved 时调用，第二个回调函数在 Promise 对象的状态变为 Rejected 时调用。其中，第二个参数可选。

## 5. Promise.prototype.then()

##### promise 的`then`方法接受两个参数：

```javascript
promise.then(onFulfilled, onRejected)
```

##### `then` 必须返回一个新的 promise：

```javascript
promise2 = promise1.then(onFulfilled, onRejected);
```

因此**可以采用链式的写法**，即`then`方法后接着再调用另一个`then`方法。

采用链式的`then`可以指定一组按照次序调用的回调函数。如果前一个回调函数返回的还是一个 Promise 对象，则后一个回调函数就会等待该 Promise 对象的状态发生变化再被调用。

## 6. Promise.prototype.catch()

`catch(onRejected)`相当于`then(null, onRejected)`

当异步操作抛出错误时，状态变为 Rejected，就会调用`catch`方法指定的回调函数处理错误。

**注意：如果 Promise 状态已经变成 Resolved，再抛出错误是无效的。**

Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。

一般来说，不在`then`方法中定义 Rejected 状态的回调函数，而总是使用`catch`方法。

**如果没有指定错误处理的回调函数，Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应。**

## 7. Promise.all()

`Promise.all`方法用于将多个 Promise 实例包装成一个新的 Promise 实例

```javascript
var p = Promise.all([p1, p2, p3]);
```

1. 只有 p1、p2、p3 的状态都变为 Resolved，p 的状态才会变成 Resolved，此时 p1、p2、p3 的返回值组成一个数组（按照参数的顺序 ），传递给 p 的回调函数。
2. 只要 p1、p2、p3 中有一个状态变为 Rejected，p 的状态就会变成 Rejected，此时第一个变为 Rejected 的实例的返回值会传递给 p 的回调函数。

## 8. Promise.race()

`Promise.race`方法也用于将多个 Promise 实例包装成一个新的 Promise 实例

```javascript
var p = Promise.race([p1, p2, p3]);
```

与`Promise.all`方法不同，只要 p1、p2、p3 中有一个状态先改变，p 的状态就跟着改变，第一个改变状态的实例的返回值， 就传递给 p 的回调函数。

## 9. Promise.resolve()

`Promise.resolve`方法将现有对象转为 Promise 对象

若`Promise.resolve`方法的参数不是具有`then`方法的对象，则返回一个新的 Promise 对象，且状态为 Resolved。如下：

```javascript
Promise.resolve('value');
// 等价于
new Promise(resolve => resolve('value'));
```

## 10. Promise.reject()

`Promise.reject`方法也会返回一个新的 Promise 对象，且状态为 Rejected。如下：

```javascript
Promise.reject('error');
// 等价于
new Promise((resolve, reject) => reject('error'));
```