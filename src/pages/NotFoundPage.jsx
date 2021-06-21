import React from 'react';
import { Link } from 'react-router-dom';

import '../assets/css/error-page.css';
import Logo from '../assets/images/icons/logo.svg';
import logo414 from '../assets/images/icons/logo-414.svg';
import login from '../assets/images/icons/login.svg';
import burgericon from '../assets/images/icons/burger-icon.svg';
import stiker from '../assets/images/error-page/error-page-stiker.svg';

function NotFoundPage() {
	return (
		<>
			<div class='error-page'>
				<nav className='navbar navbar-expand-md navbar-light'>
					<div className='container container-two'>
						<Link className='navbar-brand'>
							<img className=' hide3' src={Logo} alt='logo' />
							<img className='appear3' src={logo414} alt='logo-414' />
						</Link>

						<div className='navbar-icons'>
							<a href='#popup7' className='login appear'>
								<img src={login} alt='login' />
							</a>

							<Link to='/'>
								<button
									className='navbar-toggler'
									type='button'
									data-bs-toggle='collapse'
									data-bs-target='#navb  arsExample04'
									aria-controls='navbarsExample04'
									aria-expanded='false'
									aria-label='Toggle navigation'
								>
									<span className='navbar-toggler-icon'>
										<img src={burgericon} alt='burger' />
									</span>
								</button>
							</Link>
						</div>

						<div
							className='collapse navbar-collapse homepage-navbar-collapse'
							id='navbarsExample04'
						>
							<ul className='navbar-nav me-auto mb-2 mb-md-0'>
								<li className='nav-item'>
									<Link className='nav-link active' aria-current='page' to='/'>
										მთავარი
									</Link>
								</li>
								<li className='nav-item'>
									<Link className='nav-link' to='about'>
										პროექტის შესახებ
									</Link>
								</li>
								<li className='nav-item'>
									<Link className='nav-link' to='exercises'>
										სავარჯიშოები
									</Link>
								</li>
								<li className='nav-item'>
									<Link className='nav-link' to='testing'>
										ტესტირება
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</nav>
			</div>

			<div className='container-fluid error-container-fluid'>
				<div className='error-page-content'>
					<div className='container container-two'>
						<div className='row'>
							<div className='error-page-item'>
								<img
									src={stiker}
									className='error-page-stiker'
									alt='error-stiker'
								/>
								<h2 className='error-page-title'>
									გვერდი <span>ვერ მოიძებნა</span>
								</h2>
								<p className='error-page-text'>
									სამწუხაროდ, მოცემული გვერდი წაშლილი ან დროებით მიუწვდომელია.
									დააჭირე ღილაკს მთავარ გვერდზე დასაბრუნებლად.
								</p>
								<Link to='/'>
									<button className='error-page-button'>
										მთავარ გვერდზე გადასვლა
									</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default NotFoundPage;
