import React, { useState, useEffect } from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components/macro';

import { Defaults } from '../../../helpers/defaults';
import { accountService } from '../../../services/user.service';
import Arrow from '../../../assets/images/sign-in/Arrow - Left 2.svg';
import Aprove from '../../../assets/images/sign-in/mail-approve.png';
import Icon342 from '../../../assets/images/sign-in/success-registred.png';
import { commonService } from '../../../services/common.service';

function SignUpModal() {
	const userSigninSchema = Yup.object().shape({
		RegionId: Yup.string().required('შეავსეთ ველი'),
		School: Yup.string().required('შეავსეთ ველი'),
		RoleId: Yup.string().required('შეავსეთ ველი'),
		Name: Yup.string().when('tabIndex', (tabIndex) => {
			if (tabIndex === 2) {
				return Yup.string().required('შეავსეთ ველი');
			} else {
				return Yup.string().notRequired();
			}
		}),
		Surname: Yup.string().when('tabIndex', (tabIndex) => {
			if (tabIndex === 2) {
				return Yup.string().required('შეავსეთ ველი');
			} else {
				return Yup.string().notRequired();
			}
		}),
		Email: Yup.string().when('tabIndex', (tabIndex) => {
			if (tabIndex === 2) {
				return Yup.string()
					.required('შეავსეთ ველი')
					.email('შეიყვანეთ ელ. ფოსტის მისამართი სწორ ფორმაში');
			} else {
				return Yup.string().notRequired();
			}
		}),

		Password: Yup.string().when('tabIndex', (tabIndex) => {
			if (tabIndex === 3) {
				return Yup.string()
					.required('შეავსეთ ველი')
					.matches(
						/^(?=.*\d)(?=.*[a-zA-Z].*[a-zA-Z])(?=.*[\W]).{8,}$/,
						'პაროლი უნდა შეიცავდეს მინიმუმ 8 სიმბოლოს, ერთ დიდ ლათინურ ასოს ერთ პატარა ლათინურ ასოს, ერთ ციფრს და ერთ სიმბოლოს'
					);
			} else {
				return Yup.string().notRequired();
			}
		}),
		ConfirmPassword: Yup.string().when('Password', {
			is: (val) => (val && val.length > 0 ? true : false),
			then: Yup.string().oneOf([Yup.ref('Password')], 'პაროლები არ ემთხვევა'),
		}),

		accept1: Yup.bool().when('tabIndex', (tabIndex) => {
			if (tabIndex === 3) {
				return Yup.bool().oneOf([true], 'გთხოვთ დაეთანხმეთ წესებს');
			} else {
				return Yup.bool().notRequired();
			}
		}),
		accept2: Yup.bool().when('tabIndex', (tabIndex) => {
			if (tabIndex === 3) {
				return Yup.bool().oneOf([true], 'გთხოვთ დაეთანხმეთ წესებს');
			} else {
				return Yup.bool().notRequired();
			}
		}),
	});

	const [regions, setRegions] = useState();

	useEffect(() => {
		commonService.getRegions().then((res) => setRegions(res));
	}, []);

	const [open, setOpen] = useState(false);

	const initialValues = {
		Email: '',
		Username: '',
		Name: '',
		Surname: '',
		RegionId: 0,
		School: '',
		RoleId: 'მოსწავლე',
		Password: '',
		ConfirmPassword: '',
		accept1: '',
		accept2: '',
		tabIndex: 1,
	};

	function onSubmit(data, action) {
		accountService
			.userSignUp({ ...data, RoleId: data.RoleId === 'მოსწავლე' ? 3 : 2 })
			.then((res) => {
				action.setFieldValue('tabIndex', data.tabIndex + 1);
				action.setSubmitting(false);
			})
			.catch((err) => {
				action.setSubmitting(false);
				action.setFieldValue('tabIndex', data.tabIndex + 1);
			});
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={userSigninSchema}
			validateOnChange={true}
			enableReinitialize={true}
			onSubmit={onSubmit}
		>
			{({
				handleSubmit,
				handleChange,
				setFieldValue,
				values,
				errors,
				isSubmitting,
			}) => (
				<form onSubmit={handleSubmit}>
					<div id='popup10' className='overlay'>
						<div className='popup' id='pop-dessapear10'>
							<span
								className='close close-in cursor-pointer'
								onClick={() => Defaults.SignUpModal.hide()}
							>
								×
							</span>

							<div className='input-popup-bg'>
								<div className='registration-form registration-form-signin registration-form-new-region'>
									{values.tabIndex === 1 && (
										<div className='new-region' id='new-region'>
											<h4 className='new-account-title new-region-title'>
												ახალი ანგარიშის შექმნა
											</h4>

											<div className='new-password-form'>
												<label htmlFor='region'>
													რომელია შენი რეგიონი? <span>*</span>
												</label>
												<div className='pwd-input-password popup-auth-input-password input-password rem-back-img custom-select'>
													<details className='custom-select' open={open}>
														<summary className='radios'>
															{regions &&
																regions.map((region) => (
																	<input
																		key={region.Id}
																		type='radio'
																		name='item'
																		id={`item${region.Id}`}
																		title={region.Name}
																		onChange={(e) =>
																			setFieldValue('RegionId', region.Id)
																		}
																	/>
																))}
														</summary>
														<ul className='list'>
															{regions &&
																regions.map((region) => (
																	<li>
																		<label htmlFor={`item${region.Id}`}>
																			{region.Name}
																		</label>
																	</li>
																))}
														</ul>
													</details>
												</div>
												{errors['RegionId'] && (
													<p
														className='error-p text-left'
														style={{ marginLeft: '0' }}
													>
														{errors['RegionId']}
													</p>
												)}

												<label htmlFor='repeat-pwd'>
													რომელია შენი სკოლა? <span>*</span>
												</label>

												<div className='pwd-repeat-input-password popup-auth-input-password input-password rem-back-img'>
													<input
														type='text'
														name='School'
														value={values.School}
														placeholder='შენი სკოლის სახელი'
														onChange={handleChange}
													/>
												</div>
												{errors['School'] && (
													<p
														className='error-p text-left'
														style={{ marginLeft: '0' }}
													>
														{errors['School']}
													</p>
												)}

												<label htmlFor='i-am'>
													მე ვარ: <span>*</span>
												</label>
												<div className='about-header-icons about-header-icons2 about-header-icons3'>
													<div className='can-toggle'>
														<input
															onChange={(e) =>
																values.RoleId === 'მასწავლებელი'
																	? setFieldValue('RoleId', 'მოსწავლე')
																	: setFieldValue('RoleId', 'მასწავლებელი')
															}
															value={values.RoleId}
															id='a2'
															type='checkbox'
															value={values.RoleId}
														/>
														<label htmlFor='a2'>
															<Toggle
																value={values.RoleId}
																className='can-toggle__switch'
																data-checked='მასწავლებელი'
																data-unchecked='მოსწავლე'
															/>
														</label>
													</div>
												</div>
											</div>

											<button
												type='submit'
												className='auth-button input-button new-region-button'
												onClick={() => {
													if (Object.keys(errors).length === 0) {
														setFieldValue('tabIndex', values.tabIndex + 1);
													}
												}}
											>
												გაგრძელება
											</button>
										</div>
									)}

									{values.tabIndex === 2 && (
										<div className='name-fields' id='name-fields'>
											<h4 className='new-account-create-title'>
												ახალი ანგარიშის შექმნა
											</h4>
											<div className='new-password-form create-account-form'>
												<label htmlFor='pwd'>
													სახელი <span>*</span>
												</label>
												<div className='pwd-input-password popup-auth-input-password input-password create-account-input rem-back-img'>
													<input
														type='text'
														id='pwd'
														name='Name'
														value={values.Name}
														onChange={handleChange}
														placeholder='ჩაწერე შენი სახელი'
													/>
												</div>
												<label htmlFor='repeat-pwd'>
													გვარი <span>*</span>
												</label>
												<div className='pwd-repeat-input-password popup-auth-input-password input-password create-account-input rem-back-img'>
													<input
														type='text'
														id='repeat-pwd'
														name='Surname'
														value={values.Surname}
														onChange={handleChange}
														placeholder='ჩაწერე შენი გვარი'
													/>
												</div>
												<label htmlFor='account-email'>
													ელ-ფოსტა <span>*</span>
												</label>
												<div className='pwd-repeat-input-password popup-auth-input-password input-password create-account-input-email rem-back-img'>
													<input
														type='email'
														id='account-email'
														name='Email'
														value={values.Email}
														onChange={handleChange}
														placeholder='ელ-ფოსტის მისამათი'
													/>
												</div>
											</div>
											<div className='return-continue'>
												<span
													className='return flex align-items-center'
													onClick={() =>
														setFieldValue('tabIndex', values.tabIndex - 1)
													}
												>
													<img src={Arrow} alt='' />
													<span> უკან</span>
												</span>
												<button
													type='button'
													onClick={() => {
														if (Object.keys(errors).length === 0) {
															setFieldValue('tabIndex', values.tabIndex + 1);
														}
													}}
													className='auth-button input-button create-account-button'
												>
													გაგრძელება
												</button>
											</div>
										</div>
									)}

									{values.tabIndex === 3 && (
										<div className='create-password' id='create-password'>
											<h4 className='new-password-create-title'>
												ახალი ანგარიშის შექმნა
											</h4>
											<div className='new-password-form'>
												<label htmlFor='pwd'>
													პაროლი <span>*</span>
												</label>
												<div className='pwd-input-password popup-auth-input-password input-password rem-back-img create-pass-input'>
													<input
														type='password'
														id='pwd'
														name='Password'
														value={values.Password}
														onChange={handleChange}
														placeholder='შეიყვანე პაროლი'
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
												<label htmlFor='repeat-pwd'>
													გაიმეორე პაროლი <span>*</span>
												</label>
												<div className='pwd-input-password popup-auth-input-password input-password rem-back-img create-pass-input'>
													<input
														type='password'
														id='repeat-pwd'
														name='ConfirmPassword'
														value={values.ConfirmPassword}
														onChange={handleChange}
														placeholder='შეიყვანე პაროლი'
													/>

													{errors['ConfirmPassword'] && (
														<p
															className='error-p text-left'
															style={{ marginLeft: '0' }}
														>
															{errors['ConfirmPassword']}
														</p>
													)}
												</div>
												<div className='checkbox-input'>
													<div className='squaredOne'>
														<Field
															name='accept1'
															value={values.accept1}
															type='checkbox'
															id='squaredOne1'
															checked={values.accept1}
														/>

														<label
															htmlFor='squaredOne1'
															className='squaredOne2'
														/>
													</div>
													<p className='checkbox-input-text'>
														წავიკითხე და ვეთანხმები რესურსის გამოყენების
														<a href='terms-of-use.html'>
															<span>წესებსა და პირობებს</span>
														</a>
													</p>
												</div>
												<div className='checkbox-input checkbox-input-privacy'>
													<div className='squaredOne'>
														<Field
															name='accept2'
															value={values.accept2}
															type='checkbox'
															id='squaredOne2'
															checked={values.accept2}
														/>
														<label
															htmlFor='squaredOne2'
															className='squaredOne2'
														/>
													</div>
													<p className='checkbox-input-text'>
														წავიკითხე და ვეთანხმები რესურსის
														<a href='privacy-policy.html'>
															<span>კონფიდენციალურობის პოლიტიკას</span>
														</a>
													</p>
												</div>
											</div>
											<div className='return-continue'>
												<span
													className='return flex align-items-center'
													onClick={() =>
														setFieldValue('tabIndex', values.tabIndex - 1)
													}
												>
													<img src={Arrow} alt='' />
													<span> უკან</span>
												</span>

												<button
													type='submit'
													disabled={isSubmitting}
													className='create-pass-button input-button'
												>
													დასრულება
												</button>
											</div>
										</div>
									)}

									{values.tabIndex === 4 && (
										<div className='mail-approve' id='mail-approve'>
											<img
												src={Aprove}
												className='mail-approve-img'
												alt='img'
											/>
											<div className='mail-approve-content'>
												<h3 className='mail-approve-title'>
													სულ ცოტაც, მხოლოდ ელ-ფოსტის დადასტურებაღა დაგვრჩა.
												</h3>
												<p className='mail-approve-text'>
													ელ-ფოსტაზე: <span>{values.Email} </span>
													რეგისტრაციის დასრულების ბმული გამოგიგზავნეთ.
												</p>
											</div>
											<div className='return-continue success-registred-input-content appear-mail-approve'>
												<button
													type='button'
													className='success-registred-input input-button'
												>
													შესვლა
												</button>
											</div>
											<div className='return-continue mail-approve-input hide-mail-approve'>
												<span
													className='return flex align-items-center'
													onClick={() =>
														setFieldValue('tabIndex', values.tabIndex - 1)
													}
												>
													<img src={Arrow} alt='' />
													<span> უკან</span>
												</span>
												<button
													type='button'
													className='auth-button  mail-approve-button input-button'
												>
													ბმული არ მიმიღია
												</button>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</form>
			)}
		</Formik>
	);
}

export default SignUpModal;

const Toggle = styled.div`
	${({ value }) =>
		value === 'მასწავლებელი' &&
		`
        &::after {
			transform: translate3d(221px, 0, 0) !important;
			color: white !important;
			content: attr(data-checked) !important;
			background: #4b6858 !important;
		}

        &::before {
			content: attr(data-unchecked) !important;
			left: 0 !important;
			color: #333333 !important;
		}
    `}

	${({ value }) =>
		value === 'მოსწავლე' &&
		`
        &::before {
			color: #333333 !important;
			content: attr(data-checked) !important;
			right: 8px !important;
		}
		
        &::after {
			transition: transform 0.3s cubic-bezier(0, 1, 0.5, 1) !important;
			color: white !important;
			background: #4b6858 !important;
			box-shadow: 0 24px 18px -14px rgb(49 79 62 / 32%) !important;
			content: attr(data-unchecked) !important;
			transform: translate3d(0, 0, 0) !important;
		}
    `}
`;
