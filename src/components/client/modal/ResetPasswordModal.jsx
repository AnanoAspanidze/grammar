import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import SmileImg from '../../../assets/images/forgot-password/forgot-password-smile.svg';
import angelImg from '../../../assets/images/forgot-password/angel.svg';
import { accountService } from '../../../services/user.service';
import { Defaults } from '../../../helpers/defaults';

function ResetPasswordModal() {
	const userSigninSchema = Yup.object().shape({
		Email: Yup.string()
			.required('შეავსეთ ველი')
			.email('შეიყვანეთ ელ. ფოსტის მისამართი სწორ ფორმაში'),
	});

	const [isSuccess, setisSuccess] = useState(false);

	function onSubmit(data, action) {
		accountService
			.SendResetPasswordMail(data)
			.then((res) => {
				action.setSubmitting(false);
				setisSuccess(true);
			})
			.catch((err) => {
				action.setSubmitting(false);
			});
	}

	return (
		<>
			<Formik
				initialValues={{ Email: '' }}
				validateOnChange={true}
				enableReinitialize={true}
				validationSchema={userSigninSchema}
				onSubmit={onSubmit}
			>
				{({ handleSubmit, handleChange, errors, values, isSubmitting }) => (
					<form onSubmit={handleSubmit}>
						<div className='input-popup-bg'>
							<div className='registration-form registration-form-signin registration-form-forgotpas'>
								{!isSuccess && (
									<div className='first-forgot-pass' id='first-forgot-pass'>
										<img src={SmileImg} alt='' />
										<div>
											<h3>დაგავიწყდა პაროლი?</h3>
											<p>
												ჩაწერე რეგისტრაციისას გამოყენებული ელ-ფოსტის მისამართი
												და ჩვენ დაგეხმარებით მის აღდგენაში.
											</p>
										</div>

										<div className='form-group input-email auth-input-email forgot-input-email'>
											<input
												type='email'
												name='Email'
												onChange={handleChange}
												placeholder='ელ-ფოსტა'
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
										<button
											disabled={isSubmitting}
											type='submit'
											className='auth-button .sign-in-single-button input-button'
										>
											გამომიგზავნე აღდგენის ბმული
										</button>
									</div>
								)}

								{isSuccess && (
									<div
										className='second-forgot-pass'
										id='second-forgot-pass'
										style={{ display: 'block' }}
									>
										<img src={angelImg} alt='img' />
										<div className='second-forgot-pass-content'>
											<h3 className='second-forgot-pass-title'>
												ესეც ასე, შეამოწმე ელ-ფოსტა.
											</h3>
											<p className='second-forgot-pass-text'>
												პაროლის აღდგენის ინსტრუქციას მიიღებ ელ-ფოსტაზე:{' '}
												<span>{values.Email}</span>
											</p>
										</div>

										<button
											isSubmitting={true}
											type='submit'
											className='auth-button input-button second-forgot-pass-input'
										>
											ბმული არ მიმიღია
										</button>

										<span
											className='second-forgot-pass-button cursor-pointer'
											onClick={() => {
												Defaults.ResetPassword.hide();
												Defaults.SigninModal.show();
											}}
										>
											შესვლა
										</span>
									</div>
								)}
							</div>
						</div>
					</form>
				)}
			</Formik>
		</>
	);
}

export default ResetPasswordModal;
