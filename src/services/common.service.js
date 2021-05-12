import { fetchWrapper } from '../helpers/fetch-wrapper';

export const commonService = {
	getParts,
	getRoles,
};

function getParts() {
	return fetchWrapper.get('/Dropdowns/categories').then((part) => part);
}

function getRoles() {
	return fetchWrapper.get('/Dropdowns/roles').then((roles) => roles);
}
