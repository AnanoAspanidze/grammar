import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';

import CreateExercise from './CreateExercise';
import { editQuestionSchema } from '../../../helpers/schema';
import { exerciseService } from '../../../services/exercise.service';
import SnackbarComponent from '../reusable/SnackbarComponent';

function AddNewExercise({
	data,
	closeModal,
	questionIndex,
}) {

	const [state, setState] = useState({
		open: false,
		vertical: 'top',
		horizontal: 'center',
		severity: '',
		error: null,
	});

    const initialValue = {
		Answers: [],
		Text: '',
		WrongAnswerText: '',
		RightAnswerText: '',
	}

	const { open } = state;

	const handleClick = (newState, message) => {
		setState({ open: true, error: message, ...newState });
	};

	const handleClose = () => {
		setState({ ...state, open: false });
	};


	function onSubmit(data, action) {
		console.log(action)
		console.log(data)
	}

	return (
		<Formik
			initialValues={initialValue}
			validateOnChange={true}
			validationSchema={editQuestionSchema}
			onSubmit={onSubmit}
		>
			{({ handleSubmit, setFieldValue }) => (
				<form onSubmit={handleSubmit}>
					<CreateExercise
						data={data}
						questionIndex={questionIndex}
						closeModal={closeModal}
					/>

					<SnackbarComponent
						open={open}
						message={state.error}
						severity={state.severity}
						handleClose={handleClose}
					/>
				</form>
			)}
		</Formik>
	);
}

export default AddNewExercise;
