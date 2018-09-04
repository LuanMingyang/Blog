/**
 * 把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。
 * 输入一个非减排序的数组的一个旋转，输出旋转数组的最小元素。
 * 例如，数组[3,4,5,1,2]为[1,2,3,4,5]的一个旋转，该数组的最小值为1。
 * NOTE：给出的所有元素都大于0，若数组大小为0，请返回0。
 * 
 * 注意题目中：非减排序数组
 * 数组实际上分为了两个非减排序数组，且第二个数组的最大值小于等于第一个数组的任意值
 * 利用二分法
 * 找到开始时的左侧位置left，中间位置mid，右边位置right
 * 若mid处的值比right处的值大，说明mid处于第一个数组中，最小值还在右侧，left = mid
 * 否则说明最小值在左侧，right = mid
 * 
 * 注意几种比较特殊的情况：
 * 原数组[0,1]，旋转数组[1,0]
 * 原数组[1,2,3,4,5]，旋转数组[1,2,3,4,5]
 * 原数组[0,1,1,1,1]，旋转数组[1,0,1,1,1]
 */
function minNumberInRotateArray(rotateArray) {
  if (!rotateArray || rotateArray.length === 0) {
    return 0;
  }
  let left = 0;
  let right = rotateArray.length - 1;
  let mid = left + ((right - left) >> 1);
  while (left + 1 < right) {
    if (rotateArray[mid] > rotateArray[right]) {
      left = mid;
    } else {
      right = mid;
    }
    mid = left + ((right - left + 1) >> 1);
  }
  return Math.min(rotateArray[left], rotateArray[right]);
}
