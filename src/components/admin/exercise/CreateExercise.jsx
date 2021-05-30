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

import ExerciseCheckbox from './ExerciseCheckbox';

function CreateExercise({ data, closeModal }) {
	const classes = useStyles();
	const { values, errors, setFieldValue, isSubmitting } = useFormikContext();

	const [value, setValue] = useState({
		Answers: [
			{
				id: 1,
				Text: '',
				IsCorrect: false,
			},
			{
				id: 2,
				Text: '',
				IsCorrect: false,
			},
			{
				id: 3,
				Text: '',
				IsCorrect: false,
			},
		],
	});

	useEffect(() => {
		if (data) {
			console.log(data);
			setValue({ Answers: data.Answers });
		}
	}, []);

	useEffect(() => {
		setFieldValue('Answers', value.Answers);
	}, [value.Answers]);

	const addMore = () => {
		setValue({
			...value,
			Answers: [
				...value.Answers,
				{
					id: value.Answers.length + 1,
					Text: '',
					IsCorrect: false,
				},
			],
		});
	};

	const handleInputChange = (v, id) => {
		const x = value.Answers.map((w) => {
			if (w.id === id) {
				return { ...w, Text: v };
			}

			return w;
		});

		setValue({ Answers: x });
	};

	const handleCheckbox = (id) => {
		const selectedCheckbox = value.Answers.map((c) => {
			if (c.id === id && c.IsCorrect === false) {
				return { ...c, IsCorrect: true };
			} else if (c.id === id && c.IsCorrect === true)
				return { ...c, IsCorrect: false };

			return c;
		});

		console.log(selectedCheckbox);

		setValue({ ...value, Answers: selectedCheckbox });
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

						{value.Answers &&
							value.Answers.map((item, i) => (
								<div
									className='flex align-items-center mb-20 mt-30'
									key={item.id}
								>
									<ExerciseCheckbox
										placeholder='პასუხი *'
										name={`${item}`}
										checked={item.IsCorrect}
										inputValue={item.Text}
										handleInputChange={(e) =>
											handleInputChange(e.target.value, item.id)
										}
										onChange={() => handleCheckbox(item.id)}
									/>
								</div>
							))}

						<Fab component='span' onClick={addMore}>
							<AddIcon />
						</Fab>

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
