var _jm = null;
function open_empty() {
  var options = {
    container: "jsmind_container",
    theme: "default",
    editable: true,
    view: {
      engine: "svg",
      draggable: true,
    },
  };

  _jm = jsMind.show(options);
  var empty_map_data = {
    meta: {
      name: "Mindmap",
      author: "Jaydip Dey",
      version: "1",
    },
    format: "node_tree",
    data: {
      id: "root",
      topic: "Root",
      direction: "right",
      expanded: true,
    },
  };

  // Load the empty map data into jsMind
  _jm.show(empty_map_data);
}

let jsonData;
document
  .getElementById("formFile")
  .addEventListener("change", handleFileUpload);

function handleFileUpload(event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        jsonData = JSON.parse(e.target.result);
        console.log(jsonData);
        let jsMindNodeTree = convertToJsMindNodeTree(jsonData);
        open_json(jsMindNodeTree);
        //document.querySelector(".root").style.visibility = "visible";
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    };
    reader.readAsText(file);
  } else {
    console.error("No file selected.");
  }
}
function convertToJsMindNodeTree(obj) {
  function traverse(object, parentId) {
    let nodes = [];

    for (let key in object) {
      const nodeId = parentId ? parentId + "-" + key : key;
      const nodeData = {
        id: nodeId,
        topic: key,
        direction: "right",
        expanded: true,
        val: object[key],
      };

      if (typeof object[key] === "object" && object[key] !== null) {
        const children = traverse(object[key], nodeId);
        if (children.length > 0) {
          nodeData.children = children;
        }
      }

      nodes.push(nodeData);
    }

    return nodes;
  }

  const rootNode = {
    id: "root",
    topic: "Root",
    direction: "right",
    expanded: true,
  };

  rootNode.children = traverse(obj, rootNode.id);
  return rootNode;
}

function open_json(jsMindNodeTree) {
  var mind = {
    meta: {
      name: "Mindmap",
      author: "Jaydip Dey",
      version: "1",
    },
    format: "node_tree",
    data: jsMindNodeTree,
  };
  _jm.show(mind);
}
function toggle_editable(btn) {
  var editable = _jm.get_editable();
  if (editable) {
    _jm.disable_edit();
    btn.innerHTML = "enable editable";
  } else {
    _jm.enable_edit();
    btn.innerHTML = "disable editable";
  }
}
function add_node() {
  var selected_node = _jm.get_selected_node(); // as parent of new node
  if (!selected_node) {
    prompt_info("please select a node first.");
    return;
  }

  var nodeid = jsMind.util.uuid.newid();
  var topic = "New Node";
  var node = _jm.add_node(selected_node, nodeid, topic);
}
function get_selected_nodeid() {
  var selected_node = _jm.get_selected_node();
  if (!!selected_node) {
    return selected_node.id;
  } else {
    return null;
  }
}

function remove_node() {
  var selected_id = get_selected_nodeid();
  if (!selected_id) {
    prompt_info("please select a node first.");
    return;
  }

  _jm.remove_node(selected_id);
}
function set_theme(theme_name) {
  _jm.set_theme(theme_name);
}

function expand_all() {
  _jm.expand_all();
}

function expand_n() {
  _jm.expand_to_depth(parseInt(document.querySelector("#nlevel").value));
}

function collapse_all() {
  _jm.collapse_all();
}

function convertFromJsMindNodeTree(jsMindNode) {
  function traverse(node) {
    //console.log(node);
    const obj = {};
    if (node.children) {
      node.children.forEach((child) => {
        const childKey = child.topic;
        obj[childKey] = traverse(child);
      });
    } else {
      // console.log()
      obj.value = node.val;
    }

    return obj;
  }

  if (jsMindNode.id === "root") {
    return traverse(jsMindNode);
  } else {
    throw new Error("Invalid root node for jsMind tree.");
  }
}
function show_selected() {
  var selected_node = _jm.get_selected_node();
  console.log(selected_node);
  if (!!selected_node && typeof selected_node.data.val == "string") {
    alert(selected_node.data.val);
  } else if (!!selected_node && typeof selected_node.data.val == "object") {
    alert(JSON.stringify(selected_node.data.val));
  }
}

function show_data() {
  var mind_data = _jm.get_data();
  var mind_string = jsMind.util.json.json2string(mind_data);
  let data = JSON.parse(mind_string);
  data = convertFromJsMindNodeTree(data.data);
  const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = "mindmap_data.json";
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}

document.getElementById("zoom-in-button").addEventListener("click", zoomIn);
document.getElementById("zoom-out-button").addEventListener("click", zoomOut);

var zoomInButton = document.getElementById("zoom-in-button");
var zoomOutButton = document.getElementById("zoom-out-button");

let f = false;
function zoomIn() {
  // console.log(document.querySelector("jmnode").innerText);

  // if (!f) {
  //   console.log("IF");
  //   document.querySelector("jmnode").style.visibility = "hidden !important";
  //   return;
  // }

  if (_jm.view.zoomIn()) {
    zoomOutButton.disabled = false;
  } else {
    zoomInButton.disabled = true;
  }
}

function zoomOut() {
  // if ((document.querySelector("jmnode").innerText = "jsMind Example")) {
  //   zoomOutButton.disabled = true;
  //   return;
  // }
  if (_jm.view.zoomOut()) {
    zoomInButton.disabled = false;
  } else {
    zoomOutButton.disabled = true;
  }
}
open_empty();
