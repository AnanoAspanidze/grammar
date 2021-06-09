import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
	return (
		<footer className='header-footer footer-bg-fill'>
			<div className='container container-two'>
				<div className='row'>
					<div className='for-d-flex justify-content-between footer-logo-content'>
						<Link to='/' className='logo-footer'>
							<img src='/images/icons/footer-logo.svg' alt='logo-footer' />
						</Link>

						<p className='footer-text-item appear'>
							მივხედე ჩადი ავიდოდა მრუშო დააყოლეს, მიქეს ჰუგო მარჩელო
							აითვალწუნებენ მიღწეული ოჰ, ვარდიდან წასჩურჩულეს. მგზნებარე
							დაავიწყდათ საკონტაქტო ქვეშავრდომად ჩადი ავიდოდა.
						</p>
						<div className='for-d-flex conf-user justify-content-between'>
							<p className='footer-logo-content-item'>
								<Link href='privacy-policy'>კონფიდენციალურობის პოლიტიკა</Link>
							</p>
							<p className='footer-logo-content-item'>
								<Link href='terms-of-use'>მოხმარების პირობები</Link>
							</p>
						</div>
					</div>

					<div className='for-d-flex justify-content-between'>
						<p className='footer-text-item hide'>
							მივხედე ჩადი ავიდოდა მრუშო დააყოლეს, მიქეს ჰუგო მარჩელო
							აითვალწუნებენ მიღწეული ოჰ, ვარდიდან წასჩურჩულეს. მგზნებარე
							დაავიწყდათ საკონტაქტო ქვეშავრდომად ჩადი ავიდოდა.
						</p>
						<div className='footer-buttons'>
							<a href='#'>
								<button type='button' className='footer-user-icon'>
									<img src='./assets/images/icons/user.svg' alt='user-icon' />
									ფეისბუქ ჯგუფი
								</button>
							</a>
							<a href='#'>
								<button type='button' className='footer-facebook-icon'>
									<img
										src='./assets/images/icons/facebook.svg'
										alt='facebook-icon'
									/>
									ფეისბუქ გვერდი
								</button>
							</a>
						</div>
					</div>
					<div className='for-d-flex justify-content-between footer-icons-texts'>
						<div className='Education-logo'>
							<a href='https://emis.ge/' target='_blank'>
								<img
									src='./assets/images/icons/Education-logo1.svg'
									alt='Education-logo'
								/>
							</a>
							<a href='https://www.mes.gov.ge/' target='_blank'>
								<img
									src='./assets/images/icons/Education-logo2.svg'
									alt='Education-logo'
								/>
							</a>
						</div>
						<div className='footer-copyright'>
							<span>ყველა უფლება დაცულია Ⓒ</span>
							<span>განათლების მართვის საინფორმაციო სისტემა</span>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
