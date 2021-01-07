import React from 'react';
import {render} from './copy-react';
import './index.css';
import reportWebVitals from './reportWebVitals';

render(
  <>
    <h1>标题</h1>
    <p>内容</p>
  </>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
