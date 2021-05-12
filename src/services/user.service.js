import { fetchWrapper } from '../helpers/fetch-wrapper';

export const accountService = {
	userSignin,
	adminSignin,
	updateAdminInfo,
	getUserdetails,
	getUsers,
	changeUserRole,
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

function getUserdetails(id) {
	return fetchWrapper
		.get(`/Users/userdetails?itemId=${id}`)
		.then((info) => info);
}

function getUsers() {
	return fetchWrapper.get('/Users/users').then((user) => user);
}

function changeUserRole(UserId, RoleId) {
	return fetchWrapper
		.post('/Users/changeuserrole', { UserId, RoleId })
		.then((user) => user);
}
