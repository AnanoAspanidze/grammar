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

				if (values.TypeId === 5) {
					setFieldValue('Questions', [
						...values.Questions,
						{
							Answers: [
								{
									id: 0,
									Text: '',
									IsCorrect: true,
								},
							],
							Text: '',
							WrongAnswerText: '',
							RightAnswerText: '',
						},
					]);
				} else if (values.TypeId === 4) {
					setFieldValue('Questions', [
						...values.Questions,
						{
							Answers: [
								{
									id: 0,
									Text: '',
									IsCorrect: true,
								},
							],
							Text: '',
							WrongAnswerText: '',
							RightAnswerText: '',
						},
					]);
				} else if (values.TypeId === 3) {
					setFieldValue('Questions', [
						...values.Questions,
						{
							Answers: [
								{
									id: 0,
									Text: '',
									IsCorrect: true,
								},
							],
							Text: '',
							WrongAnswerText: '',
							RightAnswerText: '',
						},
					]);
				} else if (values.TypeId === 6) {
					setFieldValue('Questions', [
						...values.Questions,
						{
							Answers: [
								{
									id: 0,
									Text: 'ჭეშმარიტია',
									IsCorrect: false,
								},
								{
									id: 0,
									Text: 'მცდარია',
									IsCorrect: false,
								},
							],
							Text: '',
							WrongAnswerText: '',
							RightAnswerText: '',
						},
					]);
				} else if (values.TypeId === 1) {
					setFieldValue('Questions', [
						...values.Questions,
						{
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
							],
							Text: '',
							WrongAnswerText: '',
							RightAnswerText: '',
						},
					]);
				} else if (values.TypeId === 2) {
					setFieldValue('Questions', [
						...values.Questions,
						{
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
							],
							Text: '',
							WrongAnswerText: '',
							RightAnswerText: '',
						},
					]);
				} else {
					setFieldValue('Questions', [
						...values.Questions,
						{
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
				}
			}}
		>
			კითხვის დამატება <AddIcon />
		</Button>
	);
}

export default AddNewQuestion;
