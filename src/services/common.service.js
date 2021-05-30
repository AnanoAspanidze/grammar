import { fetchWrapper } from '../helpers/fetch-wrapper';

export const commonService = {
	getParts,
	getRoles,
	selectedSubcategories,
	getEExerciseTypes,
};

function getParts() {
	return fetchWrapper.get('/Dropdowns/categories').then((part) => part);
}

function getRoles() {
	return fetchWrapper.get('/Dropdowns/roles').then((roles) => roles);
}

function selectedSubcategories(id) {
	return fetchWrapper
		.get(`/Dropdowns/selectedsubcategories?id=${id}`)
		.then((roles) => roles);
}

function getEExerciseTypes(id) {
	return fetchWrapper.get('/Dropdowns/types').then((roles) => roles);
}
