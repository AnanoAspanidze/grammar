import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../helpers/cookie';

const PrivateRoute = ({ component: Component, drawerIsOpen, ...rest }) => {
	return (
		// Show the component only when the user is logged in
		// Otherwise, redirect the user to /signin page
		<Route
			{...rest}
			render={(props) =>
				isLogin() ? (
					<Component drawerIsOpen={drawerIsOpen} {...props} />
				) : (
					<Redirect to='/admin/signin' />
				)
			}
		/>
	);
};

export default PrivateRoute;
