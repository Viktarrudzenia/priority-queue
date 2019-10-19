const MaxHeap = require("./max-heap.js");

class PriorityQueue {
  constructor(maxSize) {
    this.maxSize = maxSize || 30;
    this.heap = new MaxHeap();
  }

  push(data, priority) {
    if (this.size() === this.maxSize) {
      throw new Error("maxSize more than 30");
    }
    this.heap.push(data, priority);
  }

  shift() {
    if (this.heap.isEmpty()) {
      throw new Error("maxHeap is empty!");
    }
    return this.heap.pop();
  }

  size() {
    return this.heap.size;
  }

  isEmpty() {
    this.heap.isEmpty();
  }
}

module.exports = PriorityQueue;
