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
  child?: any;
  sibling?: any;
  return?: any;
  statenode: any;
}

let wipRoot: Fiber | null = null;
// todo Fiber根节点
function render(vnode: any, container: any, callback?: Function) {
  //console.log(vnode)
  wipRoot = {
    type: 'div',
    props: { ...vnode.props },
    statenode: container
  }
  nextUnitOfWork = wipRoot;
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
    workInProgress.statenode = createNode(workInProgress)
  }
  // todo 协调子节点
  reconcileChildren(workInProgress, workInProgress.props.children);

  console.log('workInProgress', workInProgress);
}

function reconcileChildren(workInProgress: Fiber, children: any) {
  // todo 协调子节点方法
  if (isStringOrNumber(children)) return;

  const newChildren = Array.isArray(children) ? children : [children];
  let preFiber: Fiber | null = null;

  for (let i = 0; i < newChildren.length; i++) {
    let child = newChildren[i];
    let newFiber: Fiber = {
      type: child.type,
      props: { ...child.props },
      child: null,
      sibling: null,
      return: workInProgress,
      statenode: null,
    }

    if (i === 0) {
      workInProgress.child = newFiber;
    } else {
      if (preFiber) preFiber.sibling = newFiber;
    }
    preFiber = newFiber;
  }
}

// function updateTextComponent(vnode: any) {
//   const node = document.createTextNode(vnode);
//   return node;
// }

// function updateFunctionComponent(vnode: any) {
//   const { type, props } = vnode;
//   const child = type(props);
//   const node = createNode(child);
//   return node;
// }

// function updateClassComponent(vnode: any) {
//   const { type, props } = vnode;
//   const instance = new type(props);
//   const child = instance.render();
//   const node = createNode(child);
//   return node;
// }

// function updateFragmentComponent(vnode: any) {
//   const node = document.createDocumentFragment();
//   reconcileChildren(node, vnode.props.children);
//   return node;
// }

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

function workLoop(IdleDeadline: any) {
  while (nextUnitOfWork && IdleDeadline.timeRemaining() > 1) {
    // 渲染更新fiber, 并返回下一个
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    // commit
    if (!nextUnitOfWork && wipRoot) {
      commitRoot();
    }
  }
}

//@ts-ignore
requestIdleCallback(workLoop);

function commitRoot() {
  if (wipRoot) commitWorker(wipRoot.child);
  wipRoot = null;
}

function commitWorker(workInProgress: Fiber) {
  if (!workInProgress) return;
  // todo·渲染当前Fiber
  // todo·找到parentNode
  console.log('parentNodeFiber', workInProgress)
  let parentNodeFiber = workInProgress.return;

  while (!parentNodeFiber.statenode) {
    parentNodeFiber = parentNodeFiber.return;
  }

  let parentNode = parentNodeFiber.statenode;
  console.log(parentNode)

  if (workInProgress.statenode) {
    parentNode.appendChild(workInProgress.statenode)
  }

  // 子Fiber
  commitWorker(workInProgress.child);
  // 兄弟Fiber
  commitWorker(workInProgress.sibling);
}

const ReactDOM = {
  render: render
}

export default ReactDOM;