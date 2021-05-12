import React from 'react';
import { Helmet } from 'react-helmet';

function AdminpageHead() {
	return (
		<Helmet>
			<meta charSet='utf-8' />

			<link
				rel='stylesheet'
				href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
			/>
		</Helmet>
	);
}

export default AdminpageHead;
