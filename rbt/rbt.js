document.getElementById("input").addEventListener("submit", insertValue);
document.getElementById("delete").addEventListener("submit", deleteValue);
document.getElementById("find").addEventListener("submit", findValue);
document.getElementById("print").addEventListener("submit", print);
document.getElementById("printH").addEventListener("submit", getHeight);

/*function help(event) {
  event.preventDefault();

  var el = document.getElementById("printH");

  //var val = el.print.value
  //console.log(val);

  var fail = "";
  //if (val == "" || val < -100 || val > 100) {
    //fail = "некорректное значение";
  //} 

  /*if (fail != "") {
    document.getElementById("errorf").innerHTML = fail;
  }*/

  /*var arr = [];
  for (var i = 0; i < 10; i++) {
    arr[i] = i;
  }*/
  /*var h = 4;
  document.getElementById("printHeight").innerHTML = h;
}

const dx = 200
const dy = 100
const dxNext = 100
const dyNext = 100

let nodesEl = document.getElementById('nodes')
let linesEl = document.getElementById('lines')

let viewBox = {
    x: 1200,
    y: 1200
}

const circleDefaultAttrs = {
    r: 30,
    fill: "#96BAFF",
    stroke: "#7C83FD",
    "stroke-width": 2,
    class: "circle"
}

const textDefaultAttrs = {
    "text-anchor":"middle" ,
    fill:"#2C2E43",
    class:"nodeValue",
}

const lineDefaultAttrs = {
    "stroke-width":"2",
    stroke:"black",
    class:"nodeLines"
}

const addDefaultAttrs = (el, attrs) => {
    for(const [key,value] of Object.entries(attrs)) {
        el.setAttribute(key,value)
    }
}

const createCircle = (cx,cy) => {
    let circle = document.createElementNS("http://www.w3.org/2000/svg",'circle')
    circle.setAttribute('cx',cx)
    circle.setAttribute('cy',cy)
    addDefaultAttrs(circle, circleDefaultAttrs)

    return circle
}

const createText = (content,x,y) => {
    let text = document.createElementNS("http://www.w3.org/2000/svg",'text')
    text.setAttribute('x', x)
    text.setAttribute('y', y+5)
    text.innerHTML = content
    addDefaultAttrs(text, textDefaultAttrs)

    return text
}

const findNodeIndex = (id) => {
    let node = nodes.map((e) => e.id).indexOf(id);
    return node;
}

const getLineCoordinate = (node) => {
    let parent = node.parent;
    let theta = 25
    let x1r = circleDefaultAttrs.r * Math.cos(theta * (Math.PI/180))
    let x2r = circleDefaultAttrs.r * Math.cos(theta * (Math.PI/180))

    let x1 = node.value > parent.value ? parent.cx + x1r : parent.cx - x1r
    let y1 = parent.cy + circleDefaultAttrs.r * Math.sin(theta * (Math.PI / 180))
    let x2 = node.value > parent.value ? node.cx - x2r : node.cx + x2r
    let y2 = node.cy - circleDefaultAttrs.r * Math.sin(30 * (Math.PI / 180))

    return {x1, y1, x2, y2}
}

const createLine = (x1,y1,x2,y2) => {
    let line = document.createElementNS("http://www.w3.org/2000/svg",'line')
    line.setAttribute('x1', x1)
    line.setAttribute('x2', x2)
    line.setAttribute('y1', y1)
    line.setAttribute('y2', y2)
    addDefaultAttrs(line, lineDefaultAttrs)

    return line
}

const drawNode = (nodee, nodeId) => {
    let group = document.createElementNS("http://www.w3.org/2000/svg",'g');
    group.classList.add('node');
    
    let node2 = nodee;
    let parent = nodee.parent;
    
    group.classList.add(`node2-${node2.id}`)

    // if the parent id is root
    let theDx = (parent && parent.id == Groot.id) ? dx : dxNext
    let theDy = (parent && parent.id == Groot.id) ? dy : dyNext

    if(!parent) {
        // if no parent, then this is root
        node2.cx = viewBox.x / 2,
        node2.cy = 100
    } else {
        node2.cx = node2.value > parent.value ? parent.cx + theDx : parent.cx - theDx
        node2.cy = parent.cy + theDy
    }

    let circle = createCircle(node2.cx, node2.cy)
    if(parent) {
        let {x1,y1,x2,y2} = getLineCoordinate(node2)
        let line = createLine(x1,y1,x2,y2)

        line.setAttribute('data-from', parent.id)
        line.setAttribute('data-to', node2.id)
        linesEl.appendChild(line)
        //lines.push(line)

        // animate the line
        //gsap.fromTo(line, {attr: {x1,y1,x2:x1, y2:y1}}, {attr:{x1,y1,x2,y2}, duration: 1,  ease:"power4.out"})
    }

    let text = createText(node2.value, node2.cx, node2.cy)

    group.appendChild(circle)
    group.appendChild(text)
    nodesEl.appendChild(group)
    
    node2.circleEl = circle
    node2.textEl = text 

    //gsap.fromTo(group, {opacity: 0}, {opacity:1, duration: 1, delay:1, ease:"power4.out"})
}
*/

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


/*class RBT {
  constructor() {
    this.root = null;
  }

  //var global = 0;

  /*onInput(el) {
    //global = el.value;
    console.log(el.value + "onInput");
    //insertValue(global);
  }*/

  //function RBTree() {
    //this.root = null;
  //}

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
      //ptr.id = randId();
      //drawNode(ptr, ptr.id);
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

    console.log("insertValue end " + newNode.color);
    console.log("root " + Groot.value);
  }

  const randId = () => Math.random().toString(36).substr(2, 5);

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
    forLevel(ptr);
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
      while (ptr != this.root && getColor(ptr) == "double black") {
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
    } else if (!findValue(value)) {
      document.getElementById("errord").innerHTML = "в дереве нет данного элемента";
      return;
    }

    console.log("delteValue begin " + value);

    var node = deleteBST(Groot, value);
    fixDeleteRBTree(node);

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
    /*var inputs = form.getElementById('printVals');
    for (var j = 0; j < inputs.length; j++) {
      inputs[j].innerHTML = '';
    }*/
    document.getElementById("printVals").innerHTML = arr.join(' ');
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
    console.log("root at height " + Groot.value);
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
//}

  function printLevel(node, level, id) {
    if(!node) {
      return false;
    }
    if (level == 1) {
      /*if (ptr.color == "black") {
        let div = document.createElement("div");
        div.className = id;
        //div.text = ptr.value;
        div.addEventListener("click", insertValue);
        document.body.appendChild(div);
      } else if (ptr.color == "red") {
        let div = document.createElement("div");
        div.className = id;
        //div. = ptr.value;
        div.addEventListener("click", insertValue);
        document.body.appendChild(div);
      }*/
      //var str = 
      document.getElementById("id").innerHTML = node.value;
    }
    var left = printLevel(node.left, level - 1);
    var right = printLevel(node.right, level - 1);

    return left || right;
  }

  function forLevel(node) {
    var level = 1;
    while (printLevel(node, level, level)) {
      level++;
    }
  }





























