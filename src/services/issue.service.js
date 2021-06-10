import { fetchWrapper } from '../helpers/fetch-wrapper';

export const issueService = {
	createIssue,
	updateIssue,
	getIssue,
	getIssues,
	hideIssue,
	unHideIssue,
	getPublicSubCategories,
};

function createIssue(Name, CategoryId) {
	return fetchWrapper
		.post('/SubCategories/createsubcategories', { Name, CategoryId })
		.then((part) => part);
}

function updateIssue(id, Name, CategoryId) {
	return fetchWrapper
		.put(`/SubCategories/editsubcategories?id=${id}`, { Name, CategoryId })
		.then((part) => part);
}

function getIssue(id) {
	return fetchWrapper
		.get(`/SubCategories/subcategorydetails?id=${id}`)
		.then((part) => part);
}

function getIssues() {
	return fetchWrapper
		.get('/SubCategories/GetSubCategories')
		.then((part) => part);
}

function hideIssue(id) {
	return fetchWrapper
		.post(`/SubCategories/HideSubCategory/${id}`)
		.then((part) => part);
}

function unHideIssue(id) {
	return fetchWrapper
		.post(`/SubCategories/unHideSubCategory/${id}`)
		.then((part) => part);
}

function getPublicSubCategories(id) {
	return fetchWrapper
		.get('/PublicSubCategories/GetSubCategories')
		.then((category) => category);
}
