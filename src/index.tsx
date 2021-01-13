import ReactDOM from './copy-react/react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <div className='demo'>
    <h1 className='title'>标题</h1>
    <p className='content'>内容</p>
    <h2 id='id'>id</h2>
  </div>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
