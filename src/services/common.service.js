import { fetchWrapper } from '../helpers/fetch-wrapper';

export const commonService = {
	getParts,
};

function getParts() {
	return fetchWrapper.get('/Dropdowns/categories').then((part) => part);
}
