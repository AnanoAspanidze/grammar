import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './assets/css/bootstrap.min.css';
import './assets/css/bootstrap-grid.min.css';
import './assets/css/reset.css';
import './assets/css/inputs.css';
import './assets/css/buttons.css';
import './assets/css/homepage.css';
import './assets/css/variants.css';
import './assets/css/exercises.css';
import './assets/css/adverb-exercise-1.css';
import './assets/css/special-exercises3.css';
// import './assets/css/special-exercises3-result.css';
import './assets/css/about-project.css';
import './assets/css/sign-in.css';
import './assets/css/responsive.css';
// import './assets/css/index.css';

import 'react-quill/dist/quill.snow.css';

ReactDOM.render(
	// <React.StrictMode>
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('root')
);
