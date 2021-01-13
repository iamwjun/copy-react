function render(vnode: any, container: any, callback?: Function) {
  console.log(vnode)
  const node = createNode(vnode);
  container.append(node);
}

function isStringOrNumber(str: string | number) {
  return typeof str === 'string' || typeof str === 'number';
}

function createNode(vnode: any) {
  const { type } = vnode;
  console.log(type)
  let node;
  // todo 根据虚拟dom节点, 生成真实dom节点
  if (typeof type === 'string') {
    node = updateHostComponent(vnode)
  } else if (isStringOrNumber(vnode)) {
    //文本数字节点
    node = updateTextComponent(vnode);
  }
  return node;
}

function updateHostComponent(vnode: any) {
  const { type, props } = vnode;
  const node = document.createElement(type);
  reconcileChildren(node, props.children);
  return node;
}

function reconcileChildren(parentNode: any, children: any) {
  const newChildren = Array.isArray(children) ? children : [children];
  for (let i = 0; i < newChildren.length; i++) {
    let child = newChildren[i];
    render(child, parentNode);
  }
}

function updateTextComponent(vnode: any) {
  const node = document.createTextNode(vnode);
  return node;
}

const ReactDOM = {
  render: render
}

export default ReactDOM;