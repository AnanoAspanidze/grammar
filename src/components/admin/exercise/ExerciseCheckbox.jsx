import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core/styles';
import { useFormikContext } from 'formik';

function ExerciseCheckbox({
	name,
	placeholder,
	checked,
	inputValue,
	onChange,
	handleInputChange,
	disabled,
}) {
	const classes = useStyles();

	const { values, handleChange, errors, setFieldError } = useFormikContext();

	return (
		<>
			<Checkbox
				checked={checked}
				name={name}
				color='primary'
				onChange={onChange}
				disabled={disabled}
			/>
			<div className='w-100'>
				<TextField
					className={classes.TextField}
					variant='outlined'
					name={name}
					value={inputValue}
					label={placeholder}
					onChange={handleInputChange}
					disabled={disabled}
				/>

				{errors[name] && (
					<FormHelperText error={true}>{errors[name]}</FormHelperText>
				)}
			</div>
		</>
	);
}

export default ExerciseCheckbox;

ExerciseCheckbox.defaultProps = {
	disabled: false,
};

const useStyles = makeStyles((theme) => ({
	TextField: {
		width: '100%',
	},
}));
