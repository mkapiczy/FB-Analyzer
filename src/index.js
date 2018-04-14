import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
Array.range = (start, end) => Array.from({length: (end - start)}, (v, k) => k + start);
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
