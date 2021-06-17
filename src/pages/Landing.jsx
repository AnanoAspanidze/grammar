import React from 'react';
import { Helmet } from 'react-helmet';

import '../assets/css/index.css';
import '../assets/css/sign-in.css';

import ApppageHead from '../components/AppHead';
import Layout from '../components/client/Layout';

function Landing() {
	return (
		<>
			<ApppageHead />

			<Layout />
		</>
	);
}

export default Landing;
