import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'antd/dist/antd.css'

// import Scheduler from './components/scheduler'
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';
// import Map from './components/Map';
// import Map from './components/Map' from what im working on build in componets
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
