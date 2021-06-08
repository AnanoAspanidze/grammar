import React, { useState, useEffect, useContext } from 'react';
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
import { authHeader } from '../../helpers/auth-header';

function Profile({ drawerIsOpen }) {
	const [state, setState] = useState({
		open: false,
		vertical: 'top',
		horizontal: 'center',
		severity: '',
		error: null,
	});

	const [initialValues, setinitialValues] = useState({
		Name: '',
		Surname: '',
		oldPassword: '',
		NewPassword: '',
		RepeatNewPassword: '',
		RegionId: 1,
	});

	const { open } = state;

	const { user, clearErrors } = useContext(userContext);

	// useEffect(() => {
	// 	const requestOptions = {
	// 		method: 'POST',
	// 		headers: {
	// 			...authHeader(),
	// 		},
	// 	};

	// 	fetch(
	// 		`${process.env.REACT_APP_HOST}/Account/refresh-token`,
	// 		requestOptions
	// 	).then((res) => {
	// 		console.log(res);
	// 	});
	// }, []);

	useEffect(() => {
		if (Object.keys(user).length > 0) {
			setinitialValues({
				...initialValues,
				Name: user.unique_name,
				Surname: user.family_name,
			});
		}
	}, [user]);

	const handleClick = (newState, message) => {
		setState({ open: true, error: message, ...newState });
	};

	const handleClose = () => {
		clearErrors();
		setState({ ...state, open: false });
	};

	function onSubmit(data, action) {
		accountService
			.updateAdminInfo({ ...data, Id: user.Id })
			.then((res) => {
				handleClick(
					{ vertical: 'bottom', horizontal: 'center', severity: 'success' },
					res.Message
				);

				accountService.refreshToken().then((res) => console.log(res));
				action.setSubmitting(false);
			})
			.catch((err) => {
				handleClick(
					{ vertical: 'bottom', horizontal: 'center', severity: 'error' },
					err.Message
				);
				action.setSubmitting(false);
			});
	}

	return (
		<AppBarComponnent isOpen={drawerIsOpen}>
			<AppForm
				initialValues={initialValues}
				enableReinitialize={true}
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
