import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { useFormikContext } from 'formik';

function AddNewQuestion() {
	const { values, setFieldValue } = useFormikContext();

	if (values['part'] != 7 && values['part'] != 8) {
		return (
			<Button
				onClick={() => {
					setFieldValue('index', values['index'] + 1);
					setFieldValue('Questions', [
						...values.Questions,
						{
							Answers: [
								{
									id: 1,
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
	} else {
		return null;
	}
}

export default AddNewQuestion;
