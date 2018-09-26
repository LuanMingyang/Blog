/**
 * 统计一个数字在排序数组中出现的次数。
 * 
 * 方案一：
 * 二分查找，找到一个目标数字，在左右两侧顺序扫描，分别找出第一个和最后一个目标数字。
 * 时间复杂度O(N)，与直接从头遍历查找时间复杂度是相等的。
 * 方案二：
 * 更好地利用二分查找。时间复杂度O(logn)
 * 先利用二分查找找到一个k，判断这个k是不是第一个k，若不是，在数组的前半段继续二分查找，直到找到第一个k；
 * 利用同样的思路找到最后一个k；
 * 分别找到第一个与最后一个k的下标后，就能计算出k在数组中出现的次数。
 */
function getNumberOfK(data, k) {
  if (!data || data.length <= 0) {
    return 0;
  }

  let first = getFirst(data, k, 0, data.length - 1);
  let last = getLast(data, k, 0, data.length - 1);
  if (first > -1 && last > -1) {
    return  last - first + 1;
  }
  return 0;
}

function getFirst(data, k, l, r) {
  let mid;
  while (l <= r) {
    mid = l + ((r - l) >> 1);
    if (data[mid] < k) {
      l = mid + 1;
    } else if (data[mid] > k) {
      r = mid - 1;
    } else {
      if ((mid > 0 && data[mid - 1] !== k) || mid === 0) {
        return mid;
      } else {
        r = mid - 1;
      }
    }
  }
  return -1;
}

function getLast(data, k, l, r) {
  let mid;
  while (l <= r) {
    mid = l + ((r - l) >> 1);
    if (data[mid] < k) {
      l = mid + 1;
    } else if (data[mid] > k) {
      r = mid - 1;
    } else {
      if ((mid < data.length - 1 && data[mid + 1] !== k) || mid === data.length - 1) {
        return mid;
      } else {
        l = mid + 1;
      }
    }
  }
  return -1;
}
