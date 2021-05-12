import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import TextFieldComponent from '../../components/admin/reusable/TextFieldComponent';
import AppBarComponnent from '../../components/admin/header/AppBar';
import AppForm from '../../components/client/forms/AppForm';
import SubmitButton from '../../components/admin/reusable/SubmitButton';
import { accountService } from '../../services/user.service';
import { updateAdminInfoSchema } from '../../helpers/schema';
import userContext from '../../context/user/userContext';
import SnackbarComponent from '../../components/admin/reusable/SnackbarComponent';

function Profile() {
	const [state, setState] = React.useState({
		open: false,
		vertical: 'top',
		horizontal: 'center',
		severity: '',
		error: null,
	});
	const { open } = state;

	const { user, clearErrors } = useContext(userContext);

	const handleClick = (newState, message) => {
		setState({ open: true, error: message, ...newState });
	};

	const handleClose = () => {
		clearErrors();
		setState({ ...state, open: false });
	};

	const initialValues = {
		Name: user.Name,
		Surname: user.Surname,
		oldPassword: '',
		NewPassword: '',
		RepeatNewPassword: '',
	};

	function onSubmit(data, action) {
		accountService
			.updateAdminInfo({ ...data, Id: user.Id })
			.then((res) => {
				handleClick(
					{ vertical: 'bottom', horizontal: 'center', severity: 'success' },
					res.Message
				);
				action.setSubmitting(false);
			})
			.catch((err) => {
				handleClick(
					{ vertical: 'bottom', horizontal: 'center', severity: 'error' },
					err
				);
				action.setSubmitting(false);
			});
	}

	return (
		<AppBarComponnent isOpen='true'>
			<AppForm
				initialValues={initialValues}
				validateOnChange={true}
				validationSchema={updateAdminInfoSchema}
				onSubmit={onSubmit}
			>
				<Typography variant='h5' component='h5' align='center' gutterBottom>
					მომხმარებლის შესახებ
				</Typography>
				<Grid container spacing={5} justify='center'>
					<Grid item xs={12} sm={12} md={6}>
						<div className='mb-30'>
							<TextFieldComponent placeholder='სახელი' name='Name' />
						</div>
						<div className='mb-30'>
							<TextFieldComponent placeholder='გვარი' name='Surname' />
						</div>
						<div className='mb-30'>
							<TextFieldComponent
								placeholder='მიმდინარე პაროლი'
								name='oldPassword'
							/>
						</div>

						<div className='mb-30'>
							<TextFieldComponent
								placeholder='ახალი პაროლი'
								name='NewPassword'
							/>
						</div>

						<div className='mb-30'>
							<TextFieldComponent
								placeholder='გაიმეორეთ ახალი პაროლი'
								name='RepeatNewPassword'
							/>
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

			<SnackbarComponent
				open={open}
				message={state.error}
				severity={state.severity}
				handleClose={handleClose}
			/>
		</AppBarComponnent>
	);
}

export default Profile;
