import React, { useState, useEffect } from 'react';
import { Formik, useFormikContext } from 'formik';
import CreateExercise from './CreateExercise';
import { editQuestionSchema } from '../../../helpers/schema';
import { exerciseService } from '../../../services/exercise.service';
import SnackbarComponent from '../reusable/SnackbarComponent';
import AddExercise from './AddExercise';

function AddExerciseFormikContainer2({
	closeModal,
	exerciseId,
	exerciseType
}) {

	const { setFieldValue } = useFormikContext();

	const [initialValue, setInitialValue] = useState({
		Answers: [
			{
				Id: 1,
				Text: '',
				IsCorrect: false,
			},
			{
				Id: 2,
				Text: '',
				IsCorrect: false,
			},
		],
		Text: '',
		WrongAnswerText: '',
		RightAnswerText: '',
	});

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
		console.log(action)
		console.log(data)

        let d = {
            ExerciseId: exerciseId,
            ...data
        };

        exerciseService.addquestion(d)
        .then(res => {
			exerciseService.exercisedetails(exerciseId)
			.then(res => setFieldValue('Questions', res.Questions))
			closeModal()
		})
		.catch((err) => {
			handleClick(
				{ vertical: 'bottom', horizontal: 'center', severity: 'success' },
				err
			);

			action.setSubmitting(false)
		});
	}


	return (
		<Formik
			initialValues={initialValue}
			validateOnChange={true}
			enableReinitialize={true}
			validationSchema={editQuestionSchema}
			onSubmit={onSubmit}
		>
			{({ handleSubmit, setFieldValue }) => (
				<form onSubmit={handleSubmit}>
                    <AddExercise exerciseType={exerciseType} closeModal={closeModal} />

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

export default AddExerciseFormikContainer2;
