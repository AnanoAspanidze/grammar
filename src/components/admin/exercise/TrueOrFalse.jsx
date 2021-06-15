import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { useFormikContext } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { exerciseService } from '../../../services/exercise.service';

function TrueOrFalse({ isEditPage, data, onEditQuestion, index }) {
	const { values, setFieldValue, errors, handleChange } = useFormikContext();
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const [state, setState] = useState({
		open: false,
		vertical: 'top',
		horizontal: 'center',
		severity: '',
		error: null,
	});

	const handleClick = (newState, message) => {
		setState({ open: true, error: message, ...newState });
	};

	const handleClose = () => {
		setState({ ...state, open: false });
	};

	const deleteQuestion = () => {
		setLoading(true);
		exerciseService
			.deleteQuestion(data.Id)
			.then((res) => {
				const q = values.Questions.filter((r) => r.Id !== data.Id);

				setFieldValue('Questions', q);

				setLoading(false);

				handleClick(
					{ vertical: 'bottom', horizontal: 'center', severity: 'success' },
					res.Message
				);
			})
			.catch((err) => {
				setLoading(false);
				handleClick(
					{ vertical: 'bottom', horizontal: 'center', severity: 'error' },
					err.Message
				);
			});
	};

	console.log(values.Questions[index]);

	return (
		<div className={classes.EcercisesBorder} style={{ position: 'relative' }}>
			{isEditPage && (
				<>
					<IconButton
						onClick={() => onEditQuestion(true, values.Questions[index], index)}
						style={{ position: 'absolute', right: '70px', top: '11px' }}
					>
						<EditIcon />
					</IconButton>

					<IconButton
						onClick={deleteQuestion}
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
				style={{ height: '200px', marginBottom: '70px' }}
			/>

			{errors.Questions && errors.Questions[index] && (
				<FormHelperText error={true} variant='standard'>
					{errors.Questions[index].Text}
				</FormHelperText>
			)}

			<RadioGroup>
				<div className='flex align-items-center mt-30'>
					<Radio
						checked={
							values.Questions && values.Questions[index].Answers[0].IsCorrect
						}
						disabled={isEditPage ? true : false}
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
						{values.Questions[index] && !isEditPage
							? values.Questions[index].Answers[0].Text
							: 'ჭეშმარიტია'}
					</span>
				</div>

				<div className='flex align-items-center mb-20 mt-30'>
					<Radio
						checked={
							values.Questions[index] &&
							values.Questions[index].Answers[1].IsCorrect
						}
						disabled={isEditPage ? true : false}
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
						{values.Questions[index] && !isEditPage
							? values.Questions[index].Answers[1].Text
							: 'მცდარია'}
					</span>
				</div>
			</RadioGroup>

			{/* {errors.Questions && errors.Questions[index].Answers && (
				<FormHelperText error={true} variant='standard'>
					შეავსეთ ველი
				</FormHelperText>
			)} */}

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
		padding: '70px 50px',
		marginBottom: '50px',
		marginBottom: '50px',
		borderRadius: '6px',
		boxShadow: 'rgb(3 102 214 / 30%) 0px 0px 0px 3px',
	},
}));
