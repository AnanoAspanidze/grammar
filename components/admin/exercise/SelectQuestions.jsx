import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import ExerciseCheckbox from './ExerciseCheckbox';
import ExerciseRadioBtn from './ExerciseRadioBtn';
const DynamicComponentWithNoSSR = dynamic(() => import('react-quill'), {
	ssr: false,
});

function SelectQuestions() {
	const [value, setValue] = useState('');
	const [value2, setValue2] = useState('');
	const classes = useStyles();
	const [index, setIndex] = useState('12');
	const [count, setcount] = useState(2);
	const [arrayItems, setArrayItems] = useState([1, 2]);

	useEffect(() => {
		const arrayOfDigits = Array.from(String(index), Number);
		setArrayItems(arrayOfDigits);
	}, [index]);

	const handleChange = (event) => {
		setValue2(event.target.value);
	};

	return (
		<div className={classes.EcercisesBorder}>
			<div>
				იმ ადგილას, სადაც გინდათ, რომ გამოჩნდეს ასარჩევი, ჩაწერეთ #select
			</div>
			<DynamicComponentWithNoSSR
				theme='snow'
				value={value}
				onChange={setValue}
				placeholder='კითხვა'
				style={{ height: '200px', marginBottom: '70px' }}
			/>

			<RadioGroup
				aria-label='trueOrFalse1'
				name='trueOrFalse1'
				value={value2}
				onChange={handleChange}
			>
				{arrayItems &&
					arrayItems.map((item) => (
						<div className='flex align-items-center mb-20 mt-30'>
							<ExerciseRadioBtn
								placeholder='პასუხი'
								value={`${item}`}
								inputName='answer'
							/>
						</div>
					))}
			</RadioGroup>

			<Fab
				component='span'
				onClick={() => {
					setcount(count + 1);
					setIndex((prev) => `${prev}${parseInt(count) + 1}`);
				}}
			>
				<AddIcon />
			</Fab>

			<DynamicComponentWithNoSSR
				theme='snow'
				className='mt-80'
				value={value}
				onChange={setValue}
				placeholder='კომენტარი პასუხის სწორად გაცემის შემთხვევაში'
				style={{ height: '200px', marginBottom: '70px' }}
			/>
			<DynamicComponentWithNoSSR
				theme='snow'
				value={value}
				onChange={setValue}
				placeholder='კომენტარი პასუხის არასწორად გაცემის შემთხვევაში'
				style={{ height: '200px', marginBottom: '70px' }}
			/>
		</div>
	);
}

export default SelectQuestions;

const useStyles = makeStyles((theme) => ({
	EcercisesBorder: {
		padding: '30px 50px',
		marginBottom: '50px',
		borderRadius: '6px',
		marginBottom: '50px',
		boxShadow: 'rgb(3 102 214 / 30%) 0px 0px 0px 3px',
	},
}));
