import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextFieldComponent from '../reusable/TextFieldComponent';

function ExerciseCheckbox({ name, placeholder, inputName }) {
	const [checked, setChecked] = useState(false);

	const handleChange = () => {
		setChecked(!checked);
	};

	return (
		<>
			<Checkbox
				checked={checked}
				name={name}
				color='primary'
				onChange={handleChange}
			/>
			<TextFieldComponent placeholder={placeholder} name={inputName} />
		</>
	);
}

export default ExerciseCheckbox;
