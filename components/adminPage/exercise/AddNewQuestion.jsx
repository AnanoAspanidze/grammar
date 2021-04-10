import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { useFormikContext } from 'formik';

function AddNewQuestion() {
	const { values, setFieldValue } = useFormikContext();

	return (
		<Button onClick={() => setFieldValue('index', values['index'] + 1)}>
			კითხვის დამატება <AddIcon />
		</Button>
	);
}

export default AddNewQuestion;
