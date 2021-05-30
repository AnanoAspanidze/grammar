import cookie from 'js-cookie';
import jwt_decode from 'jwt-decode';

export const setCookie = (key, value) => {
	cookie.set(key, value);
};

export const removeCookie = (key) => {
	cookie.remove(key);
};

export const getCookie = (key, req) => {
	return cookie.get(key);
};

export const isLogin = () => {
	if (getCookie('JwtToken')) {
		const decode = jwt_decode(getCookie('JwtToken'));

		if (cookie.get('JwtToken') && decode.role === 'Admin') {
			return true;
		}
	}

	return false;
};
