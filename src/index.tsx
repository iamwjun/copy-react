import ReactDOM from './copy-react/react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

// class ClassComponet extends React.Component {
//   render() {
//     return (
//       <div>类组件</div>
//     )
//   }
// }

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
    <a href="http://www.baidu.com">链接</a>
    <FunctionComponent name="name" />
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
