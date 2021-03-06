import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CreateExercise from './CreateExercise';
import { editQuestionSchema } from '../../../helpers/schema';
import { exerciseService } from '../../../services/exercise.service';
import SnackbarComponent from '../reusable/SnackbarComponent';
import AddExercise from './AddExercise';

function AddExerciseFormikContainer({
	data,
	closeModal,
	exerciseType,
	onChangeParetFormikQuestionn,
	questionIndex,
}) {
	const [state, setState] = useState({
		open: false,
		vertical: 'top',
		horizontal: 'center',
		severity: '',
		error: null,
	});

	const { open } = state;

	const handleClick = (newState, message) => {
		setState({ open: true, error: message, ...newState });
	};

	const handleClose = () => {
		setState({ ...state, open: false });
	};

	function onSubmit(data, action) {
		exerciseService
			.editQuestion(data)
			.then((res) => {
				action.setFieldValue(`Questions[${questionIndex}]`, data);
				closeModal(false);

				onChangeParetFormikQuestionn(data);
				handleClick(
					{ vertical: 'bottom', horizontal: 'center', severity: 'success' },
					res.Message
				);
				action.setSubmitting(false);
				// action.setErrors({});
			})
			.catch((err) => {
				handleClick(
					{ vertical: 'bottom', horizontal: 'center', severity: 'error' },
					err.Message
				);
			});
	}

	return (
		<Formik
			initialValues={data}
			validateOnChange={true}
			enableReinitialize={true}
			validationSchema={editQuestionSchema}
			onSubmit={onSubmit}
		>
			{({ handleSubmit, setFieldValue }) => (
				<form onSubmit={handleSubmit}>
					<CreateExercise
						data={data}
						exerciseType={exerciseType}
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

export default AddExerciseFormikContainer;
