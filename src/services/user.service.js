import { fetchWrapper } from '../helpers/fetch-wrapper';

export const accountService = {
	userSignin,
	adminSignin,
	updateAdminInfo,
};

function userSignin(Email, Password) {
	return fetchWrapper
		.post(`/Account/authenticate`, { Email, Password })
		.then((user) => user);
}

function adminSignin(Email, Password) {
	return fetchWrapper
		.post('/Account/authenticateAdmin', { Email, Password })
		.then((user) => user);
}

function updateAdminInfo(data) {
	return fetchWrapper.post('/Users/editadmininfo', data).then((info) => info);
}
