import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

import TextFieldComponent from '../../components/admin/reusable/TextFieldComponent';
import AppBarComponnent from '../../components/admin/header/AppBar';
import AppForm from '../../components/client/forms/AppForm';
import SubmitButton from '../../components/admin/reusable/SubmitButton';
import { accountService } from '../../services/user.service';
import { userSigninSchema } from '../../helpers/schema';
import userContext from '../../context/user/userContext';
import SnackbarComponent from '../../components/admin/reusable/SnackbarComponent';

function Signin() {
	let history = useHistory();

	const [state, setState] = React.useState({
		open: false,
		vertical: 'top',
		horizontal: 'center',
	});
	const { vertical, horizontal, open } = state;

	const { errors, setCurrentUser, setError, clearErrors } = useContext(
		userContext
	);

	const initialValues = {
		Email: 'tediashvili.jemali@gtu.ge',
		Password: 'Admin123!',
	};

	const handleClick = (newState) => {
		setState({ open: true, ...newState });
	};

	function onSubmit(data, action) {
		accountService
			.adminSignin(data.Email, data.Password)
			.then((res) => {
				setCurrentUser({ ...res, Id: res.Id }, res.JwtToken, res.RefreshToken);
				action.setSubmitting(false);
				history.push('/admin');
			})
			.catch((err) => {
				handleClick({ vertical: 'bottom', horizontal: 'center' });
				action.setSubmitting(false);
			});
	}

	return (
		<AppBarComponnent isOpen='false'>
			<AppForm
				initialValues={initialValues}
				validateOnChange={true}
				validationSchema={userSigninSchema}
				onSubmit={onSubmit}
			>
				<Typography variant='h5' component='h5' align='center' gutterBottom>
					ავტორიზაცია
				</Typography>

				<Grid container spacing={5} justify='center'>
					<Grid item xs={12} sm={12} md={6}>
						<div className='mb-30'>
							<TextFieldComponent
								placeholder='ელ ფოსტა'
								name='Email'
								authErrors={errors}
							/>
						</div>
						<div className='mb-30'>
							<TextFieldComponent
								type='password'
								placeholder='პაროლი'
								name='Password'
								authErrors={errors}
							/>
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

			{/* {errors && (
				<SnackbarComponent
					open={open}
					message={errors}
					severity='error'
					handleClose={handleClose}
				/>
			)} */}
		</AppBarComponnent>
	);
}

export default Signin;
