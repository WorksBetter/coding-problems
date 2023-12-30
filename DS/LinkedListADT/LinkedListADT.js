class Node {
  constructor(data = 0) {
    this.data = data;
    this.next = null;
  }
}

class LinkedListADT {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  createFromArray = (a) => {
    this.head = new Node(a[0]);
    let last = this.head;

    for (let i = 1; i < a.length; i++) {
      let temp = new Node(a[i]);
      last.next = temp;
      last = temp;
    }
  };

  insert = (pos, data) => {
    if (pos < 0 || pos > this.count()) return false;
    let t = new Node(data);
    if (pos == 0) {
      t.next = this.head;
      this.head = t;
      return true;
    }
    let p = this.head;
    for (let i = 0; i < pos - 1 && p; i++) {
      p = p.next;
    }
    if (p) {
      t.next = p.next;
      p.next = t;
      return true;
    }
    return false;
  };

  insertAtLast = (data) => {
    let t = new Node(data);
    if (this.head == null) {
      this.head = t;
      this.tail = t;
    } else {
      this.tail.next = t;
      this.tail = t;
    }
  };

  insertAtSorted = (data) => {
    let t = new Node(data);
    if (this.head == null) {
      this.head = t;
      this.tail = t;
    } else {
      let p = this.head;
      let q = null;
      while (p && p.data < data) {
        q = p;
        p = p.next;
      }
      if (p == this.head) {
        t.next = this.head;
        this.head = t;
      } else {
        t.next = q.next;
        q.next = t;
      }
    }
  };

  delete = (pos) => {
    if (pos < 1 || pos > this.count()) return -1;
    let x = -1;
    if (pos == 1) {
      x = this.head.data;
      this.head = this.head.next;
    } else {
      let p = this.head;
      let q = null;
      for (let i = 0; i < pos - 1 && p; i++) {
        q = p;
        p = p.next;
      }
      if (p) {
        x = p.data;
        q.next = p.next;
      }
    }
    return x;
  };

  display = () => {
    let node = this.head;
    while (node) {
      console.log(node.data);
      node = node.next;
    }
  };

  displayRec = (node = this.head) => {
    if (node) {
      console.log(node.data);
      this.displayRec(node.next);
    }
  };

  count = () => {
    let node = this.head;
    let count = 0;
    while (node) {
      count++;
      node = node.next;
    }
    return count;
  };

  countRec = (node = this.head) => {
    if (!node) return 0;
    return this.countRec(node.next) + 1;
  };

  add = () => {
    let node = this.head;
    let sum = 0;
    while (node) {
      sum += node.data;
      node = node.next;
    }
    return sum;
  };

  addRec = (node = this.head) => {
    if (!node) return 0;
    return node.data + this.addRec(node.next);
  };

  max = () => {
    let node = this.head;
    let max = Number.MIN_VALUE;

    while (node) {
      if (node.data > max) {
        max = node.data;
      }
      node = node.next;
    }
    return max;
  };

  maxRec = (node = this.head) => {
    if (!node) return Number.MIN_VALUE;
    return Math.max(node.data, this.maxRec(node.next));
  };

  search = (key) => {
    let node = this.head;
    while (node) {
      if (node.data == key) {
        return true;
      }
      node = node.next;
    }
    return false;
  };

  searchRec = (key, node = this.head) => {
    if (!node) return false;
    if (key == node.data) return true;
    else return this.searchRec(key, node.next);
  };

  searchOptimized = (key, node = this.head) => {
    let prev = null;
    while (node) {
      if (key == node.data) {
        if (prev) {
          prev.next = node.next;
          node.next = this.head;
          this.head = node;
        }
        return true;
      }
      prev = node;
      node = node.next;
    }
    return false;
  };
}

const mainMenu = () => {
  let a = [10, 20, 30, 40, 50];
  const list = new LinkedListADT();
  list.createFromArray(a);
  list.display();
  // list.displayRec();
  // console.log("Count ", list.count());
  // console.log("Count Recursive ", list.countRec());
  // console.log("Sum ", list.add());
  // console.log("Sum Recursive ", list.addRec());
  // console.log("Max ", list.max());
  // console.log("Max Recursive ", list.maxRec());
  // console.log("Search ", list.search(1));
  // console.log("Search Recursive ", list.searchRec(8));
  // console.log("Search Optimized ", list.searchOptimized(3));
  // console.log("Insert ", list.insert(0, 10));
  // console.log("Append ", list.insertAtLast(8));
  // console.log("Insert at Sorted ", list.insertAtSorted(55));
  console.log("Delete ", list.delete(9));

  list.display();
};

mainMenu();
