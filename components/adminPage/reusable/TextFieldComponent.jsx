import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useFormikContext } from 'formik';

function TextFieldComponent({ placeholder, name }, props) {
	const { values, handleChange, errors, setFieldError } = useFormikContext();

	const classes = useStyles();

	// useEffect(() => {
	// 	if (authErrors && Object.keys(authErrors).length > 0) {
	// 		setFieldError(name, t(authErrors[0].code));
	// 	}
	// }, [authErrors]);

	return (
		<div className='w-100'>
			<TextField
				className={classes.TextField}
				variant='outlined'
				name={name}
				value={values[name]}
				placeholder={placeholder}
				onChange={handleChange(name)}
			/>

			{errors[name] && (
				<FormHelperText error={true}>{errors[name]}</FormHelperText>
			)}
		</div>
	);
}

export default TextFieldComponent;

const useStyles = makeStyles((theme) => ({
	TextField: {
		width: '100%',
	},
}));
