class Node {
  constructor(data = 0) {
    this.data = data;
    this.next = null;
  }
}

const create = (a) => {
  let head = new Node(a[0]);
  let last = head;

  for (let i = 1; i < a.length; i++) {
    let temp = new Node(a[i]);
    last.next = temp;
    last = temp;
  }
  return head;
};

const display = (node) => {
  while (node) {
    console.log(node.data);
    node = node.next;
  }
};

const mainMenu = () => {
  let a = [2, 3, 5, 7, 8];
  let head = create(a);
  display(head);
};

mainMenu();
