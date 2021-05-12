import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './assets/css/reset.css';
import 'react-quill/dist/quill.snow.css';

ReactDOM.render(
	// <React.StrictMode>
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('root')
);
