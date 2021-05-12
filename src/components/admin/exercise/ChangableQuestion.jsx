import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { makeStyles } from '@material-ui/core/styles';

function ChangableQuestion() {
	const [value, setValue] = useState('');
	const classes = useStyles();
	return (
		<div>
			<ReactQuill
				theme='snow'
				value={value}
				onChange={setValue}
				placeholder='არასწორი ტექსტი'
				style={{ height: '200px', marginBottom: '70px' }}
			/>

			<ReactQuill
				theme='snow'
				value={value}
				onChange={setValue}
				placeholder='სწორი ტექსტი'
				style={{ height: '200px', marginBottom: '70px' }}
			/>

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
				value={value}
				onChange={setValue}
				placeholder='კომენტარი პასუხის არასწორად გაცემის შემთხვევაში'
				style={{ height: '200px', marginBottom: '70px' }}
			/>
		</div>
	);
}

export default ChangableQuestion;

const useStyles = makeStyles((theme) => ({
	EcercisesBorder: {
		padding: '30px 50px',
		marginBottom: '50px',
		marginBottom: '50px',
		borderRadius: '6px',
		boxShadow: 'rgb(3 102 214 / 30%) 0px 0px 0px 3px',
	},
}));
