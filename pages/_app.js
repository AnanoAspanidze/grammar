import React, { useEffect, useContext } from 'react';
import jwt_decode from 'jwt-decode';
import '../public/assets/reset.css';
import CssBaseline from '@material-ui/core/CssBaseline';

import userContext from '../context/user/userContext';
import UserState from '../context/user/UserState';
import { getCookie } from '../helpers/cookie';

function MyApp({ Component, pageProps }) {
	return (
		<UserState>
			<MyComponent>
				<CssBaseline />
				<Component {...pageProps} />
			</MyComponent>
		</UserState>
	);
}

function MyComponent({ children }) {
	const { setCurrentUser } = useContext(userContext);

	useEffect(() => {
		if (getCookie('access_Token')) {
			let token = getCookie('access_Token');

			const decode = jwt_decode(token);

			setCurrentUser(decode, token);
		}
	}, []);

	return <>{children}</>;
}

export default MyApp;
