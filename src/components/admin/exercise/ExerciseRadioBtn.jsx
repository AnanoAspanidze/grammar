import React, { useState } from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import TextFieldComponent from '../reusable/TextFieldComponent';

function ExerciseRadioBtn({
	placeholder,
	inputName,
	value,
	radioBtnValue,
	handleChange,
	handleInputChange,
}) {
	return (
		<>
			<RadioGroup
				name={inputName}
				value={radioBtnValue}
				onChange={handleChange}
			>
				<FormControlLabel value={value} control={<Radio color='primary' />} />
			</RadioGroup>

			<TextFieldComponent
				onChange={handleInputChange}
				placeholder={placeholder}
				name={inputName}
			/>
		</>
	);
}

export default ExerciseRadioBtn;
