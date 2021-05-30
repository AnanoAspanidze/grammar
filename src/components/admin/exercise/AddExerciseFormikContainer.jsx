import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CreateExercise from './CreateExercise';

function AddExerciseFormikContainer({ data, closeModal, setDeleteQuestion }) {
	const schema = Yup.object().shape({
		question: Yup.string().required('შეავსეთ ველი'),
		// SubCategoryId: Yup.string().required('შეავსეთ ველი'),
	});

	const [initialValue, setInitialValue] = useState({
		Answers: [
			{
				id: 1,
				Text: '',
				IsCorrect: false,
			},
			{
				id: 2,
				Text: '',
				IsCorrect: false,
			},
			{
				id: 3,
				Text: '',
				IsCorrect: false,
			},
		],
		Text: '',
		WrongAnswerText: '',
		RightAnswerText: '',
	});

	useEffect(() => {
		setInitialValue(data);
	}, []);

	function onSubmit(data, action) {
		console.log(data);

		// exerciseService.createExercise(d).then((res) => console.log(res));

		// action.setSubmitting(false);
	}

	return (
		<Formik
			initialValues={initialValue}
			validateOnChange={true}
			enableReinitialize={true}
			validationSchema={schema}
			onSubmit={onSubmit}
		>
			{({ handleSubmit }) => (
				<form onSubmit={handleSubmit}>
					<CreateExercise
						data={data}
						setDeleteQuestion={setDeleteQuestion}
						closeModal={closeModal}
					/>
				</form>
			)}
		</Formik>
	);
}

export default AddExerciseFormikContainer;
