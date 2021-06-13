import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { useFormikContext } from 'formik';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import ExerciseCheckbox from './ExerciseCheckbox';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';

function TestQuestion({
	data,
	myvalue,
	closeModal,
	index,
	setDeleteQuestion,
	isEditPage,
	onClick,
}) {
	const classes = useStyles();
	const { values, setFieldValue, errors, handleChange } = useFormikContext();

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

	console.log(errors);

	return (
		<div
			className={classes.EcercisesBorder}
			style={{ position: 'relative', paddingTop: '70px' }}
		>
			{isEditPage && (
				<>
					<IconButton
						onClick={() => {
							closeModal(true);
							onClick(data);
						}}
						style={{ position: 'absolute', right: '70px', top: '11px' }}
					>
						<EditIcon />
					</IconButton>

					<IconButton
						onClick={() => {
							setDeleteQuestion(true);
							onClick(values);
						}}
						style={{ position: 'absolute', right: '10px', top: '11px' }}
					>
						<DeleteIcon />
					</IconButton>
				</>
			)}

			<ReactQuill
				disabled={isEditPage}
				theme='snow'
				readOnly={isEditPage}
				name={`Questions[${index}].Text`}
				value={values.Questions[index].Text}
				onChange={(e) => setFieldValue(`Questions[${index}].Text`, e)}
				placeholder='კითხვა *'
				style={{ height: '200px', marginBottom: '55px' }}
			/>

			{errors.Questions && errors.Questions[index] && (
				<FormHelperText error={true} variant='standard'>
					{errors.Questions[index].Text}
				</FormHelperText>
			)}

			{values.Questions[index].Answers.map((item, i) => (
				<div className='mb-20 mt-30' key={i}>
					<div className='flex align-items-center'>
						<Checkbox
							checked={item.IsCorrect}
							name={`Questions[${index}].Answers[${i}].IsCorrect`}
							value={values.Questions[index].Answers[i].IsCorrect}
							onChange={(e) =>
								setFieldValue(
									`Questions[${index}].Answers[${i}].IsCorrect`,
									e.target.checked
								)
							}
							color='primary'
							disabled={isEditPage}
						/>

						<TextField
							className={classes.TextField}
							variant='outlined'
							name={`Questions[${index}].Answers[${i}].Text`}
							value={values.Questions[index].Answers[i].Text}
							onChange={(e) =>
								setFieldValue(
									`Questions[${index}].Answers[${i}].Text`,
									e.target.value
								)
							}
							label='პასუხი *'
							disabled={isEditPage}
						/>
					</div>

					{errors.Questions &&
						errors.Questions[index] &&
						errors.Questions[index].Answers && (
							<FormHelperText error={true} variant='standard'>
								{errors.Questions[index].Answers[i]
									? errors.Questions[index].Answers[i].Text
									: ''}
							</FormHelperText>
						)}
				</div>
			))}

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

export default TestQuestion;

TestQuestion.defaultProps = {
	isEditPage: true,
};

const useStyles = makeStyles((theme) => ({
	EcercisesBorder: {
		padding: '30px 50px',
		marginBottom: '50px',
		marginBottom: '50px',
		borderRadius: '6px',
		boxShadow: 'rgb(3 102 214 / 30%) 0px 0px 0px 3px',
	},
	TextField: {
		width: '100%',
	},
}));
