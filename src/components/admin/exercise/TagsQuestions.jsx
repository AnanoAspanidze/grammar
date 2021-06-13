import React from 'react';
import { useFormikContext } from 'formik';
import ReactQuill from 'react-quill';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import TextFieldComponent from '../reusable/TextFieldComponent';
import FormHelperText from '@material-ui/core/FormHelperText';

function TagsQuestions({ isEditPage, index }) {
	const {
		values,
		setFieldValue,
		setFieldError,
		errors,
		handleChange,
	} = useFormikContext();

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
			<ReactQuill
				disabled={isEditPage}
				theme='snow'
				readOnly={isEditPage}
				name={`Questions[${index}].Text`}
				value={values.Questions[index].Text}
				onChange={(e) => setFieldValue(`Questions[${index}].Text`, e)}
				placeholder='კითხვა *'
				style={{ height: '200px', marginBottom: '60px' }}
			/>

			{errors.Questions && (
				<FormHelperText error={true} variant='standard'>
					{errors.Questions[0].Text}
				</FormHelperText>
			)}

			{values.Questions[index].Answers.map((item, i) => (
				<div className='mb-20 mt-30' key={i}>
					<TextFieldComponent
						placeholder='სიტყვა'
						name={`Questions[${index}].Answers[${i}].Text`}
						value={values.Questions[index].Answers[i].Text}
						onChange={(e) =>
							setFieldValue(
								`Questions[${index}].Answers[${i}].Text`,
								e.target.value
							)
						}
					/>

					{errors.Questions && errors.Questions[index].Answers && (
						<FormHelperText error={true} variant='standard'>
							{errors.Questions[index].Answers[i] &&
								errors.Questions[index].Answers[i].Text}
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

export default TagsQuestions;

const useStyles = makeStyles((theme) => ({
	EcercisesBorder: {
		padding: '30px 50px',
		marginBottom: '50px',
		marginBottom: '50px',
		borderRadius: '6px',
		boxShadow: 'rgb(3 102 214 / 30%) 0px 0px 0px 3px',
	},
}));
