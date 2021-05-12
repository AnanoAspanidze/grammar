import { SET_CURRENT_USER, GET_ERRORS, CLEAR_SERVER_ERROR } from './types';
import isEmpty from '../../validation/is-empty';

export default function (state, action) {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload.decodedUser),
				user: action.payload.decodedUser,
				errors: {},
				loading: false,
				JwtToken: action.payload.token,
				RefreshToken: action.payload.refreshToken,
			};

		case GET_ERRORS:
			return {
				...state,
				user: {},
				errors: action.payload,
				loading: false,
			};

		case CLEAR_SERVER_ERROR:
			return {
				...state,
				errors: null,
				loading: false,
			};

		default:
			return state;
	}
}
