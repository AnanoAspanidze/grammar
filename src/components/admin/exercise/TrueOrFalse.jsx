import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

function TrueOrFalse() {
	const [value, setValue] = React.useState('');
	const [value2, setValue2] = React.useState('');
	const classes = useStyles();
	const handleChange = (event) => {
		setValue2(event.target.value);
	};

	return (
		<div className={classes.EcercisesBorder}>
			<ReactQuill
				theme='snow'
				value={value}
				onChange={setValue}
				placeholder='კითხვის ტექსტი'
				style={{ height: '200px', marginBottom: '70px' }}
			/>

			<FormControl component='fieldset' style={{ marginBottom: '40px' }}>
				<RadioGroup
					aria-label='trueOrFalse'
					name='trueOrFalse1'
					value={value2}
					onChange={handleChange}
				>
					<FormControlLabel
						value='true'
						control={<Radio color='primary' />}
						label='ჭეშმარიტია'
					/>

					<FormControlLabel
						value='false'
						control={<Radio color='primary' />}
						label='მცდარია'
					/>
				</RadioGroup>
			</FormControl>

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

export default TrueOrFalse;

const useStyles = makeStyles((theme) => ({
	EcercisesBorder: {
		padding: '30px 50px',
		marginBottom: '50px',
		marginBottom: '50px',
		borderRadius: '6px',
		boxShadow: 'rgb(3 102 214 / 30%) 0px 0px 0px 3px',
	},
}));
