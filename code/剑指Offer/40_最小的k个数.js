/**
 * 输入n个整数，找出其中最小的K个数。
 * 例如：输入4,5,1,6,2,7,3,8这8个数字，则最小的4个数字是1,2,3,4。
 * 
 * 解法一：利用partition方法 复杂度O(N) 会改变原数组 不适合海量数据
 * 
 * 解法二：利用大根堆 复杂度O(nlogk) 不会改变原数组 适合海量数据不能一次性载入的情况
 * 创建一个大小为k的大根堆，存储最小的k个数字。
 * 每次读入一个数字，如果堆中数字小于k个，则插入；
 * 否则判断读入的数字是否比堆中最大的数字大，是则丢弃，否则插入这个数字，并删除原来堆中最大的数字。
 */

function getLeastNumbers_Solution1(input, k) {
  if (!input || k < 1 ||  input.length < k) {
    return [];
  }
  let l = 0;
  let r = input.length - 1;
  let index = partition(input, l, r);
  while (index !== k - 1) {
    if (index > k - 1) {
      r = index - 1;
      index = partition(input, l, r);
    } else {
      l = index + 1;
      index = partition(input, l, r);
    }
  }
  return input.slice(0, index + 1).sort((a, b) => a - b);;
}

function partition(arr, l, r) {
  let randomIndex = l + Math.floor(Math.random() * (r - l + 1));
  [arr[randomIndex], arr[r]] = [arr[r], arr[randomIndex]];
  let num = arr[l];

  while (l < r) {
    while (num <= arr[r] && l < r) {
      r--;
    }
    [arr[l], arr[r]] = [arr[r], arr[l]];
    while (num >= arr[l] && l < r) {
      l++;
    }
    [arr[l], arr[r]] = [arr[r], arr[l]];
  }
  return l;
}

function getLeastNumbers_Solution2(input, k) {
  if (!input || k < 1 ||  input.length < k) {
    return [];
  }
  let heap = [];
  for (let i = 0; i < input.length; i++) {
    if (i < k) {
      heap.push(input[i]);
      heapInsert(heap, i);
    } else if (input[i] < heap[0]) {
      heap[0] = input[i];
      heapify(heap, k, 0);
    }
  }
  return heap;
}

function heapInsert(heap, index) {
  let parent = (index - 1) >> 1;
  while (heap[index] > heap[parent]) {
    [heap[parent], heap[index]] = [heap[index], heap[parent]];
    index = parent;
    parent = (parent - 1) >> 1;
  }
}

function heapify(heap, heapSize, index) {
  let leftChild = (index << 1) + 1;
  while (leftChild < heapSize) {
    let largest = leftChild + 1 < heapSize && heap[leftChild + 1] > heap[leftChild] ? leftChild + 1 : leftChild;
    largest = heap[largest] > heap[index] ? largest : index;
    if (largest === index) {
      break;
    }
    [heap[index], heap[largest]] = [heap[largest], heap[index]];
    index = largest;
    leftChild = (index << 1) + 1;
  }
}
