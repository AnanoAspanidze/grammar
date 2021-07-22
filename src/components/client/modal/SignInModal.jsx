import React, { useState, useContext } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import { accountService } from '../../../services/user.service';
import userContext from '../../../context/user/userContext';
import { Defaults } from '../../../helpers/defaults';

function SignInModal() {
	const { setCurrentUser } = useContext(userContext);
	const history = useHistory();

	const userSigninSchema = Yup.object().shape({
		Email: Yup.string()
			.required('შეავსეთ ველი')
			.email('შეიყვანეთ ელ. ფოსტის მისამართი სწორ ფორმაში'),
		Password: Yup.string().required('შეავსეთ ველი'),
	});

	function onSubmit(data, action) {
		accountService
			.userSignin(data.Email, data.Password)
			.then((res) => {
				if (res.Id) {
					setCurrentUser(
						{ ...res, Id: res.Id },
						res.JwtToken,
						res.RefreshToken
					);

					Defaults.SigninModal.hide();
				}

				history.push('/');
				action.setSubmitting(false);
			})
			.catch((err) => {
				action.setFieldError('Email', err.message.Message);
				action.setSubmitting(false);
			});
	}

	return (
		<>
			<Formik
				initialValues={{ Email: '', Password: '' }}
				validateOnChange={true}
				enableReinitialize={true}
				validationSchema={userSigninSchema}
				onSubmit={onSubmit}
			>
				{({ handleSubmit, handleChange, errors, isSubmitting }) => (
					<form onSubmit={handleSubmit}>
						<div id='popup7' className='overlay'>
							<div className='popup' id='pop-dessapear7'>
								<a
									className='close close-in cursor-pointer'
									id='close-in'
									onClick={() => Defaults.SigninModal.hide()}
								>
									×
								</a>
								<div className='input-popup-bg'>
									<div className='registration-form auth-registration-form'>
										<h4 className='registration-header-title popup-registration-title'>
											ავტორიზაცია
										</h4>

										<div
											className={`form-group input-email auth-input-email popup-auth-input-email ${
												errors.Email ? 'error-input' : ''
											}`}
										>
											<input
												type='email'
												name='Email'
												placeholder='ელ-ფოსტა'
												onChange={handleChange}
											/>
											{errors['Email'] && (
												<p
													className='error-p text-left'
													style={{ marginLeft: '0' }}
												>
													{errors['Email']}
												</p>
											)}
										</div>

										<div
											className={`auth-input-password popup-auth-input-password input-password ${
												errors.Email ? 'error-input' : ''
											}`}
										>
											<input
												type='password'
												name='Password'
												placeholder='პაროლი'
												onChange={handleChange}
											/>
											{errors['Password'] && (
												<p
													className='error-p text-left'
													style={{ marginLeft: '0' }}
												>
													{errors['Password']}
												</p>
											)}
										</div>

										<span
											className='recover-password popup-recover-password cursor-pointer'
											onClick={() => {
												Defaults.SigninModal.hide();
												Defaults.ResetPassword.show();
											}}
										>
											დაგავიწყდა პაროლი?
										</span>
										<button
											type='submit'
											disabled={isSubmitting}
											className='pass-changed-button bg-hover popup-auth-button input-button'
										>
											შესვლა
										</button>

										<div className='auth-path-registration popup-auth-path'>
											<span
												className='cursor-pointer'
												onClick={() => {
													Defaults.SigninModal.hide();
													Defaults.SignUpModal.show();
												}}
											>
												რეგისტრაცია
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</form>
				)}
			</Formik>
		</>
	);
}

export default SignInModal;
