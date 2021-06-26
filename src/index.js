import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Helmet } from 'react-helmet';

import './assets/css/bootstrap.min.css';
import './assets/css/bootstrap-grid.min.css';
import './assets/css/reset.css';

// import './assets/css/bootstrap.min.css';
// import './assets/css/bootstrap-grid.min.css';
// import './assets/css/reset.css';
// import './assets/css/inputs.css';
// import './assets/css/buttons.css';
// import './assets/css/homepage.css';
// import './assets/css/variants.css';
// import './assets/css/exercises.css';
// import './assets/css/adverb-exercise-1.css';
// import './assets/css/special-exercises3.css';
// // import './assets/css/special-exercises3-result.css';
// import './assets/css/about-project.css';
// import './assets/css/sign-in.css';
// import './assets/css/responsive.css';
// import './assets/css/index.css';

import 'react-quill/dist/quill.snow.css';

ReactDOM.render(
	// <React.StrictMode>
	<BrowserRouter>
		<Helmet>
			<link rel='stylesheet' type='text/css' href='/responsive.css' />
			<link rel='stylesheet' type='text/css' href='/inputs.css' />
			<link rel='stylesheet' type='text/css' href='/buttons.css' />
			<link rel='stylesheet' type='text/css' href='/index.css' />
			<link rel='stylesheet' type='text/css' href='/homepage.css' />
			<link rel='stylesheet' type='text/css' href='/variants.css' />
			<link rel='stylesheet' type='text/css' href='/exercises.css' />
			<link rel='stylesheet' type='text/css' href='/adverb-exercise-1.css' />
			<link rel='stylesheet' type='text/css' href='/special-exercises3.css' />
			<link
				rel='stylesheet'
				type='text/css'
				href='/exercises-correct-mistakes.css'
			/>
			<link
				rel='stylesheet'
				type='text/css'
				href='/special-exercises3-result.css'
			/>
			<link
				rel='stylesheet'
				type='text/css'
				href='/special-exercises-missed-word.css'
			/>
			<link
				rel='stylesheet'
				type='text/css'
				href='/special-exercises-dropdown.css'
			/>
			<link rel='stylesheet' type='text/css' href='/about-project.css' />
			<link rel='stylesheet' type='text/css' href='/exercises-mark-word.css' />
			<link rel='stylesheet' type='text/css' href='/sign-in.css' />
		</Helmet>
		<App />
	</BrowserRouter>,
	document.getElementById('root')
);
