/**
 * vnode
 * type 原生标签>type string
 *      文本标签>children string number
 *      函数组件>type function
 * props 属性 className href id children等等
 */

/**
 * fiber数据结构
 * type 类型 string->原生标签 function->函数组件、类组件 other->Fragement组件
 * props 属性
 * child 子节点
 * sibling 兄弟节点
 * return 返回父节点
 * statenode 原生dom节点
 */

interface Fiber {
  type: any;
  props: any;
  child: any;
  sibling: any;
  return: any;
  statenode: any;
}

function render(vnode: any, container: any, callback?: Function) {
  //console.log(vnode)
  const node = createNode(vnode);
  container.append(node);
}

function isStringOrNumber(str: string | number) {
  return typeof str === 'string' || typeof str === 'number';
}

function createNode(workInProgress: Fiber): HTMLElement {
  const { type, props } = workInProgress;
  let node = document.createElement(type);
  updateNode(node, props);

  return node;
}

function updateNode(node: any, nextVal: any) {
  Object.keys(nextVal)
    //.filter(k => k !== "children")
    .forEach(k => {
      if (k === "children") {
        if (isStringOrNumber(nextVal[k])) {
          node.textContent = nextVal[k] + ''
        }
      } else {
        node[k] = nextVal[k]
      }
    })
}

function updateHostComponent(workInProgress: Fiber) {
  // todo 更新原生标签
  if (!workInProgress.statenode) {
    return createNode(workInProgress)
  }
  // todo 协调子节点为
  reconcileChildren(workInProgress, workInProgress.props.children);
}

function reconcileChildren(workInProgress: Fiber, children: any) {
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

function updateFunctionComponent(vnode: any) {
  const { type, props } = vnode;
  const child = type(props);
  const node = createNode(child);
  return node;
}

function updateClassComponent(vnode: any) {
  const { type, props } = vnode;
  const instance = new type(props);
  const child = instance.render();
  const node = createNode(child);
  return node;
}

function updateFragmentComponent(vnode: any) {
  const node = document.createDocumentFragment();
  reconcileChildren(node, vnode.props.children);
  return node;
}

//下一个要渲染更新任务
let nextUnitOfWork: any = null;

function performUnitOfWork(workInProgress: Fiber) {
  // step1: 渲染更新fiber
  // todo
  const { type } = workInProgress;
  if (typeof type === 'string') {
    updateHostComponent(workInProgress);
  }
  // step2: 返回下一个
  if (workInProgress.child) {
    return workInProgress.child;
  }
  let nextFiber = workInProgress;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.return;
  }
}

function workLoop() {
  while (nextUnitOfWork && IdleDeadline.timeRemaining > 1) {
    // 渲染更新fiber, 并返回下一个
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    // commit
    if (!nextUnitOfWork) { }
  }
}

requestIdleCallback(workLoop);

const ReactDOM = {
  render: render
}

export default ReactDOM;