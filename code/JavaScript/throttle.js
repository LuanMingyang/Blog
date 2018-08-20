/**
 * 节流函数，返回函数连续调用时，func 执行频率限定为 次 / wait
 *
 * @param  {function}   func      回调函数
 * @param  {number}     wait      表示时间窗口的间隔
 * @param  {object}     options   如果想忽略开始函数的调用，传入{leading: false}。
 *                                如果想忽略结尾函数的调用，传入{trailing: false}
 *                                两者不能共存，否则函数不能执行
 * @return {function}             返回调用函数   
 */

// 使用时间戳实现
// 立即执行，停止触发后不再执行
function throttle(func, wait) {
  let context, args;

  let previous = 0;
  return function() {
    context = this;
    args = arguments;

    let now = +new Data();
    if (now - previous < wait) {
      func.apply(context, args);
      previous = now;
    }
  }
}

// 使用定时器实现
// 不会立即执行，第一次执行在 wait ms 之后，停止触发后还会执行一次
function throttle(func, wait) {
  let context, args;
  let timeout;

  return function() {
    context = this;
    args = arguments;

    if (!timeout) {
      timeout = setTimeout(function() {
        timeout = null;
        func.apply(context, args);
      }, wait);
    }
  }
}

// 组合实现
function throttle(func, wait, options) {
  let context, args, timeout, result;
  let previous = 0;
  if (!options) options = {};

  let later = function () {
    previous = options.leading === false ? 0 : +new Date();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  }

  let throttled = function () {
    context = this;
    args = arguments;

    let now = +new Date();
    if (!previous && options.leading === false) previous = now;
    let remaining = wait - (now - previous); // 距离下次触发的剩余时间
    if (remaining <= 0) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }

    return result;
  }

  throttled.cancel = function() {
    clearTimeout(timeout);
    previous = 0;
    timeout = null;
  }

  return  throttled;
}
