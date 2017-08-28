import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';

import {Main} from './app/components/main';

import './index.css';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Main}/>
  </Router>,
  document.getElementById('root')
);
