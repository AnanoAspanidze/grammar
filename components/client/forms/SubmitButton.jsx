import React from 'react';
import { useFormikContext } from 'formik';
import Button from '../styled-components/Button';

function SubmitButton({ title, ...otherProps }) {
	const { isSubmitting } = useFormikContext();

	return (
		<Button disabled={isSubmitting} {...otherProps}>
			{title}
		</Button>
	);
}

export default SubmitButton;
