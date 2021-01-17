import ReactDOM from './copy-react/react-dom';
import Component from './copy-react/Component';
import './index.css';
import reportWebVitals from './reportWebVitals';

//@ts-ignore
class ClassComponet extends Component {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props: any) {
    super(props)
  }

  render() {
    return (
      <div>
        {/* @ts-ignore */}
        <h1>{this.props.name}</h1>
      </div>
    )
  }
}

function FunctionComponent(props: any) {
  return (
    <div className="border">
      <p>{props.name}</p>
    </div>
  )
}

const jsx = (
  <div className='demo'>
    <h1 className='title'>标题</h1>
    <p className='content'>内容</p>
    <h2 id='id'>id</h2>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
    </ul>
    <dl>
      <dd><span>A</span><span>B</span></dd>
      <dt><span>C</span><span>D</span></dt>
    </dl>
    <a href="http://www.baidu.com">链接</a>
    <FunctionComponent name="函数组件" />
    {/* @ts-ignore */}
    <ClassComponet name="类组件" />
    <>
      <h4>h4</h4>
      <h5>h5</h5>
    </>
  </div>
);

ReactDOM.render(
  jsx,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
