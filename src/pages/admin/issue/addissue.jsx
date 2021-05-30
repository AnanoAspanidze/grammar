import React, { useState, useEffect, useContext } from 'react';
import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import SelectComponent from '../../../components/admin/reusable/SelectComponent';
import TextFieldComponent from '../../../components/admin/reusable/TextFieldComponent';
import AppForm from '../../../components/client/forms/AppForm';
import AppBarComponnent from '../../../components/admin/header/AppBar';
import SubmitButton from '../../../components/admin/reusable/SubmitButton';
import { issueService } from '../../../services/issue.service';
import { commonService } from '../../../services/common.service';
import SnackbarComponent from '../../../components/admin/reusable/SnackbarComponent';

function Addissue({ drawerIsOpen }) {
	const [array, setArray] = useState(null);
	const [state, setState] = React.useState({
		open: false,
		vertical: 'top',
		horizontal: 'center',
		severity: '',
		error: null,
	});

	const validationSchema = Yup.object().shape({
		CategoryId: Yup.string().required('შეავსეთ ველი'),
		Name: Yup.string().required('შეავსეთ ველი'),
	});

	const initialValues = {
		Name: '',
		CategoryId: '',
	};
	const { open } = state;

	useEffect(() => {
		commonService.getParts().then((res) => {
			setArray(res);
		});
	}, []);

	function onSubmit(data, action) {
		issueService
			.createIssue(data.Name, data.CategoryId)
			.then((res) => {
				handleClick(
					{ vertical: 'bottom', horizontal: 'center', severity: 'success' },
					res.Message
				);
				action.setSubmitting(false);
				action.resetForm({});
			})
			.catch((err) => {
				handleClick(
					{ vertical: 'bottom', horizontal: 'center', severity: 'error' },
					err
				);
				action.setSubmitting(false);
			});
	}

	const handleClick = (newState, message) => {
		setState({ open: true, error: message, ...newState });
	};

	const handleClose = () => {
		setState({ ...state, open: false });
	};

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
							<SelectComponent
								name='CategoryId'
								label='ნაწილი *'
								text='Name'
								value='Id'
								options={array}
								id='demo-controlled-open-select'
							/>
						</div>

						<div className='mb-30'>
							<TextFieldComponent placeholder='სახელი *' name='Name' />
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

			<SnackbarComponent
				open={open}
				message={state.error}
				severity={state.severity}
				handleClose={handleClose}
			/>
		</AppBarComponnent>
	);
}

export default Addissue;
