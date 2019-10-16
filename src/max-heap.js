const Node = require("./node");

class MaxHeap {
  constructor() {
    this.root = null;
    this.parentNodes = [];
    this.size = 0;
  }

  push(data, priority) {
    this.insertNode(new Node(data, priority));
    this.shiftNodeUp(new Node(data, priority));
  }

  pop() {}

  detachRoot() {
    this.root = null;
  }

  restoreRootFromLastInsertedNode(detached) {}

  size() {
    return this.size;
  }

  isEmpty() {
    if (!this.size) return true;
  }

  clear() {
    this.root = null;
    this.parentNodes = [];
    this.size = 0;
  }

  insertNode(node) {
    if (this.size === 0) {
      this.root = node;
      this.parentNodes.push(node);
      this.size += 1;
    } else {
      this.parentNodes.push(node);
      this.appendChild(node);
      this.size += 1;
    }
  }

  shiftNodeUp(node) {}

  shiftNodeDown(node) {}
}

module.exports = MaxHeap;
