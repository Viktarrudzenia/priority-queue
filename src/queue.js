const MaxHeap = require("./max-heap.js");

class PriorityQueue {
  constructor(maxSize) {
    this.maxSize = maxSize || 30;
    this.heap = new MaxHeap();
  }

  push(data, priority) {
    if (this.maxSize >= 30) {
      throw new Error("maxSize more than 30");
    }
    this.heap.push(data, priority);
  }

  shift() {}

  size() {}

  isEmpty() {}
}

module.exports = PriorityQueue;
