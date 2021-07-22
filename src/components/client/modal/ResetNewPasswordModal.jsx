import React, { useState, useContext, Fragment } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { accountService } from '../../../services/user.service';
import userContext from '../../../context/user/userContext';
import { Defaults } from '../../../helpers/defaults';
import Image from '../../../assets/images/sign-in/success-smile.svg'


function ResetNewPasswordModal({ token }) {
    const { user } = useContext(userContext);

    const userSigninSchema = Yup.object().shape({
        NewPassword: Yup.string()
		.required('შეავსეთ ველი')
		.matches(
			/^(?=.*\d)(?=.*[a-zA-Z].*[a-zA-Z])(?=.*[\W]).{8,}$/,
			'პაროლი უნდა შეიცავდეს მინიმუმ 8 სიმბოლოს, ერთ დიდ ლათინურ ასოს ერთ პატარა ლათინურ ასოს, ერთ ციფრს და ერთ სიმბოლოს'
		),
        ConfirmNewPassword: Yup.string().when('NewPassword', {
            is: (val) => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf([Yup.ref('NewPassword')], 'პაროლები არ ემთხვევა'),
        }),
	});

	const [isSuccess, setisSuccess] = useState(false);

	function onSubmit(data, action) {
		accountService
			.UpdateResetPassword(data)
			.then((res) => {
                console.log(res)
				action.setSubmitting(false);
				setisSuccess(true);
			})
			.catch((err) => {
				action.setSubmitting(false);
			});
	}


    return (
        <Formik
				initialValues={{ 
                    Email: user.email,
                    NewPassword: "",
                    ConfirmNewPassword: "",
                    ResetPasswordToken: token 
                }}
				validateOnChange={true}
				enableReinitialize={true}
				validationSchema={userSigninSchema}
				onSubmit={onSubmit}
			>
                {({ handleSubmit, handleChange, errors, values, isSubmitting }) => (
                    <form onSubmit={handleSubmit}>
                        <div id='popup9' className='overlay'>
                            <div className='popup' id='pop-dessapear9'>
                                <span className='close close-in cursor-pointer' id='close-in3' onClick={() => Defaults.ResetNewPassword.hide()}>
                                    ×
                                </span>

                                <div className='input-popup-bg'>
                                    <div className='registration-form registration-form-signin registration-form-forgotpas new-pass-registr-form'>
                                        <div className='new-password' id='new-password'>

                                {isSuccess ? (
                                    <div className="password-changed" id="password-changed" style={{ display: 'block' }}>
                                        <img src={Image} alt="img" />
                                    <div className="password-changed-content">
                                      <h3 className="password-changed-title">შენ წარმატებით აღადგინე პაროლი.</h3>
                                      <p className="password-changed-text">დააჭირე შესვლის ღილაკს ანგარიშში შესასვლელად.
                                      </p>
                                    </div>
                                    <button 
                                        type="button" 
                                        className="pass-changed-button popup-auth-button input-button"
                                        onClick={() => {
                                            Defaults.SigninModal.show()
                                            Defaults.ResetNewPassword.hide()
                                        }}
                                    >
                                        შესვლა
                                    </button>
                                  </div>
                                  
                                ) : (
                                  <Fragment>
                                        <h4 className='new-password-title'>მოიფიქრე ახალი პაროლი</h4>
                                        <div className='new-password-form'>
                                            <label htmlFor='pwd'>
                                                ახალი პაროლი <span>*</span>
                                            </label>
                                            <div className='pwd-input-password popup-auth-input-password input-password rem-back-img'>
                                                <input
                                                    type='password'
                                                    id='pwd'
                                                    name='NewPassword'
                                                    placeholder='პაროლი'
                                                    onChange={handleChange}
                                                />

                                                {errors['NewPassword'] && (
                                                    <p
                                                        className='error-p text-left'
                                                        style={{ marginLeft: '0' }}
                                                    >
                                                        {errors['NewPassword']}
                                                    </p>
                                                )}
                                            </div>

                                            <label htmlFor='repeat-pwd'>
                                                გაიმეორე პაროლი <span>*</span>
                                            </label>
                                            <div className='pwd-repeat-input-password popup-auth-input-password input-password rem-back-img'>
                                                <input
                                                    type='password'
                                                    id='repeat-pwd'
                                                    name='ConfirmNewPassword'
                                                    placeholder='გაიმეორე პაროლი'
                                                    onChange={handleChange}
                                                />

                                                {errors['ConfirmNewPassword'] && (
                                                    <p
                                                        className='error-p text-left'
                                                        style={{ marginLeft: '0' }}
                                                    >
                                                        {errors['ConfirmNewPassword']}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            disabled={isSubmitting}
                                            type='submit'
                                            className='auth-button input-button'
                                        >
                                            პაროლის შეცვლა
                                        </button>

                                        <span
                                            onClick={() => {
                                                Defaults.ResetNewPassword.hide()
                                                Defaults.SigninModal.show()
                                            }}
                                            className='second-forgot-pass-button cursor-pointer'
                                        >
                                            შესვლა
                                        </span>                                        
                                  </Fragment>  
                                )}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>

    )
}

export default ResetNewPasswordModal
