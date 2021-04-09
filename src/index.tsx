import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { MemoryRouter, HashRouter, Route } from 'react-router-dom';
import store from './redux';

let Router = MemoryRouter;

// if (process.env.NODE_ENV === 'development') {
//   Router = HashRouter;
// }
console.info('APP VERSION', process.env.REACT_APP_COMMIT_HASH);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Route component={App} />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
