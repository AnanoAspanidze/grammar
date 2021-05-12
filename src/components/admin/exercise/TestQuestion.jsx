import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import ExerciseCheckbox from './ExerciseCheckbox';

function TestQuestion() {
	const [value, setValue] = useState('');
	const [value2, setValue2] = useState('');
	const classes = useStyles();
	const [index, setIndex] = useState('123');
	const [count, setcount] = useState(3);
	const [arrayItems, setArrayItems] = useState([1, 2, 3]);

	useEffect(() => {
		const arrayOfDigits = Array.from(String(index), Number);
		setArrayItems(arrayOfDigits);
	}, [index]);

	return (
		<div className={classes.EcercisesBorder}>
			<ReactQuill
				theme='snow'
				value={value}
				onChange={setValue}
				placeholder='კითხვა *'
				style={{ height: '200px', marginBottom: '70px' }}
			/>

			{arrayItems &&
				arrayItems.map((item) => (
					<div className='flex align-items-center mb-20 mt-30'>
						<ExerciseCheckbox
							placeholder='პასუხი *'
							name={`${item}`}
							inputName={`${item}`}
						/>
					</div>
				))}

			<Fab
				component='span'
				onClick={() => {
					setcount(count + 1);
					setIndex((prev) => `${prev}${parseInt(count) + 1}`);
				}}
			>
				<AddIcon />
			</Fab>

			<ReactQuill
				theme='snow'
				className='mt-80'
				value={value}
				onChange={setValue}
				placeholder='კომენტარი პასუხის სწორად გაცემის შემთხვევაში'
				style={{ height: '200px', marginBottom: '70px' }}
			/>

			<ReactQuill
				theme='snow'
				value={value2}
				onChange={setValue2}
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
