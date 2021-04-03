import React from 'react';
import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import TextFieldComponent from '../../components/adminPage/reusable/TextFieldComponent';
import AppBarComponnent from '../../components/adminPage/header/AppBar';
import AppForm from '../../components/client/forms/AppForm';
import SubmitButton from '../../components/adminPage/reusable/SubmitButton';

function profile() {
	const validationSchema = Yup.object().shape({
		name: Yup.string().required('Fill out the field'),
		lastName: Yup.string().required('Fill out the field'),
		password: Yup.string().required('Fill out the field'),
	});

	const initialValues = {
		name: '',
		lastName: '',
		password: '',
	};

	function onSubmit(data, action) {
		console.log(data);
	}

	return (
		<AppBarComponnent>
			<AppForm
				initialValues={initialValues}
				validateOnChange={true}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
			>
				<Typography variant='h5' component='h5' align='center' gutterBottom>
					მომხმარებლის შესახებ
				</Typography>
				<Grid container spacing={5} justify='center'>
					<Grid item xs={12} sm={12} md={6}>
						<div className='mb-30'>
							<TextFieldComponent placeholder='სახელი' name='name' />
						</div>
						<div className='mb-30'>
							<TextFieldComponent placeholder='გვარი' name='lastName' />
						</div>
						<div className='mb-30'>
							<TextFieldComponent placeholder='პაროლი' name='password' />
						</div>

						<div className='flex space-center'>
							<SubmitButton
								title='პროფილის რედაქტირება'
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

export default profile;
