import React from 'react';

function SignInModal() {
	return (
		<>
			<div id='popup7' className='overlay'>
				<div className='popup' id='pop-dessapear7'>
					<a
						className='close close-in'
						id='close-in'
						onclick='navDessapear2();'
						href='javascript:void(0);'
					>
						×
					</a>
					<div className='input-popup-bg'>
						<div className='registration-form auth-registration-form'>
							<h4 className='registration-header-title popup-registration-title'>
								ავტორიზაცია
							</h4>
							<form action='#'>
								<div className='form-group input-email auth-input-email popup-auth-input-email'>
									<input type='email' name='email' placeholder='ელ-ფოსტა' />
								</div>
								<div className='auth-input-password popup-auth-input-password input-password'>
									<input type='password' name='pwd' placeholder='პაროლი' />
								</div>
								<p className='error-p popup-error-p'>
									შეყვანილი მონაცემები არასწორია
								</p>
								<a
									href='#popup8'
									onclick='navAppear3();'
									className='recover-password popup-recover-password'
								>
									დაგავიწყდა პაროლი?
								</a>
								<button
									type='button'
									className='pass-changed-button bg-hover popup-auth-button input-button'
								>
									შესვლა
								</button>
							</form>
							<div className='auth-path-registration popup-auth-path'>
								<a href='#popup10' onclick='navAppear5();'>
									რეგისტრაცია
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default SignInModal;
