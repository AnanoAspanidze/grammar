import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import userContext from '../../../context/user/userContext';
import VariantsLogo from '../../../assets/images/icons/logo.svg';
import VariantsLogo414 from '../../../assets/images/icons/logo-414.svg';
import VariantsLogin from '../../../assets/images/icons/login.svg';
import VariantsBurgerIcon from '../../../assets/images/icons/burger-icon.svg';
import VariantsLogout from '../../../assets/images/icons/Logout-variants.svg';
import ReturnIcon from '../../../assets/images/icons/Arrow - Left.svg';

function Header2({ isExercisePage }) {
	const history = useHistory();

	const { user, isAuthenticated, logOutUser } = useContext(userContext);

	return (
		<nav className='navbar navbar-expand-md navbar-light'>
			<div className='container container-variants'>
				<Link to='/' className='navbar-brand'>
					<img className='hide3' src={VariantsLogo} alt='logo' />
					{/* <img className='appear3' src={VariantsLogo414} alt='logo414' /> */}
				</Link>

				<div className='navbar-icons'>
					<a href='#popup5'>
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
								<img src={VariantsBurgerIcon} alt='burger-icon' />
							</span>
						</button>
					</a>
				</div>
				<div className='col-9 navbar-content'>
					{isExercisePage ? (
						<div class='adverb-return-back'>
							<span
								className='flex align-items-center cursor-pointer'
								onClick={() => history.goBack()}
							>
								<img src={ReturnIcon} alt='return back' /> უკან დაბრუნება
							</span>
						</div>
					) : (
						<div className='header-variants-input-search'>
							<input
								type='search'
								name='search'
								placeholder='მოძებნე საკითხი ან სავარჯიშო'
							/>
						</div>
					)}
					<div className='col-4 user-registred'>
						{isAuthenticated ? (
							<div className='header-variants-item user-registred-yes'>
								<div className='header-variants-input-user-fields'>
									<p className='variants-user-name'>
										{user.Name}
										{'  '}
										{user.Surname}
									</p>
									<span className='variants-user-status'>{user.role}</span>
								</div>
								<div className='header-variants-login-icon'>
									<img
										className='cursor-pointer'
										onClick={logOutUser}
										src={VariantsLogout}
										alt='Logout-variants'
									/>
								</div>
							</div>
						) : (
							<div className='header-variants-item user-registred-no'>
								<div className='col-9 header-variants-input-user'>
									<a href='#' className='header-variants-regist'>
										რეგისტრაცია
									</a>
									<a href='#' className='header-variants-login'>
										შესვლა
									</a>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Header2;
