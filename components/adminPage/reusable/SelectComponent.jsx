import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useFormikContext } from 'formik';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';

function SelectComponent({ label, name, value, options }) {
	const classes = useStyles();
	const { values, errors, setFieldValue } = useFormikContext();

	useEffect(() => {
		if (values['part'] == '1') {
			setFieldValue('desc', 'ტესტური კითხვის აღწერა');
		} else if (values['part'] == '2') {
			setFieldValue('desc', 'ჩამოსაშლელი და ასარჩევი კითხვის აღწერა');
		} else if (values['part'] == '3') {
			setFieldValue('desc', 'ჩასაწერი კითხვის აღწერა');
		} else if (values['part'] == '4') {
			setFieldValue('desc', 'ჩასწორებადი კითხვის აღწერა');
		} else if (values['part'] == '5') {
			setFieldValue('desc', 'სიტყვის ან სიტყვების არჩევის კითხვის აღწერა');
		} else if (values['part'] == '6') {
			setFieldValue('desc', 'ჭეშმარიტია/მცდარია კითხვის აღწერა');
		} else if (values['part'] == '7') {
			setFieldValue('desc', 'drag and drop კითხვის აღწერა');
		} else if (values['part'] == '8') {
			setFieldValue('desc', 'კროსვორდის კითხვის აღწერა');
		}
	}, [values]);

	return (
		<FormControl variant='outlined' className={classes.formControl}>
			<InputLabel>{label}</InputLabel>
			<Select
				value={values[name]}
				onChange={(event) => setFieldValue(name, event.target.value)}
				label={label}
			>
				{options &&
					options.map((option) => (
						<MenuItem key={option.id} value={option.value}>
							{option.label}
						</MenuItem>
					))}
			</Select>

			{errors[name] && (
				<FormHelperText error={true} variant='standard'>
					{errors[name]}
				</FormHelperText>
			)}
		</FormControl>
	);
}

export default SelectComponent;

const useStyles = makeStyles((theme) => ({
	formControl: {
		minWidth: 120,
		width: '100%',
	},

	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));
