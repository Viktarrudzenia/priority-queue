class Node {
  constructor(data, priority) {
    this.data = data;
    this.priority = priority;
    this.left = null;
    this.right = null;
    this.parent = null;
  }

  appendChild(node) {
    if (this.left !== null && this.right !== null) {
      return;
    } else if (this.left !== null) {
      this.right = node;
    } else {
      this.left = node;
    }

    node.parent = this;
    return this;
  }

  removeChild(node) {
    if (node === this.left) {
      this.left = null;
    } else if (node === this.right) {
      this.right = null;
    } else {
      throw new Error("passed node is not a child of this node");
    }

    node.parent = null;
    return this;
  }

  remove() {
    if (this.parent !== null) {
      this.parent.removeChild(this);
    }
  }

  swapWithParent() {
    // if swapping node have childes -> change it left and right links to current PARENT (couz we change nodes)
    if (this.parent != null) {
      if (this.right) {
        this.right.parent = this.parent;
      }
      if (this.left) {
        this.left.parent = this.parent;
      }

      // check if we RIGHT child of parent -> change links
      if (this === this.parent.right) {
        if (this.parent.left) this.parent.left.parent = this;
        [this.parent.left, this.left] = [this.left, this.parent.left];
        [this.parent.right, this.right] = [this.right, this.parent];
      }

      // check if we LEFT child of parent -> change links and swao
      if (this === this.parent.left) {
        [this.left, this.parent.left] = [this.parent, this.left];
        // check if PARENT have right child -> change links and swap
        if (this.parent.right) this.parent.right.parent = this;
        [this.right, this.parent.right] = [this.parent.right, this.right];
      }

      // check depth for PARENT PARENT, if true -> change links
      if (this.parent.parent) {
        // check PARENT is LEFT CHILD of PARENT PARENT
        if (this.parent === this.parent.parent.left) {
          this.parent.parent.left = this;
        }

        // check PARENT is RIGHT CHILD of PARENT PARENT
        if (this.parent === this.parent.parent.right) {
          this.parent.parent.right = this;
        }
      }
      // last swap
      [this.parent.parent, this.parent] = [this, this.parent.parent];
    }
  }
}

module.exports = Node;
