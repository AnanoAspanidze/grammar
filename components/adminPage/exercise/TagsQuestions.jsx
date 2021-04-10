import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';

import ExerciseCheckbox from './ExerciseCheckbox';

const DynamicComponentWithNoSSR = dynamic(() => import('react-quill'), {
	ssr: false,
});

function TagsQuestions() {
	const classes = useStyles();
	const [value, setValue] = useState('');
	const [index, setIndex] = useState('1');
	const [count, setcount] = useState(1);
	const [arrayItems, setArrayItems] = useState([1]);

	useEffect(() => {
		const arrayOfDigits = Array.from(String(index), Number);
		setArrayItems(arrayOfDigits);
	}, [index]);

	return (
		<div className={classes.EcercisesBorder}>
			<DynamicComponentWithNoSSR
				theme='snow'
				value={value}
				onChange={setValue}
				placeholder='ტექსტი'
				style={{ height: '200px', marginBottom: '70px' }}
			/>

			<Fab
				component='span'
				onClick={() => {
					setcount(count + 1);
					setIndex((prev) => `${prev}${parseInt(count) + 1}`);
				}}
			>
				<AddIcon />
			</Fab>

			{arrayItems &&
				arrayItems.map((item) => (
					<div className='flex align-items-center mb-20 mt-30'>
						<ExerciseCheckbox
							placeholder='სიტყვა'
							name='1'
							inputName='answer'
						/>
					</div>
				))}

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

export default TagsQuestions;

const useStyles = makeStyles((theme) => ({
	EcercisesBorder: {
		padding: '30px 50px',
		marginBottom: '50px',
		marginBottom: '50px',
		borderRadius: '6px',
		boxShadow: 'rgb(3 102 214 / 30%) 0px 0px 0px 3px',
	},
}));
