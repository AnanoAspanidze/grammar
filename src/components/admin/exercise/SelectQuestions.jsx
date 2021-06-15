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
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { exerciseService } from '../../../services/exercise.service';

function SelectQuestions({ isEditPage, index, data, onEditQuestion }) {
	const { values, setFieldValue, errors, handleChange } = useFormikContext();

	const [loading, setLoading] = useState(false);
	const [value2, setValue2] = useState('');
	const classes = useStyles();
	const [state, setState] = useState({
		open: false,
		vertical: 'top',
		horizontal: 'center',
		severity: '',
		error: null,
	});

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
				იმ ადგილას, სადაც გინდათ, რომ გამოჩნდეს ასარჩევი, ჩაწერეთ #select
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

			<RadioGroup value={value2}>
				{values.Questions[index].Answers.map((item, i) => (
					<>
						<div className='mb-20 mt-30'>
							<div className='w-100 flex align-items-center'>
								<Radio
									disabled={isEditPage}
									checked={item.IsCorrect}
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
									disabled={isEditPage}
									onChange={(e) =>
										setFieldValue(
											`Questions[${index}].Answers[${i}].Text`,
											e.target.value
										)
									}
									value={item.Text}
									placeholder={isEditPage ? '' : 'პასუხი'}
									name={`Questions[${index}].Answers[${i}].Text`}
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
		padding: '50px',
		marginBottom: '50px',
		borderRadius: '6px',
		marginBottom: '50px',
		boxShadow: 'rgb(3 102 214 / 30%) 0px 0px 0px 3px',
	},
}));
