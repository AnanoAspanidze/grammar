import { getCookie } from './cookie';

export function authHeader() {
	// return authorization header with jwt token
	let token = getCookie('access_Token');

	if (token) {
		return { Authorization: 'Bearer ' + token };
	} else {
		return {};
	}
}
