document.getElementById("input").addEventListener("submit", insertValue);
document.getElementById("delete").addEventListener("submit", deleteValue);
document.getElementById("find").addEventListener("submit", findValue);
document.getElementById("print").addEventListener("submit", print);
document.getElementById("printH").addEventListener("submit", getHeight);

class Node {
  constructor(value) {
    this.color = "red";
    this.value = value;
    this.left = null;
    this.right = null;
    this.parent = null;
    this.id = 0;
    this.element = value;
  }
}

var Groot = null;
v = 40;
radius = 20;

function draw() {
  var canvas = document.getElementById('drawLine');
  var context = canvas.getContext("2d");

  canvas.width = window.innerWidth - 100;
  canvas.height = window.innerHeight - 20;        
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.font = "16px times new roman";
  context.strokeStyle = "black";
        
  if (!Groot) {
    context.fillText("введите значение", canvas.width / 2 - 50, 15);  
  } else {
    x = canvas.width / 2;
    y = 25;
          
    drawTree(context, x, y, radius, Groot, canvas.width / 7);
  }
  context.stroke();
}

function drawTree(context, x, y, radius, root, h) {
  if (root.color == "red") {
    context.fillStyle="#f03526";   
  } else {
    context.fillStyle="black";
  }

  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2, false);  
  context.closePath();
  context.fill();

  context.fillStyle="white";
  context.fillText(root.value + "", x - 3, y + 5);

  if (root.left) {
    connectTwoCircles(context, x, y, x - h, y + v);
    context.moveTo(x - h + radius, y + v); 
    drawTree(context, x - h, y + v, radius, root.left, h / 2);
  }
       
  if (root.right) {
    connectTwoCircles(context, x, y, x + h, y + v);
    context.moveTo(x + h + radius, y + v); 
    drawTree(context, x + h, y + v, radius, root.right, h / 2);
  }
}
      
function connectTwoCircles(context, x1, y1, x2, y2) {
  context.fillStyle="black";
  var d = Math.sqrt(v * v + (x2 - x1) * (x2 - x1));
  var x11 = x1 - radius * (x1 - x2) / d;
  var y11 = y1 - radius * (y1 - y2) / d;
  var x21 = x2 + radius * (x1 - x2) / d;
  var y21 = y2 + radius * (y1 - y2) / d;
  context.moveTo(x11, y11);
  context.lineTo(x21, y21);
  context.stroke();
} 

  function getColor(node) {
    if (!node) {
      return "black";
    }
    return node.color;
  }

  function setColor(node, color) {
    if(!node) {
      return;
    }
    node.color = color;
  }

  function insertBST(node, ptr) {
    if(!node) {
      return ptr;
    }

    var x1 = Number(ptr.element), x2 = Number(node.element);
    if (x1 < x2) {
      node.left = insertBST(node.left, ptr);
      node.left.parent = node;
    } else if (x1 > x2) {
      node.right = insertBST(node.right, ptr);
      node.right.parent = node;
    }
    return node;
  }

  function insertValue() {
    event.preventDefault();
    var value = document.getElementById("input").in.value;
    document.getElementById("error").innerHTML = "";
    if (value == "") {
      document.getElementById("error").innerHTML = "введите значение";
      return;
    } else if (value <= -100 || value >= 100) {
      document.getElementById("error").innerHTML = "недопустимое значение";
      return;
    } else if (findValueRec(Groot, value)) {
      document.getElementById("error").innerHTML = "в дереве уже есть данный элемент";
      return;
    }

    console.log("insertValue begin" + value);

    var newNode = new Node(value);
    Groot = insertBST(Groot, newNode);

    fixInsertRBTree(newNode);
    draw();

    console.log("insertValue end " + newNode.color);
    console.log("root " + Groot.value);
  }

  function rotateLeft(ptr) {
    var right_child = ptr.right;
    ptr.right = right_child.left;

    if(ptr.right) {
      ptr.right.parent = ptr;
    }
    right_child.parent = ptr.parent;
    if(!ptr.parent) {
      Groot = right_child;
    } else if (ptr == ptr.parent.left) {
      ptr.parent.left = right_child;
    } else {
      ptr.parent.right = right_child;
    }
    right_child.left = ptr;
    ptr.parent = right_child;
  }

  function rotateRight(ptr) {
    var left_child = ptr.left;
    ptr.left = left_child.right;

    if (ptr.left) {
      ptr.left.parent = ptr;
    }
    left_child.parent = ptr.parent;

    if (!ptr.parent) {
      Groot = left_child;
    } else if (ptr == ptr.parent.left) {
      ptr.parent.left = left_child;
    } else {
      ptr.parent.right = left_child;
    }

    left_child.right = ptr;
    ptr.parent = left_child;
  }

  function fixInsertRBTree(ptr) {
    var parent = null;
    var grandparent = null;
    while(ptr != Groot && getColor(ptr) == "red" && getColor(ptr.parent) == "red") {
      parent = ptr.parent;
      grandparent = parent.parent;
      if (parent == grandparent.left) {
        var uncle = grandparent.right;
        if (getColor(uncle) == "red") {
          setColor(uncle, "black");
          setColor(parent, "black");
          setColor(grandparent, "red");
          ptr = grandparent;
        } else {
          if (ptr == parent.right) {
            rotateLeft(parent);
            ptr = parent;
            parent = ptr.parent;
          }
          rotateRight(grandparent);
          var tmp = parent.color;
          parent.color = grandparent.color;
          grandparent.color = tmp;
          ptr = parent;
        }
      } else {
        var uncle = grandparent.left;
        if (getColor(uncle) == "red") {
          setColor(uncle, "black");
          setColor(parent, "black");
          setColor(grandparent, "red");
          ptr = grandparent;
        } else {
          if (ptr == parent.left) {
            rotateRight(parent);
            ptr = parent;
            parent = ptr.parent;
          }
          rotateLeft(grandparent);
          var tmp = parent.color;
          parent.color = grandparent.color;
          grandparent.color = tmp;
          ptr = parent;
        }
      }
    }
    setColor(Groot, "black");
  }

  function fixDeleteRBTree(node) {
    if(!node) {
      return;
    }

    if (node == Groot && !node.right && !node.left) {
      console.log("no " + node.value);
      Groot = null;
      return;
    }

    if (node == Groot && (!node.right || !node.left)) {
      if (!node.right) {
        node = node.left;
      } else {
        node = node.right;
      }
      Groot = node;
      console.log("yes " + node.value);
      return;
    }

    if(getColor(node) == "red" || getColor(node.left) == "red" || getColor(node.right) == "red") {
      var child = node.left ? node.left : node.right;
      if (node == node.parent.left) {
        node.parent.left = child;
        if (child) {
          child.parent = node.parent;
        }
        setColor(child, "black");
        delete node;
      } else {
        node.parent.right = child;
        if(child) {
          child.parent = node.parent;
        }
        setColor(child, "black");
        delete node;
      }
    } else {
      var sibling = null;
      var parent = null;
      var ptr = node;
      setColor(ptr, "double black");
      while (ptr != Groot && getColor(ptr) == "double black") {
        parent = ptr.parent;
        if (ptr == parent.left) {
          sibling = parent.right;
          if (getColor(sibling) == "red") {
            setColor(sibling, "black");
            setColor(parent, "red");
            rotateLeft(parent);
          } else {
            if (getColor(sibling.left) == "black" && getColor(sibling.right) == "black") {
              setColor(sibling, "red");
              if (getColor(parent) == "red") {
                setColor(parent, "black");
              } else {
                setColor(parent, "double black");
              }
              ptr = parent;
            } else {
              if (getColor(sibling.right) == "black") {
                setColor(sibling.left, "black");
                setColor(sibling, "red");
                rotateRight(sibling);
                sibling = parent.right;
              }
              setColor(sibling, parent.color);
              setColor(parent, "black");
              setColor(sibling.right, "black");
              rotateLeft(parent);
              break;
            }
          }
        } else {
          sibling = parent.left;
          if (getColor(sibling) == "red") {
            setColor(sibling, "black");
            setColor(parent, "red");
            rotateRight(parent);
          } else {
            if (getColor(sibling.left) == "black" && getColor(sibling.right) == "black") {
              setColor(sibling, "red");
              if (getColor(parent) == "red") {
                setColor(parent, "black");
              } else {
                setColor(parent, "double black");
              }
              ptr = parent;
            } else {
              if (getColor(sibling.left) == "black") {
                setColor(sibling.right, "black");
                setColor(sibling, "red");
                rotateLeft(sibling);
                sibling = parent.left;
              }
              setColor(sibling, parent.color);
              setColor(parent, "black");
              setColor(sibling.left, "black");
              rotateRight(parent);
              break;
            }
          }
        }
      }
      if (node == node.parent.left) {
        node.parent.left = null;
      } else {
        node.parent.right = null;
      }
      delete node;
      setColor(Groot, "black");
    }
  }

  function deleteBST(node, value) {
    console.log("delteBst");
    if (!node) {
      return node;
    }
    if (value < Number(node.value)) {
      return deleteBST(node.left, value);
    }
    if (value > Number(node.value)) {
      return deleteBST(node.right, value);
    }
    if (!node.left || !node.right) {
      return node;
    }

    var tmp = minValueNode(node.right);
    console.log("tmp " + tmp.value);
    node.value = tmp.value;
    return deleteBST(node.right, tmp.value);
  }

  function deleteValue() {
    event.preventDefault();
    var value = document.getElementById("delete").del.value;
    document.getElementById("errord").innerHTML = "";
    if (value == "") {
      document.getElementById("errord").innerHTML = "введите значение";
      return;
    } else if (value < -100 || value > 100) {
      document.getElementById("errord").innerHTML = "недопустимое значение";
      return;
    } else if (!findValueRec(Groot, value)) {
      document.getElementById("errord").innerHTML = "в дереве нет данного элемента";
      return;
    }

    console.log("delteValue begin " + value);

    var node = deleteBST(Groot, value);
    fixDeleteRBTree(node);
    draw();

    console.log("delteValue end " + value);
  }

  var arr = [];
  var i;

  function printRBTree(node) {
    if (!node) {
      return;
    }
    printRBTree(node.left);
    arr[i] = node.value;
    i++;
    console.log(node.value + " " + node.color);
    printRBTree(node.right);
  }

  function print() {
    event.preventDefault();
    for (var j = 0; j <= i; j++) {
        arr[j] = ' ';
    }
    i = 0;

    printRBTree(Groot);
    document.getElementById("printVals").innerHTML = arr.join(' ');
    if (!Groot) {
      document.getElementById("printVals").innerHTML = "no elements";
    }
  }

  function minValueNode(node) {
    var ptr = node;
    while(ptr.left) {
      ptr = ptr.left;
    }
    return ptr;
  }

  function max(a, b) {
    if (a > b) {
      return a;
    } else {
      return b;
    }
  }

  function getHeightRec(node) {
    if (!node) {
      return 0;
    }
    return 1 + max(getHeightRec(node.left), getHeightRec(node.right));
  }

  function getHeight() {
    event.preventDefault();
    if (!Groot) {
      document.getElementById("printHeight").innerHTML = 0;
      return;
    }
    var height = getHeightRec(Groot);
    document.getElementById("printHeight").innerHTML = height;
  }

  function findValueRec(node, value) {
    if (node == null) {
      return null;
    }
    if (value == Number(node.value)) {
      return node;
    }
    if (value < Number(node.value)) {
      return findValueRec(node.left, value);
    }
    if (value > Number(node.value)) {
      return findValueRec(node.right, value);
    }
  }

  function findValue() {
    event.preventDefault();
    var value = document.getElementById("find").fin.value;
    if (value == "") {
      document.getElementById("ans").innerHTML = "введите значение";
      return;
    } else if (value < -100 || value > 100) {
      document.getElementById("ans").innerHTML = "недопустимое значение";
      return;
    }
    var ans = findValueRec(Groot, value);
    if (ans != null) {
      document.getElementById("ans").innerHTML = "true";
    } else {
      document.getElementById("ans").innerHTML = "false";
    }
  }




























