import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CreateExercise from './CreateExercise';
import { editQuestionSchema } from '../../../helpers/schema';

function AddExerciseFormikContainer({
	data,
	closeModal,
	onChangeParetFormikQuestionn,
	questionIndex,
}) {
	const [initialValue, setInitialValue] = useState({
		Answers: [],
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
			// validationSchema={editQuestionSchema}
			onSubmit={onSubmit}
		>
			{({ handleSubmit }) => (
				<form onSubmit={handleSubmit}>
					<CreateExercise
						data={data}
						onChangeParetFormikQuestionn={onChangeParetFormikQuestionn}
						questionIndex={questionIndex}
						// setDeleteQuestion={setDeleteQuestion}
						closeModal={closeModal}
					/>
				</form>
			)}
		</Formik>
	);
}

export default AddExerciseFormikContainer;
