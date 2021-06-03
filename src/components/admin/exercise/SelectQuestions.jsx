import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { useFormikContext } from 'formik';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import TextFieldComponent from '../reusable/TextFieldComponent';
import { v4 as uuidv4 } from 'uuid';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';

function SelectQuestions({ isEditPage, index }) {
	const { values, setFieldValue, errors, handleChange } = useFormikContext();

	const [value2, setValue2] = useState('');
	const classes = useStyles();

	const addMore = () => {
		setFieldValue(`Questions[${index}].Answers`, [
			...values.Questions[index].Answers,
			{
				id: 0,
				Text: '',
				IsCorrect: false,
			},
		]);
	};

	return (
		<div className={classes.EcercisesBorder}>
			<div>
				იმ ადგილას, სადაც გინდათ, რომ გამოჩნდეს ასარჩევი, ჩაწერეთ #select
			</div>
			<ReactQuill
				disabled={isEditPage}
				theme='snow'
				readOnly={isEditPage}
				name={`Questions[${index}].Text`}
				value={values.Questions[index].Text}
				onChange={(e) => setFieldValue(`Questions[${index}].Text`, e)}
				placeholder='კითხვა *'
				style={{ height: '200px', marginBottom: '70px' }}
			/>

			<RadioGroup value={value2}>
				{values.Questions[index].Answers.map((item, i) => (
					<>
						<div className='flex align-items-center mb-20 mt-30'>
							<Radio
								checked={values.Questions[index].Answers[i].IsCorrect}
								name={`Questions[${index}].Answers[${i}].IsCorrect`}
								onChange={(e) => {
									const newArr = values.Questions[index].Answers.map((w) => {
										return { ...w, IsCorrect: false };
									});

									setFieldValue(`Questions[${index}].Answers`, newArr);
									setFieldValue(
										`Questions[${index}].Answers[${i}].IsCorrect`,
										!e.target.value
									);
								}}
								inputProps={{ 'aria-label': 'A' }}
							/>

							<TextFieldComponent
								onChange={(e) =>
									setFieldValue(
										`Questions[${index}].Answers[${i}].Text`,
										e.target.value
									)
								}
								placeholder='პასუხი'
								name={`Questions[${index}].Answers[${i}].Text`}
							/>
						</div>
					</>
				))}
			</RadioGroup>

			{!isEditPage && (
				<Fab component='span' onClick={addMore}>
					<AddIcon />
				</Fab>
			)}

			<ReactQuill
				theme='snow'
				className='mt-80'
				name={`Questions[${index}].RightAnswerText`}
				value={values.Questions[index].RightAnswerText}
				onChange={(e) =>
					setFieldValue(`Questions[${index}].RightAnswerText`, e)
				}
				readOnly={isEditPage}
				placeholder='კომენტარი პასუხის სწორად გაცემის შემთხვევაში'
				style={{ height: '200px', marginBottom: '70px' }}
			/>

			<ReactQuill
				theme='snow'
				name={`Questions[${index}].WrongAnswerText`}
				value={values.Questions[index].WrongAnswerText}
				onChange={(e) =>
					setFieldValue(`Questions[${index}].WrongAnswerText`, e)
				}
				readOnly={isEditPage}
				placeholder='კომენტარი პასუხის არასწორად გაცემის შემთხვევაში'
				style={{ height: '200px', marginBottom: '70px' }}
			/>
		</div>
	);
}

export default SelectQuestions;

const useStyles = makeStyles((theme) => ({
	EcercisesBorder: {
		padding: '30px 50px',
		marginBottom: '50px',
		borderRadius: '6px',
		marginBottom: '50px',
		boxShadow: 'rgb(3 102 214 / 30%) 0px 0px 0px 3px',
	},
}));
