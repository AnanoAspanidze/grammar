import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { useFormikContext } from 'formik';

function AddNewQuestion() {
	const { values, setFieldValue } = useFormikContext();

	return (
		<Button
			onClick={() => {
				setFieldValue('index', values['index'] + 1);
				setFieldValue('Questions', [
					...values.Questions,
					{
						exerciseId: 0,
						Answers: [
							{
								id: 0,
								Text: '',
								IsCorrect: false,
							},
							{
								id: 0,
								Text: '',
								IsCorrect: false,
							},
							{
								id: 0,
								Text: '',
								IsCorrect: false,
							},
						],
						Text: '',
						WrongAnswerText: '',
						RightAnswerText: '',
					},
				]);
			}}
		>
			კითხვის დამატება <AddIcon />
		</Button>
	);
}

export default AddNewQuestion;
