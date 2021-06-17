import React, { useState, useEffect } from 'react';
import { useFormikContext } from 'formik';
import ReactQuill from 'react-quill';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import TextFieldComponent from '../reusable/TextFieldComponent';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { exerciseService } from '../../../services/exercise.service';

function WritableQuestions({ isEditPage, index, data, onEditQuestion }) {
	const { values, setFieldValue, errors, handleChange } = useFormikContext();
	const [loading, setLoading] = useState(false);
	const [state, setState] = useState({
		open: false,
		vertical: 'top',
		horizontal: 'center',
		severity: '',
		error: null,
	});

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

			<div>
				იმ ადგილას, სადაც გინდათ, რომ გამოჩნდეს ჩასაწერი, ჩაწერეთ #input
			</div>

			<ReactQuill
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

			{values.Questions[index].Answers.map((item, i) => (
				<>
					<div className='mt-30 mb-20' key={i}>
						<TextFieldComponent
							disabled={isEditPage}
							placeholder='სწორი პასუხი'
							name={`Questions[${index}].Answers[${i}].Text`}
							value={values.Questions[index].Answers[i].Text}
							onChange={(e) =>
								setFieldValue(
									`Questions[${index}].Answers[${i}].Text`,
									e.target.value
								)
							}
						/>
						{errors.Questions &&
							errors.Questions[index] &&
							errors.Questions[index].Answers && (
								<div className='mb-20'>
									<FormHelperText error={true} variant='standard'>
										{errors.Questions[index].Answers[i]
											? errors.Questions[index].Answers[i].Text
											: ''}
									</FormHelperText>
								</div>
							)}
					</div>
				</>
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

export default WritableQuestions;

const useStyles = makeStyles((theme) => ({
	EcercisesBorder: {
		padding: '50px',
		marginBottom: '50px',
		marginBottom: '50px',
		borderRadius: '6px',
		boxShadow: 'rgb(3 102 214 / 30%) 0px 0px 0px 3px',
	},
}));
