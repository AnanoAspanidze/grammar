import React, { useReducer } from 'react';

import userContext from './userContext';
import userReducer from './userReducer';
import { setCookie, removeCookie } from '../../helpers/cookie';
import { SET_CURRENT_USER, GET_ERRORS, CLEAR_SERVER_ERROR } from './types';

const UserState = (props) => {
	const initialState = {
		isAuthenticated: false,
		user: {},
		errors: {},
		loading: false,
		JwtToken: null,
		RefreshToken: null,
	};

	const [state, dispatch] = useReducer(userReducer, initialState);

	const setCurrentUser = (decodedUser, token, refreshToken) => {
		dispatch({
			type: SET_CURRENT_USER,
			payload: { decodedUser, token, refreshToken },
		});

		if (Object.keys(decodedUser).length > 0) {
			setCookie('JwtToken', token);
			setCookie('RefreshToken', refreshToken);
		}
	};

	const setError = (error) => dispatch({ type: GET_ERRORS, payload: error });

	const clearErrors = () => dispatch({ type: CLEAR_SERVER_ERROR });

	const logOutUser = () => {
		removeCookie('JwtToken');
		removeCookie('RefreshToken');
		setCurrentUser({}, null, null);
		window.location.href = '/';
	};

	return (
		<userContext.Provider
			value={{
				isAuthenticated: state.isAuthenticated,
				user: state.user,
				errors: state.errors,
				JwtToken: state.JwtToken,
				RefreshToken: state.RefreshToken,
				logOutUser,
				setCurrentUser,
				setError,
				clearErrors,
			}}
		>
			{props.children}
		</userContext.Provider>
	);
};

export default UserState;
