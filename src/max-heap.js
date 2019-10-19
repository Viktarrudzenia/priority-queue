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

  pop() {
    if (this.size === 0) {
      return;
    } else {
      this.restoreRootFromLastInsertedNode(this.detachRoot());
      this.shiftNodeDown(this.root);
      return this.root;
    }
  }

  detachRoot() {
    this.root = null;
    return this.root;
  }

  restoreRootFromLastInsertedNode(detached) {}

  size() {
    return this.size;
  }

  isEmpty() {
    if (this.size === 0) {
      return true;
    } else {
      return false;
    }
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

      // fashion check for existance of left child
      // can throw error (:
    } else if (this.size % 2 !== 0) {
      this.parentNodes.push(node);
      this.parentNodes[0].appendChild(node);
      this.size += 1;
    } else {
      this.parentNodes.push(node);
      this.parentNodes[0].appendChild(node);
      this.size += 1;
      // just now it right child of parent and not have childs -> delete from PARENT nodes
      this.parentNodes.shift();
    }
  }

  shiftNodeUp(node) {
    //check is our node child of somebody
    if (node.parent !== null) {
      //check is our priority more than parent priority -> if true - swap them
      if (node.priority > node.parent.priority) {
        //check is our parent root (last and higher element)
        if (node.parent === this.root) {
          this.root = node;
        }

        // create variables because below this .ths -> unbind..... collect CORRECT data with CORRECT this
        const indexInThisParentNodesNode = this.parentNodes.indexOf(node);
        const indexInThisParentNodesNodeParent = this.parentNodes.indexOf(node.parent);

        // check if PARENT is right child -> so we can swap with it
        if (indexInThisParentNodesNodeParent !== -1) {
          this.parentNodes[indexInThisParentNodesNodeParent] = node;
          this.parentNodes[indexInThisParentNodesNode] = node.parent; // fUUU dat this .this
        } else {
          this.parentNodes[indexInThisParentNodesNode] = node.parent;
        }

        node.swapWithParent();
        this.shiftNodeUp(node);
      }
      // if we are not child of somebody - we are root 8)
    } else {
      this.root = node;
    }
  }

  shiftNodeDown(node) {}
}

module.exports = MaxHeap;
