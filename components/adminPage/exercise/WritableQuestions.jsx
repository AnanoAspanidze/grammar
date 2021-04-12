import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import TextFieldComponent from '../reusable/TextFieldComponent';

const DynamicComponentWithNoSSR = dynamic(() => import('react-quill'), {
	ssr: false,
});

function WritableQuestions() {
	const [value, setValue] = useState('');

	const [index, setIndex] = useState('1');
	const [count, setcount] = useState(1);
	const [arrayItems, setArrayItems] = useState([1]);

	const classes = useStyles();

	useEffect(() => {
		const arrayOfDigits = Array.from(String(index), Number);
		setArrayItems(arrayOfDigits);
	}, [index]);

	return (
		<div className={classes.EcercisesBorder}>
			<div>
				იმ ადგილას, სადაც გინდათ, რომ გამოჩნდეს ასარჩევი, ჩაწერეთ #input
			</div>
			<DynamicComponentWithNoSSR
				theme='snow'
				value={value}
				onChange={setValue}
				placeholder='კითხვა'
				style={{ height: '200px', marginBottom: '70px' }}
			/>

			{arrayItems &&
				arrayItems.map((item) => (
					<div className='flex align-items-center mb-20 mt-30'>
						<TextFieldComponent placeholder='სწორი პასუხი' name='correct' />
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

export default WritableQuestions;

const useStyles = makeStyles((theme) => ({
	EcercisesBorder: {
		padding: '30px 50px',
		marginBottom: '50px',
		marginBottom: '50px',
		borderRadius: '6px',
		boxShadow: 'rgb(3 102 214 / 30%) 0px 0px 0px 3px',
	},
}));
