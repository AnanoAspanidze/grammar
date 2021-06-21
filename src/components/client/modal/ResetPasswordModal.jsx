import React, { Component } from 'react';

import Modal from './Modal';
import SmileImg from '../../../assets/images/forgot-password/forgot-password-smile.svg';
import angelImg from '../../../assets/images/forgot-password/angel.svg';

export default class ResetPasswordModal extends Component {
	state = {
		visible: false,
	};

	show() {
		this.setState({ visible: true });
	}

	hide() {
		this.setState({ visible: false });
	}

	render() {
		if (this.state.visible) {
			return (
				<>
					<Modal layerId='popup8' onCloseModal={this.hide.bind(this)}>
						<div className='input-popup-bg'>
							<div className='registration-form registration-form-signin registration-form-forgotpas'>
								<div className='first-forgot-pass' id='first-forgot-pass'>
									<img src={SmileImg} alt='' />
									<div>
										<h3>დაგავიწყდა პაროლი?</h3>
										<p>
											ჩაწერე რეგისტრაციისას გამოყენებული ელ-ფოსტის მისამართი და
											ჩვენ დაგეხმარებით მის აღდგენაში.
										</p>
									</div>
									<form action='#'>
										<div className='form-group input-email auth-input-email forgot-input-email'>
											<input type='email' name='email' placeholder='ელ-ფოსტა' />
										</div>
										<button
											type='button'
											className='auth-button .sign-in-single-button input-button'
										>
											გამომიგზავნე აღდგენის ბმული
										</button>
									</form>
								</div>
								<div className='second-forgot-pass' id='second-forgot-pass'>
									<img src={angelImg} alt='img' />
									<div className='second-forgot-pass-content'>
										<h3 className='second-forgot-pass-title'>
											ესეც ასე, შეამოწმე ელ-ფოსტა.
										</h3>
										<p className='second-forgot-pass-text'>
											პაროლის აღდგენის ინსტრუქციას მიიღებ ელ-ფოსტაზე:
											<span>Saba.chitaishvili@geolab.edu.ge</span>
										</p>
									</div>
									<a href='#popup9'>
										<button
											type='button'
											className='auth-button input-button second-forgot-pass-input'
										>
											ბმული არ მიმიღია
										</button>
									</a>
									<a className='second-forgot-pass-button'>შესვლა</a>
								</div>
							</div>
						</div>
					</Modal>
				</>
			);
		} else {
			return null;
		}
	}
}
