import React, { useReducer } from 'react';

import userContext from './userContext';
import userReducer from './userReducer';
import jwt_decode from 'jwt-decode';
import { setCookie, getCookie, removeCookie } from '../../helpers/cookie';
import { SET_CURRENT_USER, GET_ERRORS, CLEAR_SERVER_ERROR } from './types';

const UserState = (props) => {
	const initialState = {
		isAuthenticated: false,
		user: {},
		errors: {},
		loading: false,
		token: null,
	};

	const [state, dispatch] = useReducer(userReducer, initialState);

	const setCurrentUser = (decodedUser, token) =>
		dispatch({ type: SET_CURRENT_USER, payload: { decodedUser, token } });

	const setError = (error) => dispatch({ type: GET_ERRORS, payload: error });

	const clearErrors = () => dispatch({ type: CLEAR_SERVER_ERROR });

	const logOutUser = () => {
		removeCookie('access_Token');
		setCurrentUser({}, null);
	};

	return (
		<userContext.Provider
			value={{
				isAuthenticated: state.isAuthenticated,
				user: state.user,
				errors: state.errors,
				token: state.token,
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
