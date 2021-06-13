import React, { useEffect } from 'react';
import ReactQuill from 'react-quill';
import { useFormikContext } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';

function TrueOrFalse({ isEditPage, index }) {
	const { values, setFieldValue, errors, handleChange } = useFormikContext();
	const classes = useStyles();

	useEffect(() => {
		setFieldValue(`Questions[${index}].Answers[0].Text`, 'ჭეშმარიტია');
		setFieldValue(`Questions[${index}].Answers[1].Text`, 'მცდარია');
	}, []);

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
				style={{ height: '200px', marginBottom: '70px' }}
			/>

			{errors.Questions && (
				<FormHelperText error={true} variant='standard'>
					{errors.Questions[0].Text}
				</FormHelperText>
			)}

			<RadioGroup>
				<div className='flex align-items-center mt-30'>
					<Radio
						checked={values.Questions[index].Answers[0].IsCorrect}
						name={`Questions[${index}].Answers[0].IsCorrect`}
						onChange={(e) => {
							const newArr = values.Questions[index].Answers.map((w) => {
								return { ...w, IsCorrect: false };
							});

							setFieldValue(`Questions[${index}].Answers`, newArr);
							setFieldValue(
								`Questions[${index}].Answers[0].IsCorrect`,
								!e.target.value
							);
						}}
						inputProps={{ 'aria-label': 'A' }}
					/>
					<span className='font-18'>
						{values.Questions[index].Answers[0].Text}
					</span>
				</div>

				<div className='flex align-items-center mb-20 mt-30'>
					<Radio
						checked={values.Questions[index].Answers[1].IsCorrect}
						name={`Questions[${index}].Answers[1].IsCorrect`}
						onChange={(e) => {
							const newArr = values.Questions[index].Answers.map((w) => {
								return { ...w, IsCorrect: false };
							});

							setFieldValue(`Questions[${index}].Answers`, newArr);
							setFieldValue(
								`Questions[${index}].Answers[1].IsCorrect`,
								!e.target.value
							);
						}}
						inputProps={{ 'aria-label': 'A' }}
					/>
					<span className='font-18'>
						{values.Questions[index].Answers[1].Text}
					</span>
				</div>
			</RadioGroup>

			{errors.Questions &&
				errors.Questions[index].Answers &&
				errors.Questions[index].Answers.map((w) => {
					<FormHelperText error={true} variant='standard'>
						{errors.Questions[index].Answers[i] &&
							errors.Questions[index].Answers[i].Text}
					</FormHelperText>;
				})}

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

export default TrueOrFalse;

const useStyles = makeStyles((theme) => ({
	EcercisesBorder: {
		padding: '30px 50px',
		marginBottom: '50px',
		marginBottom: '50px',
		borderRadius: '6px',
		boxShadow: 'rgb(3 102 214 / 30%) 0px 0px 0px 3px',
	},
}));
