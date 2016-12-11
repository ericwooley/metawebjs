import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
export default function renderApp (el = document.getElementById('root')) {
	ReactDOM.render(<App />, el);
}
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV !== 'production') {
	renderApp()
}


