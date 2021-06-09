import React from 'react';
import { Helmet } from 'react-helmet';

function ApppageHead({
	title = 'ქართული ენის გრამატიკის ელექტრონული რესურსი',
}) {
	return (
		<Helmet>
			<meta charSet='utf-8' />
			<title>{title}</title>
			<meta name='viewport' content='width=device-width, initial-scale=1' />
		</Helmet>
	);
}

export default ApppageHead;
