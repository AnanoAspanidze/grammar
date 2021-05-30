import { fetchWrapper } from '../helpers/fetch-wrapper';

export const exerciseService = {
	createExercise,
	getExercises,
	exercisedetails,
	editExercise,
	hideExercise,
	unhideExercise,
};

function createExercise(data) {
	return fetchWrapper
		.post('/Exercises/CreateExercise', data)
		.then((exercise) => exercise);
}

function exercisedetails(id) {
	return fetchWrapper
		.get(`/Exercises/exercisedetails/${id}`)
		.then((exercise) => exercise);
}

function editExercise(data) {
	return fetchWrapper
		.get('/Exercises/editExercise', data)
		.then((exercise) => exercise);
}

function getExercises(query) {
	return fetchWrapper
		.get(
			`/Exercises/exercises?PageNumber=${query.PageNumber}&PageSize=${
				query.PageSize
			}&SortOrder=${query.SortOrder}${
				query.SearchQuery ? `&SearchQuery=${query.SearchQuery}` : ''
			}`
		)
		.then((exercise) => exercise);
}

function hideExercise(id) {
	return fetchWrapper
		.post(`/Exercises/blockexercise/${id}`)
		.then((exercise) => exercise);
}

function unhideExercise(id) {
	return fetchWrapper
		.post(`/Exercises/unblockexercise/${id}`)
		.then((exercise) => exercise);
}
