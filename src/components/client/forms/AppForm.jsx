import React from 'react';
import { Formik, Form } from 'formik';

function AppForm({
	initialValues,
	validationSchema,
	validateOnChange,
	onSubmit,
	children,
	...otherProps
}) {
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			validateOnChange={validateOnChange}
			onSubmit={onSubmit}
			{...otherProps}
		>
			{() => <Form className='w-100'>{children}</Form>}
		</Formik>
	);
}

export default AppForm;
