import React, { useState } from 'react';
import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import SelectComponent from '../../../components/admin/reusable/SelectComponent';
import TextFieldComponent from '../../../components/admin/reusable/TextFieldComponent';
import AppForm from '../../../components/client/forms/AppForm';
import AppBarComponnent from '../../../components/admin/header/AppBar';
import SubmitButton from '../../../components/admin/reusable/SubmitButton';
import { getCookie } from '../../../helpers/cookie';

function Addissue({ drawerIsOpen }) {
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
	const [age, setAge] = useState('');

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

	return (
		<AppBarComponnent isOpen={drawerIsOpen}>
			<AppForm
				initialValues={initialValues}
				validateOnChange={true}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
			>
				<Typography variant='h5' component='h5' align='center' gutterBottom>
					საკითხის დამატება
				</Typography>

				<Grid container spacing={5} justify='center'>
					<Grid item xs={12} sm={12} md={6}>
						<div className='mb-30 mt-30'>
							<SelectComponent name='part' label='ნაწილი *' options={array} />
						</div>

						<div className='mb-30'>
							<TextFieldComponent placeholder='სახელი *' name='name' />
						</div>

						<div className='flex space-center'>
							<SubmitButton
								title='დამატება'
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

export default Addissue;

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
