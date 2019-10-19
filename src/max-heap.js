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
      // create variable to note lose context
      const a = this.detachRoot(); // !!!!!!!!!!! fuuuu
      this.restoreRootFromLastInsertedNode(a);
      this.shiftNodeDown(this.root);
      this.size -= 1; // !!!
      return a.data;
    }
  }

  detachRoot() {
    // save in variable this.root , then return it
    let rootNode = this.root;
    if (this.parentNodes.includes(this.root) != 0) {
      this.parentNodes.shift();
    }
    this.root = null;

    return rootNode;
  }

  restoreRootFromLastInsertedNode(detached) {
    if (this.size === 0) {
      return;
    }
    this.root = this.parentNodes.pop();
  }

  size() {
    return this.parentNodes.length;
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
    return this;
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

  shiftNodeDown(node) {
    // check untill node become invalid with check of left node like a man 8-)
    if (node === null || this.size % 2 !== 0) {
      return;
    }

    // 1. check which child priority higher -> its our client :)
    let leftOrRightHighest = null;

    if (node.left !== null && node.right !== null) {
      node.left.priority > node.right.priority
        ? (leftOrRightHighest = node.left)
        : (leftOrRightHighest = node.right);

      // else we have only left child, so it our client for swap
    } else {
      leftOrRightHighest = node.left;
    }

    // 2. check our leftOrRightHiest priority -> if exist check MY priority with IT
    if (leftOrRightHighest !== null && node.priority < leftOrRightHighest.priority) {
      // collect CORRECT data with CORRECT this --- like in shiftNodeUp method
      const indexInThisParentNodesNode = this.parentNodes.indexOf(node);
      const indexInThisParentNodesChild = this.parentNodes.indexOf(leftOrRightHighest);

      //check does we root now, so we can end this clown fiesta
      if (node === this.root) {
        this.root = leftOrRightHighest;
      }

      // check index of our child -> swap it
      if (indexInThisParentNodesChild !== -1) {
        this.parentNodes[indexInThisParentNodesNode] = this.parentNodes[
          indexInThisParentNodesChild
        ];
        this.parentNodes[indexInThisParentNodesChild] = node;
      }

      // swap it and dat thing which i name " calls itself recursively". eat it tests!
      leftOrRightHighest.swapWithParent();
      this.shiftNodeDown(node);
    }
  }
}

module.exports = MaxHeap;
