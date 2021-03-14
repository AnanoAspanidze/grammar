import { fetchWrapper } from '../helpers/fetch-wrapper';

export const accountService = {
	buyerLogin,
	buyerSignup,
	sellerLogin,
	sellerSignup,
};

function buyerLogin(email, password) {
	return fetchWrapper
		.post('/buyerLogin', { email, password })
		.then((user) => user);
}

function buyerSignup(data) {
	return fetchWrapper
		.post('/buyerSignup', {
			email: data.email,
			password: data.password,
			buyerName: data.buyerName,
			buyerSurname: data.buyerSurname,
			phoneNumber: data.phoneNumber,
		})
		.then((user) => user);
}

function sellerLogin(email, password) {
	return fetchWrapper
		.post('/sellerLogin', { email, password })
		.then((user) => user);
}

function sellerSignup(data) {
	return fetchWrapper
		.post('/sellerSignup', {
			email: data.email,
			password: data.password,
			sellerName: data.buyerName,
			sellerSurname: data.buyerSurname,
			companyName: 'company name',
			contactPhone: data.phoneNumber,
		})
		.then((user) => user);
}
