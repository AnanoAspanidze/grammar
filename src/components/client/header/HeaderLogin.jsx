import React, { useContext } from 'react';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import userContext from '../../../context/user/userContext';
import { ModalContext } from '../../../context/modal/modalContext';

import { accountService } from '../../../services/user.service';
import { userSigninSchema } from '../../../helpers/schema';
import ResetPasswordModal from '../modal/ResetPasswordModal';
import AuthImg from '../../../assets/images/homepage/auth-bg.svg';

function HeaderLogin() {
	let history = useHistory();
	const { handleModal } = useContext(ModalContext);

	const { setCurrentUser } = useContext(userContext);

	const initialValues = {
		Email: 'tediashvili.jemali@gtu.ge',
		Password: '123456',
	};

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

					history.push('/issues');
				}

				action.setSubmitting(false);
			})
			.catch((err) => {
				action.setSubmitting(false);
			});
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={userSigninSchema}
			validateOnChange={true}
			onSubmit={onSubmit}
		>
			{({
				values,
				errors,
				handleChange,
				handleSubmit,
				setFieldValue,
				isSubmitting,
			}) => (
				<form onSubmit={handleSubmit}>
					<div className='container container-two'>
						<div className='header-content'>
							<div className='row'>
								<div className='col-5 vertical-middle for-100'>
									<p className='header-content-text'>
										<span className='header-content-text-item'>
											ქართული ენის გრამატიკის
										</span>{' '}
										ელექტრონული რესურსი
									</p>
									<p className='header-content-text-content'>
										ნამგლის ბელიე ქორწილებსა წაიკითხეს იანვარში კაცობაზედ
										ტრენტინიანის აქციაზე დაადგებაო მოკალათდებიან.
									</p>

									<div className='appear'>
										<button type='button' className='about-project-button'>
											ანგარიშის შექმნა
										</button>
									</div>
								</div>

								<div className='col-7 hide'>
									<div
										className='header-auth'
										style={{ backgroundImage: `url(${AuthImg})` }}
									>
										<div className='registration-form'>
											<h4 className='registration-header-title'>ავტორიზაცია</h4>
											<div
												className={`form-group input-email auth-input-email ${
													errors.Email ? 'error-input' : ''
												}`}
											>
												<input
													type='email'
													name='Email'
													value={values.Email}
													onChange={handleChange}
													placeholder='ელ-ფოსტა'
												/>
											</div>
											{errors['Email'] && (
												<p className='error-p'>{errors['Email']}</p>
											)}

											<div
												className={`auth-input-password input-password ${
													errors.Password ? 'error-input' : ''
												}`}
											>
												<input
													type='password'
													name='Password'
													value={values.Password}
													onChange={handleChange}
													placeholder='პაროლი'
												/>
											</div>
											{errors['Password'] && (
												<p className='error-p'>{errors['Password']}</p>
											)}

											<p
												className='recover-password'
												onClick={() =>
													handleModal(
														true,
														<ResetPasswordModal />,
														'pop-dessapear8',
														'popup8'
													)
												}
											>
												პაროლის აღდგენა
											</p>

											<button
												type='submit'
												disabled={isSubmitting}
												className='auth-button input-button'
											>
												შესვლა
											</button>

											<div className='auth-path-registration'>
												<p>გაიარე რეგისტრაცია</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</form>
			)}
		</Formik>
	);
}

export default HeaderLogin;
