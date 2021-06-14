import React from 'react';
import { Helmet } from 'react-helmet';

function ApppageHead({
	title = 'ქართული ენის გრამატიკის ელექტრონული რესურსი',
}) {
	return (
		<Helmet>
			<meta charSet='utf-8' />
			<title>{title}</title>
			<link rel='stylesheet' href='/bootstrap.min.css' />
			<link rel='stylesheet' href='/bootstrap-grid.min.css' />
			<link rel='stylesheet' href='/buttons.css' />
			<link rel='stylesheet' href='/inputs.css' />
			<link rel='stylesheet' href='/responsive.css' />
			<meta name='viewport' content='width=device-width, initial-scale=1' />
		</Helmet>
	);
}

export default ApppageHead;
