import ReactDOM from './copy-react/react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <>
    <h1>标题</h1>
    <p>内容</p>
  </>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
