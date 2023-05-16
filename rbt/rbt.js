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
  }
}

var Groot = null;
var Gx = 900;
var Gy = -370;



/*class RBT {
  constructor() {
    this.root = null;
  }

  //function RBTree() {
    //this.root = null;
  //}
})*/

  function amount(node, level) {
    var i = 0; cnt = 0;
    if (node == 0) {
      return 0;
    } else if (i == level) {
      return node.value;
    } else {
      i++;
      if (node.left) {
        cnt += amount(node.left, level);
      }
      if (node.right) {
        cnt += amount(node.right, level);
      }
    }
    return cnt;
  }

  var gy = -660;
  function levels(node) {
    if (!node) {
      return;
    }
    var x = 900;
    var y = gy;
    var f = 0;
    var queue = [];
    queue.push(node);
    var curr = null;
    while(queue.length) {
      f++;
      var cnt = 1;
      var counter = 1;
      var x_p = x, y_p = y;
      while (queue.length || cnt > 0) {
        curr = queue.pop();
        if (curr != Groot) {
          cnt = amount(Groot, f);
          counter = cnt;
        }
        console.log(cnt);
        console.log(curr.value);

        if (curr != Groot && curr.value < curr.parent.value) {
          x = x - 45;
        }

        if (curr != Groot && curr.value > curr.parent.value) {
          x = x + 45;
        }

        if (curr.color == "red") {
          var res = '<div id="tag" style="text-align:center; border: 1px solid red; height: 20px; width: 20px; border-radius: 50%; opacity: 1; color: red; position: relative; right:'
          + (-x) + 'px; top:' + (y) + 'px;">' + curr.value + '</div> ';
        } else {
          var res = '<div id="tag" style="text-align:center; border: 1px solid black; height: 20px; width: 20px; border-radius: 50%; opacity: 1; color: black; position: relative; right:'
          + (-x) + 'px; top:' + (y) + 'px;">' + curr.value + '</div> ';        
        }
        var div = document.createElement("div");
        //div.id = tag;
        //div.addEventListener("click", insertValue);
        //document.body.appendChild(div);
        div.innerHTML = res;
        document.getElementsByTagName('body')[0].appendChild(div);
        //lineDraw(x_p, y_p, x, y);
        //drawMyLine(x, y, x_p, x_p);

        x = x + 45;
        cnt--;
      }
      y = y + 30;
      x = x - counter * 45;

      if(curr.right) {
        queue.push(curr.right);
      }

      if (curr.left) {
        queue.push(curr.left);
      }
    }
    gy = gy + 70;
  }

  /*let canvas = document.getElementById('drawLine');
  let ctx = canvas.getContext('2d');
  function drawMyLine(x,y,x_p,x_p){
  ctx.moveTo(0,400);
  ctx.lineTo(200,700);
  ctx.strokeStyle = "red"; 
  ctx.lineWidth = "10"; 
  ctx.stroke(); 
}*/

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
    //console.log("setColor " + color);
  }

  function insertBST(node, ptr) {
    if(!node) {
      return ptr;
    }
    if(ptr.value < node.value) {
      node.left = insertBST(node.left, ptr);
      node.left.parent = node;
    } else if (ptr.value > node.value) {
      node.right = insertBST(node.right, ptr);
      node.right.parent = node;
    }
    return node;
  }

  function insertValue() {
    event.preventDefault();
    var value = document.getElementById("input").in.value;
    if (value == "") {
      document.getElementById("error").innerHTML = "введите значение";
      return;
    } else if (value < -100 || value > 100) {
      document.getElementById("error").innerHTML = "недопустимое значение";
      return;
    }

    console.log("insertValue begin" + value);

    var newNode = new Node(value);
    Groot = insertBST(Groot, newNode);
    fixInsertRBTree(newNode);
    //clearBox("tag", newNode);
    levels(Groot);
    //clearBox("tag", newNode);

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
    if (node == Groot) {
      Groot = null;
      return;
    }

    if(getColor(node) == "red" || getColor(node.left) == "red" || getColor(node.right) == "red") {
      var child;
      if (node.left) {
        child = node.left;
      } else {
        child = node.right;
      }

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
    if (!node) {
      return node;
    }
    if (value < node.value) {
      return deleteBST(node.left, value);
    }
    if (value > node.value) {
      return deleteBST(node.right, value);
    }
    if (!node.left || !node.right) {
      return node;
    }

    var tmp = minValueNode(node.right);
    node.value = tmp.value;
    return deleteBST(node.right, tmp.data);
  }

  function deleteValue() {
    event.preventDefault();
    var value = document.getElementById("delete").del.value;
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
    levels(Groot);

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

  function preorderBST(ptr) {
    if (!ptr) {
      return;
    }
    console.log(ptr.value + " " + ptr.color);
    preorderBST(ptr.left);
    preorderBST(ptr.right);
  }

  function preorder() {
    preorderBST(Groot);
    console.log("------");
  }

  function maxValueNode(node) {
    var ptr = node;
    while(ptr.right) {
      ptr = ptr.right;
    }
    return ptr;
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
    //console.log("root at height " + Groot.value);
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
    if (value == node.value) {
      return node;
    }
    if (value < node.value) {
      return findValueRec(node.left, value);
    }
    if (value > node.value) {
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
