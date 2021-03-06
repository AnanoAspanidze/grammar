import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { useFormikContext } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
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
import SnackbarComponent from '../reusable/SnackbarComponent';
import AllMainComponentsEdit from './AllMainComponentsEdit';

function CreateExercise({ data, exerciseType, closeModal }) {
	const classes = useStyles();
	const { values, errors, setErrors, setFieldValue, isSubmitting } =
		useFormikContext();

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

	useEffect(() => {
		if (data) {
			setErrors({});
		}
	}, []);

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
		if (id !== 0) {
			exerciseService
				.deleteAnswer(id)
				.then((res) => {
					const t = values.Answers.filter((r) => r.Id !== id);
					setFieldValue('Answers', t);
					handleClick(
						{ vertical: 'bottom', horizontal: 'center', severity: 'success' },
						res.Message
					);
				})
				.catch((err) => {
					handleClick(
						{ vertical: 'bottom', horizontal: 'center', severity: 'error' },
						err.Message
					);
				});
		} else if (id === 0) {
			const f = values.Answers.filter((r, j) => {
				if (r.Id == id && i == j) {
					return false;
				}

				return r;
			});

			setFieldValue('Answers', f);
		}
	};

	return (
		<>
			<DialogTitle className='text-center'>კითხვის რედაქტირება</DialogTitle>
			<DialogContent>
				<IconButton
					style={{ position: 'absolute', right: '24px', top: '21px' }}
				>
					<CloseRoundedIcon onClick={() => closeModal(false)} />
				</IconButton>

				<div className={classes.container}>
					<div className={classes.EcercisesBorder}>
						<ReactQuill
							name='Text'
							value={values['Text']}
							onChange={(e) => setFieldValue('Text', e)}
							placeholder='კითხვა *'
							style={{ height: '200px', marginBottom: '70px' }}
						/>

						{Object.keys(errors).length > 0 && errors.Text && (
							<FormHelperText error={true} variant='standard'>
								{errors.Text}
							</FormHelperText>
						)}

						<AllMainComponentsEdit
							exerciseType={exerciseType}
							deleteAnswer={(id, i) => deleteAnswer(id, i)}
						/>

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
					შეცვლა
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

export default CreateExercise;

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
