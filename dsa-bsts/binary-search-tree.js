class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  // insert(val): insert a new node into the BST with value val using iteration.
  insert(val) {
    const newNode = new Node(val);
    if (this.root === null) {
      this.root = newNode;
      return this;
    }

    let current = this.root;
    while (true) {
      if (val < current.val) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else if (val > current.val) {
        if (current.right === null) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      } else {
        return this; // value already exists in the tree
      }
    }
  }

  // insertRecursively(val): insert a new node into the BST with value val using recursion.
  insertRecursively(val, node = this.root) {
    if (this.root === null) {
      this.root = new Node(val);
      return this;
    }

    if (val < node.val) {
      if (node.left === null) {
        node.left = new Node(val);
        return this;
      } else {
        return this.insertRecursively(val, node.left);
      }
    } else if (val > node.val) {
      if (node.right === null) {
        node.right = new Node(val);
        return this;
      } else {
        return this.insertRecursively(val, node.right);
      }
    } else {
      return this; // value already exists
    }
  }

  // find(val): search the tree for a node with value val using iteration.
  find(val) {
    let current = this.root;
    while (current) {
      if (val === current.val) return current;
      if (val < current.val) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return undefined;
  }

  // findRecursively(val): search the tree for a node with value val using recursion.
  findRecursively(val, node = this.root) {
    if (node === null) return undefined;
    if (val === node.val) return node;
    if (val < node.val) return this.findRecursively(val, node.left);
    return this.findRecursively(val, node.right);
  }

  // dfsPreOrder(): Traverse the tree using pre-order DFS and return an array of visited nodes.
  dfsPreOrder() {
    let result = [];
    function traverse(node) {
      result.push(node.val);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }
    traverse(this.root);
    return result;
  }

  // dfsInOrder(): Traverse the tree using in-order DFS and return an array of visited nodes.
  dfsInOrder() {
    let result = [];
    function traverse(node) {
      if (node.left) traverse(node.left);
      result.push(node.val);
      if (node.right) traverse(node.right);
    }
    traverse(this.root);
    return result;
  }

  // dfsPostOrder(): Traverse the tree using post-order DFS and return an array of visited nodes.
  dfsPostOrder() {
    let result = [];
    function traverse(node) {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      result.push(node.val);
    }
    traverse(this.root);
    return result;
  }

  // bfs(): Traverse the tree using BFS and return an array of visited nodes.
  bfs() {
    let result = [];
    let queue = [this.root];

    while (queue.length) {
      let current = queue.shift();
      result.push(current.val);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }

    return result;
  }

  // remove(val): Removes a node in the BST with the value val. (Further study)
  remove(val) {
    function removeNode(node, val) {
      if (node === null) return null;
      if (val === node.val) {
        // Node with no children (leaf node)
        if (node.left === null && node.right === null) return null;
        // Node with one child
        if (node.left === null) return node.right;
        if (node.right === null) return node.left;
        // Node with two children
        let temp = node.right;
        while (temp.left !== null) {
          temp = temp.left;
        }
        node.val = temp.val;
        node.right = removeNode(node.right, temp.val);
        return node;
      } else if (val < node.val) {
        node.left = removeNode(node.left, val);
        return node;
      } else {
        node.right = removeNode(node.right, val);
        return node;
      }
    }
    this.root = removeNode(this.root, val);
  }

  // isBalanced(): Returns true if the BST is balanced, false otherwise.
  isBalanced() {
    function height(node) {
      if (node === null) return -1;
      let leftHeight = height(node.left);
      let rightHeight = height(node.right);
      return Math.max(leftHeight, rightHeight) + 1;
    }

    function checkBalance(node) {
      if (node === null) return true;
      let leftHeight = height(node.left);
      let rightHeight = height(node.right);
      if (Math.abs(leftHeight - rightHeight) > 1) return false;
      return checkBalance(node.left) && checkBalance(node.right);
    }

    return checkBalance(this.root);
  }

  // findSecondHighest(): Find the second highest value in the BST.
  findSecondHighest() {
    if (!this.root || (!this.root.left && !this.root.right)) return undefined;

    let current = this.root;
    let parent = null;

    while (current.right) {
      parent = current;
      current = current.right;
    }

    // Case where the node has a left subtree
    if (current.left) {
      current = current.left;
      while (current.right) current = current.right;
      return current.val;
    }

    return parent.val;
  }
}

module.exports = BinarySearchTree;
