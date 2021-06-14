import React from 'react';
import { Helmet } from 'react-helmet';

import ApppageHead from '../components/AppHead';
import Layout from '../components/client/Layout';

function Landing() {
	return (
		<>
			<ApppageHead />
			<Helmet>
				<link rel='stylesheet' href='/index.css' />
				<link rel='stylesheet' href='/sign-in.css' />
			</Helmet>
			<Layout />
		</>
	);
}

export default Landing;
