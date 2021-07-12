import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
// import { Helmet } from 'react-helmet';

import './assets/css/bootstrap.min.css';
import './assets/css/bootstrap-grid.min.css';
import './assets/css/reset.css';

import 'react-quill/dist/quill.snow.css';

import './assets/css/buttons.css';
import './assets/css/inputs.css';
import './assets/css/homepage.css';
import './assets/css/about-project.css';
import './assets/css/variants.css';
import './assets/css/adverb-exercise-1.css';
import './assets/css/exercises-correct-mistakes.css';
import './assets/css/exercises-mark-word.css';
import './assets/css/exercises.css';
import './assets/css/privacy-policy.css';
import './assets/css/sign-in.css';
import './assets/css/special-exercises-dropdown.css';
// import './assets/css/special-exercises-missed-word.css';
import './assets/css/special-exercises3-result.css';
import './assets/css/special-exercises3.css';
// import './assets/css/terms-of-use.css';
import './assets/css/error-page.css';
import './assets/css/responsive.css';

ReactDOM.render(
	// <React.StrictMode>
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('root')
);
