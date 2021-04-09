import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Sample1 from './pages/Sample1';
import Sample2 from './pages/Sample2';
import Index from './pages/Index';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { BrowserRouter, MemoryRouter, HashRouter, Route } from 'react-router-dom';

let Router = BrowserRouter;

// if (process.env.NODE_ENV === 'development') {
//   Router = HashRouter;
// }
console.info('APP VERSION', process.env.REACT_APP_COMMIT_HASH);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route path="/sample2" component={Sample2} />
      <Route path="/sample1" component={Sample1} />
      <Route exact path="/" component={Index} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
