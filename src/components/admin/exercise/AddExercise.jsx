import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { useFormikContext } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import FormHelperText from '@material-ui/core/FormHelperText';
import { exerciseService } from '../../../services/exercise.service';
import ExerciseCheckbox from './ExerciseCheckbox';
import SnackbarComponent from '../reusable/SnackbarComponent';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import AllMainComponents from './AllMainComponents'


function AddExercise({ data, exerciseType, closeModal }) {
	const classes = useStyles();
	const { values, errors, setFieldValue, setFieldError, isSubmitting } = useFormikContext();

	const [state, setState] = useState({
		open: false,
		vertical: 'top',
		horizontal: 'center',
		severity: '',
		error: null,
	});

	const { open } = state;

	const handleClick = (newState, message) => {
		setState({ open: true, error: message, ...newState });
	};

	const handleClose = () => {
		setState({ ...state, open: false });
	};

	const addMore = () => {
		setFieldValue('Answers', [
			...values.Answers,
			{
				Id: 0,
				Text: '',
				IsCorrect: false,
			},
		]);
	};

	const deleteAnswer = (id, i) => {
		const f = values.Answers.filter((r, j) => {
			if (r.Id == id && i == j) {
				return false;
			}

			return r;
		});

		setFieldValue('Answers', f);
	};



	useEffect(() => {
		if (exerciseType === 2) {
			const regex = new RegExp('#input');
			var str = values.Text;
			var match1 = regex.test(str);

			console.log(match1);

			if (!match1) {
				setFieldError(
					`Text`,
					'ტექსტი არ შეიცავს #input - ს'
				);
			}
		}
	}, [errors]);


	return (
		<>
			<DialogTitle className='text-center'>ახალი კითხვის დამატება</DialogTitle>
			<DialogContent>
				<IconButton
					style={{ position: 'absolute', right: '24px', top: '21px' }}
				>
					<CloseRoundedIcon onClick={() => closeModal(false)} />
				</IconButton>

				<div className={classes.container}>
					<div className={classes.EcercisesBorder}>
						{ exerciseType === 3 ? (
							<p>იმ ადგილას, სადაც გინდათ, რომ გამოჩნდეს ჩასაწერი, ჩაწერეთ #input</p>
							) : exerciseType === 2 ? (
							<p>იმ ადგილას, სადაც გინდათ, რომ გამოჩნდეს ასარჩევი, ჩაწერეთ #select</p>
						) : null}
						
						<ReactQuill
							name='Text'
							value={values.Text}
							onChange={(e) => setFieldValue('Text', e)}
							placeholder='კითხვა *'
							style={{ height: '200px', marginBottom: '70px' }}
						/>


						{Object.keys(errors).length > 0 && errors.Text && (
							<FormHelperText error={true} variant='standard'>
								{errors.Text}
							</FormHelperText>
						)}


						<AllMainComponents exerciseType={exerciseType} deleteAnswer={(id, i) => deleteAnswer(id, i)} />

						{exerciseType !== 4 && exerciseType !== 6 && (
							<Fab component='span' onClick={addMore}>
								<AddIcon />
							</Fab>
						)}

						<ReactQuill
							className='mt-80'
							name='RightAnswerText'
							value={values['RightAnswerText']}
							onChange={(e) => setFieldValue('RightAnswerText', e)}
							placeholder='კომენტარი პასუხის სწორად გაცემის შემთხვევაში'
							style={{ height: '200px', marginBottom: '70px' }}
						/>

						<ReactQuill
							name='WrongAnswerText'
							value={values['WrongAnswerText']}
							onChange={(e) => setFieldValue('WrongAnswerText', e)}
							placeholder='კომენტარი პასუხის არასწორად გაცემის შემთხვევაში'
							style={{ height: '200px', marginBottom: '70px' }}
						/>
					</div>
				</div>
			</DialogContent>

			<DialogActions>
				<Button
					type='button'
					size='large'
					color='primary'
					onClick={() => closeModal(false)}
				>
					დახურვა
				</Button>

				<Button
					variant='contained'
					type='submit'
					size='large'
					color='primary'
					disabled={isSubmitting}
				>
					დამატება
				</Button>

				<SnackbarComponent
					open={open}
					message={state.error}
					severity={state.severity}
					handleClose={handleClose}
				/>
			</DialogActions>
		</>
	);
}

export default AddExercise;

const useStyles = makeStyles((theme) => ({
	Textarea: {
		padding: '18.5px 14px',
		font: 'inherit',
		minWidth: 0,
		height: '100px !important',
		width: '95%',
		background: 'none',
		boxSizing: 'content-box',
		borderRadius: '4px',
		border: '1px solid rgba(0, 0, 0, 0.23)',
		fontSize: '16px',
		resize: 'none',
	},
	input: {
		display: 'none',
	},

	MarginLeft: {
		marginRight: '10px',
	},
}));
