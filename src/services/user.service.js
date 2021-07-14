import { fetchWrapper } from '../helpers/fetch-wrapper';

export const accountService = {
	userSignin,
	adminSignin,
	mailConfirmation,
	SendResetPasswordMail,
	updateAdminInfo,
	getUserdetails,
	getUsers,
	refreshToken,
	changeUserRole,
	userexeldata,
	userStatistics,
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

function mailConfirmation(confirmToken) {
	return fetchWrapper
		.post(`/Account/mailconfirmation/${confirmToken}`)
		.then((user) => user);
}

function SendResetPasswordMail(data) {
	return fetchWrapper
		.post('/Account/SendResetPasswordMail', data)
		.then((user) => user);
}

function refreshToken() {
	return fetchWrapper.post('/Account/refresh-token').then((user) => user);
}

function updateAdminInfo(data) {
	return fetchWrapper.post('/Users/editadmininfo', data).then((info) => info);
}

function getUserdetails(id) {
	return fetchWrapper.get(`/Users/userdetails/${id}`).then((info) => info);
}

function getUsers(query) {
	return fetchWrapper
		.get(
			`/Users/users?PageNumber=${query.PageNumber}&PageSize=${query.PageSize}&SortOrder=${query.SortOrder}&SearchQuery=${query.SearchQuery}`
		)
		.then((user) => user);
}

function changeUserRole(UserId, RoleId) {
	return fetchWrapper
		.post('/Users/changeuserrole', { UserId, RoleId })
		.then((user) => user);
}

function userStatistics(id) {
	return fetchWrapper
		.get(`/Users/userstatistics?id=${id}`)
		.then((user) => user);
}
function userexeldata(id) {
	return fetchWrapper.get('/Users/userexeldata').then((user) => user);
}
