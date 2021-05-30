import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { useFormikContext } from 'formik';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import ExerciseCheckbox from './ExerciseCheckbox';

function TestQuestion({ data, index, closeModal, setDeleteQuestion, onClick }) {
	const classes = useStyles();
	const { values, setFieldValue } = useFormikContext();

	const [value, setValue] = useState({
		Answers: [
			{
				id: 1,
				Text: '',
				IsCorrect: false,
			},
		],
		Text: '',
		WrongAnswerText: '',
		RightAnswerText: '',
	});

	const handleChange = (inputvalue, name) => {
		setValue({ ...value, [name]: inputvalue });
	};

	const handleInputChange = (v, id) => {
		const oldState = { ...value };
		oldState.Answers[id - 1].Text = v;

		setValue(oldState);
	};

	const addMore = () => {
		setValue({
			...value,
			Answers: [
				...value.Answers,
				{
					id: 0,
					Text: '',
					IsCorrect: false,
				},
			],
		});
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

	useEffect(() => {
		setFieldValue(`Questions[${values.index - 1}]`, value);
	}, [value]);

	useEffect(() => {
		setValue(data);
	}, []);

	console.log(values);
	return (
		<div
			className={classes.EcercisesBorder}
			style={{ position: 'relative', paddingTop: '70px' }}
		>
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
			<ReactQuill
				disabled={true}
				theme='snow'
				readOnly={true}
				value={value.Text}
				onChange={(e) => handleChange(e, 'Text')}
				placeholder='კითხვა *'
				style={{ height: '200px', marginBottom: '70px' }}
			/>

			{value.Answers.map((item) => (
				<div className='flex align-items-center mb-20 mt-30' key={item.id}>
					<ExerciseCheckbox
						placeholder='პასუხი *'
						name={`${item}`}
						checked={item.IsCorrect}
						inputValue={item.Text}
						disabled={true}
					/>
				</div>
			))}

			<ReactQuill
				theme='snow'
				className='mt-80'
				value={value.RightAnswerText}
				readOnly={true}
				onChange={(e) => handleChange(e, 'RightAnswerText')}
				placeholder='კომენტარი პასუხის სწორად გაცემის შემთხვევაში'
				style={{ height: '200px', marginBottom: '70px' }}
			/>

			<ReactQuill
				theme='snow'
				value={value.WrongAnswerText}
				readOnly={true}
				onChange={(e) => handleChange(e, 'WrongAnswerText')}
				placeholder='კომენტარი პასუხის არასწორად გაცემის შემთხვევაში'
				style={{ height: '200px', marginBottom: '70px' }}
			/>
		</div>
	);
}

export default TestQuestion;

const useStyles = makeStyles((theme) => ({
	EcercisesBorder: {
		padding: '30px 50px',
		marginBottom: '50px',
		marginBottom: '50px',
		borderRadius: '6px',
		boxShadow: 'rgb(3 102 214 / 30%) 0px 0px 0px 3px',
	},
}));
