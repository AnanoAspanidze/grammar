import React from 'react'

import Icon342 from '../../../assets/images/sign-in/success-registred.png';
import { Defaults } from '../../../helpers/defaults';

function SuccessRegisterModal({match}) {
    return (
        <div className='input-popup-bg'>
            <div className='registration-form registration-form-signin registration-form-new-region'>
                <div className='success-registred' id='success-registred'>
                    <img
                        src={Icon342}
                        className='success-registred-img'
                        alt='img'
                    />
                    <div className='success-registred-content'>
                        <h3 className='success-registred-title'>
                            შენ წარმატებით გაიარე ვერიფიკაცია.{' '}
                        </h3>
                        <p className='success-registred-text'>
                            დააჭირე შესვლის ღილაკს ანგარიშში შესასვლელად.
                        </p>
                    </div>
                    <div className='return-continue success-registred-input-content'>
                        <button
                            type='button'
                            onClick={() => {
                                Defaults.SuccessRegisterModal.hide();
                                Defaults.SigninModal.show();
                            }}
                            className='success-registred-input input-button'
                        >
                            შესვლა
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuccessRegisterModal
