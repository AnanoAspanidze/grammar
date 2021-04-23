import React from 'react';
import { useFormikContext } from 'formik';

import ButtonComponent from './ButtonComponent';

function SubmmitButton({ title, ...otherProps }) {
	const { isSubmitting } = useFormikContext();

	return (
		<ButtonComponent
			type='submit'
			disabled={isSubmitting}
			title={title}
			{...otherProps}
		>
			{title}
		</ButtonComponent>
	);
}

export default SubmmitButton;
