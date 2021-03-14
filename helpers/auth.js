import { getCookie } from './cookie';
import redirect from './redirect';

export const getJwt = (ctx) => getCookie('access_Token', ctx.req);

export const isAuthenticated = (ctx) => !!getJwt(ctx);

export const redirectIfAuthenticated = (path, ctx) => {
	if (isAuthenticated(ctx)) {
		redirect(path, ctx);
		return true;
	}
	return false;
};

export const redirectIfNotCostumer = (path, ctx) => {
	if (getCookie('isRegisteredCustomer', ctx.req) === 'false') {
		redirect(path, ctx);
	}
};

export const redirectIfNotAuthenticated = (path, ctx) => {
	if (!isAuthenticated(ctx)) {
		redirect(path, ctx);
		return true;
	}
	return false;
};
