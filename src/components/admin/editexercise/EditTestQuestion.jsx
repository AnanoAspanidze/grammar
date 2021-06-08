import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { useFormikContext } from 'formik';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import ExerciseCheckbox from '../exercise/ExerciseCheckbox';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import { exerciseService } from '../../../services/exercise.service';
import SnackbarComponent from '../reusable/SnackbarComponent';

function EditTestQuestion({ data, index, isEditPage, onEditQuestion }) {
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const [state, setState] = useState({
		open: false,
		vertical: 'top',
		horizontal: 'center',
		severity: '',
		error: null,
	});
	const { open } = state;

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

	if (values.Id) {
		return (
			<div
				className={classes.EcercisesBorder}
				style={{ position: 'relative', paddingTop: '70px' }}
			>
				{isEditPage && (
					<>
						<IconButton
							onClick={() =>
								onEditQuestion(true, values.Questions[index], index)
							}
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
					placeholder='კითხვა *'
					style={{ height: '200px', marginBottom: '70px' }}
				/>

				{values.Questions[index].Answers.map((item, i) => (
					<div className='flex align-items-center mb-20 mt-30' key={i}>
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

						<div className='w-100'>
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

							{/* {errors[name] && (
                                <FormHelperText error={true}>{errors[name]}</FormHelperText>
                            )} */}
						</div>
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
					readOnly={isEditPage}
					placeholder='კომენტარი პასუხის სწორად გაცემის შემთხვევაში'
					style={{ height: '200px', marginBottom: '70px' }}
				/>

				<ReactQuill
					theme='snow'
					name={`Questions[${index}].WrongAnswerText`}
					value={values.Questions[index].WrongAnswerText}
					readOnly={isEditPage}
					placeholder='კომენტარი პასუხის არასწორად გაცემის შემთხვევაში'
					style={{ height: '200px', marginBottom: '70px' }}
				/>

				<SnackbarComponent
					open={open}
					message={state.error}
					severity={state.severity}
					handleClose={handleClose}
				/>
			</div>
		);
	} else {
		return null;
	}
}

export default EditTestQuestion;

EditTestQuestion.defaultProps = {
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
