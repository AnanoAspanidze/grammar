import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './assets/css/bootstrap.min.css';
import './assets/css/bootstrap-grid.min.css';
import './assets/css/reset.css';
import './assets/css/responsive.css';
import './assets/css/inputs.css';
import './assets/css/buttons.css';
import './assets/css/sign-in.css';

import 'react-quill/dist/quill.snow.css';

ReactDOM.render(
	// <React.StrictMode>
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('root')
);
