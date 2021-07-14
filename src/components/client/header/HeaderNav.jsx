import React from 'react'
import { Link } from 'react-router-dom';

import VideoModal from '../components/client/modal/VideoModal';
import Logo from '../assets/images/icons/about-project-logo.svg';
import Logo2 from '../assets/images/icons/logo-414.svg';
import { Defaults } from '../../../helpers/defaults'


function HeaderNav() {
    return (
        <nav className='navbar navbar-expand-md navbar-light'>
        <div className='container container-two'>
            <Link className='navbar-brand'>
                <img className=' hide3' src={Logo} alt='logo' />
                <img className='appear3' src={Logo2} alt='' />
            </Link>

            <div className='navbar-icons'>
                <a className='login appear'>
                    <img src='./assets/images/icons/Logout.svg' alt='' />
                </a>
                <a>
                    <button
                        className='navbar-toggler'
                        type='button'
                        data-bs-toggle='collapse'
                        data-bs-target='#navb  arsExample04'
                        aria-controls='navbarsExample04'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                    >
                        <span className='navbar-toggler-icon about-navbar-toggler-icon'>
                            <img
                                src='./assets/images/icons/about-burger-icon.svg'
                                alt='img'
                            />
                        </span>
                    </button>
                </a>
            </div>
            <div
                className='collapse navbar-collapse homepage-navbar-collapse'
                id='navbarsExample04'
            >
                <ul className='navbar-nav me-auto mb-2 mb-md-0'>
                    <li className='nav-item'>
                        <Link
                            to='/'
                            className='nav-link about-nav-link'
                            aria-current='page'
                        >
                            მთავარი
                        </Link>
                    </li>
                    <li className='nav-item '>
                        <Link
                            to='/about'
                            className='nav-link about-nav-link active'
                            aria-current='page'
                        >
                            პროექტის შესახებ
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link className='nav-link about-nav-link' href='#'>
                            სავარჯიშოები
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link className='nav-link about-nav-link' href='#'>
                            ტესტირება
                        </Link>
                    </li>
                    <span
                    onClick={() => Defaults.SigninModal.show()}
                        className='sign-in-parent nav-link'
                    >
                        <button type='button' className='sign-in-button'>
                            შესვლა
                        </button>
                    </span>
                </ul>
            </div>
        </div>
    </nav>
    )
}

export default HeaderNav
