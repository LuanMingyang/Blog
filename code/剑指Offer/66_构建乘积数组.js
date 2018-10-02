/**
 * 给定一个数组A[0,1,...,n-1]，请构建一个数组B[0,1,...,n-1]，其中B中的元素B[i]=A[0]*A[1]*...*A[i-1]*A[i+1]*...*A[n-1]。
 * 不能使用除法。
 * 
 * B[i]=A[0]*A[1]*...*A[i-1]*A[i+1]*...*A[n-1]
 * 看成 A[0]*A[1]*...*A[i-1] 和 A[i+1]*...*A[n-2]*A[n-1] 两部分的乘积
 */
function multiply(array) {
  let len = array.length;
  let B = [1];
  for (let i = 1; i < len; i++) {
    B[i] = array[i - 1] * B[i - 1];
  }
  let tmp = 1;
  for (let i = len - 2; i >= 0; i--) {
    tmp *= array[i + 1];
    B[i] *= tmp;
  }
  return B;
}