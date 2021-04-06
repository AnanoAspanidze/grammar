import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import SelectComponent from '../../../components/adminPage/reusable/SelectComponent';
import TextFieldComponent from '../../../components/adminPage/reusable/TextFieldComponent';
import AppForm from '../../../components/client/forms/AppForm';
import AppBarComponnent from '../../../components/adminPage/header/AppBar';
import SubmitButton from '../../../components/adminPage/reusable/SubmitButton';
import ButtonComponent from '../../../components/adminPage/reusable/ButtonComponent';

function addexecise() {
	const classes = useStyles();

	const [array, setarray] = useState([
		{
			id: 1,
			value: 'მორფოლოგია',
			label: 'მორფოლოგია',
		},
		{
			id: 2,
			value: 'სინტაქსი',
			label: 'სინტაქსი',
		},
	]);

	const [checked, setChecked] = useState(true);
	const [checkedId, setCheckedId] = useState(null);

	const validationSchema = Yup.object().shape({
		part: Yup.string().required('Fill out the field'),
		name: Yup.string().required('Fill out the field'),
	});

	const initialValues = {
		part: '',
		name: '',
	};

	function onSubmit(data, action) {
		console.log(data);
	}

	const handleChange = (event) => {
		setChecked(event.target.checked);
		setCheckedId(parseInt(event.target.id));
	};

	return (
		<AppBarComponnent>
			<AppForm
				initialValues={initialValues}
				validateOnChange={true}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
			>
				<Typography variant='h5' component='h5' align='center' gutterBottom>
					სავარჯიშოს დამატება
				</Typography>

				<Grid container spacing={5} justify='center'>
					<Grid item xs={12} sm={12} md={6}>
						<div className='mb-30 mt-30'>
							<SelectComponent name='part' label='ნაწილი' options={array} />
						</div>
						<div className='mb-30 mt-30'>
							<SelectComponent
								name='part'
								label='საკითხის არჩევა'
								options={array}
							/>
						</div>

						<div className='flex align-items-center mb-30'>
							<span>შემაჯამებელი სავარჯიშო</span>
							<Checkbox
								checked={checked}
								color='primary'
								onChange={handleChange}
							/>
						</div>

						<div className='mb-30 mt-30'>
							<SelectComponent
								name='part'
								label='სავარჯიშოს ტიპი'
								options={array}
							/>
						</div>

						<div className='mb-30'>
							<TextFieldComponent
								placeholder='სავარჯიშოს სათაური'
								name='name'
							/>
						</div>

						<div className='mb-30'>
							<ButtonComponent title='გრამატიკის წესები' />
						</div>

						<div className='mb-30'>
							<TextareaAutosize
								className={classes.Textarea}
								aria-label='empty textarea'
								placeholder='Empty'
							/>
						</div>

						<div className='flex space-center'>
							<SubmitButton
								title='Add Issue'
								size='large'
								color='primary'
								variant='contained'
							/>
						</div>
					</Grid>
				</Grid>
			</AppForm>
		</AppBarComponnent>
	);
}

export default addexecise;

const useStyles = makeStyles((theme) => ({
	Textarea: {
		padding: '18.5px 14px',
		font: 'inherit',
		minWidth: 0,
		height: '100px !important',
		width: '95%',
		background: 'none',
		boxSizing: 'content-box',
		borderRadius: '4px',
		border: '1px solid rgba(0, 0, 0, 0.23)',
		fontSize: '16px',
		resize: 'none',
	},
}));