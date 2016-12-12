import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import Layout from './layout'
import Index from './routes/index'
const Routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
	  <IndexRoute component={Index}/>
    </Route>
  </Router>
)
export default function renderApp (el = document.getElementById('root')) {
	ReactDOM.render(Routes, el);
}
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV !== 'production') {
	renderApp()
}


