import React from 'react';
import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import TextFieldComponent from '../../components/admin/reusable/TextFieldComponent';
import AppBarComponnent from '../../components/admin/header/AppBar';
import AppForm from '../../components/client/forms/AppForm';
import SubmitButton from '../../components/admin/reusable/SubmitButton';
import { getCookie } from '../../helpers/cookie';

function Signin({ drawerIsOpen }) {
	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.required('შეავსეთ ველი')
			.email('შეიყვანეთ ელ. ფოსტის მისამართი სწორ ფორმაში'),
		password: Yup.string().required('შეავსეთ ველი'),
	});

	const initialValues = {
		email: '',
		password: '',
	};

	function onSubmit(data, action) {
		console.log(data);
	}

	return (
		<AppBarComponnent isOpen={drawerIsOpen}>
			<AppForm
				initialValues={initialValues}
				validateOnChange={true}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
			>
				<Typography variant='h5' component='h5' align='center' gutterBottom>
					ავტორიზაცია
				</Typography>
				<Grid container spacing={5} justify='center'>
					<Grid item xs={12} sm={12} md={6}>
						<div className='mb-30'>
							<TextFieldComponent placeholder='ელ ფოსტა' name='email' />
						</div>
						<div className='mb-30'>
							<TextFieldComponent placeholder='პაროლი' name='password' />
						</div>

						<div className='flex space-center'>
							<SubmitButton
								title='ავტორიზაცია'
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

export default Signin;

export async function getServerSideProps(ctx) {
	let cookie = '';

	if (getCookie('Drawer', ctx.req)) {
		cookie = getCookie('Drawer', ctx.req);
	} else {
		cookie = 'true';
	}

	return {
		props: { drawerIsOpen: cookie },
	};
}
