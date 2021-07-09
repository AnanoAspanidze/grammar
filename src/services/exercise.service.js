import { fetchWrapper } from '../helpers/fetch-wrapper';

export const exerciseService = {
	createExercise,
	getExercises,
	exercisedetails,
	editExercise,
	editQuestion,
	deleteQuestion,
	deleteAnswer,
	hideExercise,
	unhideExercise,
	getExerciseDetails,
	addquestion,
	getExerciseQuestions,
	removeSingleExercise,
	removeAllExercises,
	checkQuestion,
	getexerciseresult,
	ClearAllexercises,
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
		.put('/Exercises/editExercise', data)
		.then((exercise) => exercise);
}

function editQuestion(data) {
	return fetchWrapper
		.put('/Exercises/editquestion', data)
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

function deleteQuestion(id) {
	return fetchWrapper
		.delete(`/Exercises/deletequestion/${id}`)
		.then((exercise) => exercise);
}

function deleteAnswer(id) {
	return fetchWrapper
		.delete(`/Exercises/deleteanswer/${id}`)
		.then((exercise) => exercise);
}

function addquestion(data) {
	return fetchWrapper
		.post('/Exercises/addquestion', data)
		.then((exercise) => exercise);
}

function getExerciseDetails(id) {
	return fetchWrapper
		.get(`/PublicExercises/getexercisedetails/exerciseId?exerciseId=${id}`)
		.then((exercise) => exercise);
}

function getExerciseQuestions(id) {
	return fetchWrapper
		.get(`/PublicExercises/getexercisemodel/exerciseId?exerciseId=${id}`)
		.then((exercise) => exercise);
}
function checkQuestion(data) {
	return fetchWrapper
		.post('/PublicExercises/checkQuestion', data)
		.then((exercise) => exercise);
}

function removeSingleExercise(id) {
	return fetchWrapper
		.get('/PublicExercises/removesingleexercise', id)
		.then((exercise) => exercise);
}

function removeAllExercises() {
	return fetchWrapper
		.get('/PublicExercises/removeallexercises')
		.then((exercise) => exercise);
}

function getexerciseresult(id, subcategoryId) {
	return fetchWrapper
		.get(
			`/PublicExercises/getexerciseresult?ExerciseId=${id}&SubCategoryId=${subcategoryId}`
		)
		.then((exercise) => exercise);
}

function ClearAllexercises() {
	return fetchWrapper
		.post('/PublicExercises/deleteallexercises')
		.then((exercise) => exercise);
}
