import React, { Fragment, useEffect } from 'react';
import { useFormikContext } from 'formik';

import Input from '../styled-components/InputField';
import Textarea from '../styled-components/Textarea';
import ErrorMessage from './ErrorMessage';

function InputField({ t, name, type, placeholder, authErrors, ...otherProps }) {
	const { values, handleChange, errors, setFieldError } = useFormikContext();

	useEffect(() => {
		if (authErrors && Object.keys(authErrors).length > 0) {
			setFieldError(name, t(authErrors[0].code));
		}
	}, [authErrors]);

	if (type == 'textarea') {
		return (
			<div className='form__group'>
				<Textarea
					name={name}
					value={values[name]}
					placeholder={placeholder}
					onChange={handleChange(name)}
					{...otherProps}
				/>

				{errors[name] && <ErrorMessage error={errors[name]} />}
			</div>
		);
	} else {
		return (
			<div className='form__group'>
				<Input
					type={type}
					name={name}
					value={values[name]}
					placeholder={placeholder}
					onChange={handleChange(name)}
					{...otherProps}
				/>

				{errors[name] && <ErrorMessage error={errors[name]} />}
			</div>
		);
	}
}

InputField.defaultProps = {
	type: 'text',
	autoComplete: 'off',
	onBlur: null,
};

export default InputField;
