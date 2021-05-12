import React, { useState } from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import TextFieldComponent from '../reusable/TextFieldComponent';

function ExerciseRadioBtn({ placeholder, inputName, value }) {
	return (
		<>
			<FormControlLabel value={value} control={<Radio color='primary' />} />
			<TextFieldComponent placeholder={placeholder} name={inputName} />
		</>
	);
}

export default ExerciseRadioBtn;
