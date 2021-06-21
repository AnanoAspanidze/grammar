import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../../assets/images/icons/logo.svg';
import logo414 from '../../../assets/images/icons/logo-414.svg';
import login from '../../../assets/images/icons/login.svg';
import burgericon from '../../../assets/images/icons/burger-icon.svg';
import playicon from '../../../assets/images/icons/Play.svg';
import mouseicon from '../../../assets/images/icons/mouse-icon.svg';
import HeaderLogin from './HeaderLogin';
import IntroImg from '../../../assets/images/homepage/header-background.svg';

function Header() {
	return (
		<div className='header' style={{ backgroundImage: `url(${IntroImg})` }}>
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
								<Link className='nav-link' to='/exercises'>
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

			<HeaderLogin />

			<div className='row for-100'>
				<div className='col-9 instruction-video appear'>
					<div className='instruction-cont video-image-one'>
						<div className='instruction-cont-item'>
							<a href='#popup2'>
								<img src={playicon} className='play-video' alt='playvideo' />
							</a>
							<p>
								<span>რესურსის გამოყენების</span> <br /> ინსტრუქცია
							</p>
						</div>
						<div id='popup2' className='overlay'>
							<div className='popup small-video-popup' id='pop-dessapear2'>
								<a className='close' id='pause-button2'>
									×
								</a>
								<iframe
									width='100%'
									height='100%'
									src='https://www.youtube.com/embed/yu9GPOwo0nw?enablejsapi=1&html5=1&mute=1'
									title='YouTube video player'
									frameBorder={0}
									allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
									allowFullScreen
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='mouse-icon hide'>
				{/* <img src={mouseicon} alt="mouse-icon"> */}
				<div id='mouse-icon'>
					<lottie-player src='./Mouse-scroller.json' loop autoPlay />
				</div>
			</div>
		</div>
	);
}

export default Header;
