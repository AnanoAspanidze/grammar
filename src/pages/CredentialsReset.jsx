import React, { useEffect } from 'react'


import HeaderNav from '../components/client/header/HeaderNav';
import { Defaults } from '../helpers/defaults'

function CredentialsReset({ match }) {

    useEffect(() => {
        if(match.params.token) {
            Defaults.ResetNewPassword.show(match.params.token)
        }
    }, [])


    return (
        <>
            <div class='about-header'>
                <HeaderNav />

                <div className='about-header-content'>
					<div className='container container-two'>
						<div className='about-header-item'>
							<h1 className='about-project-text'>
								<span className='project-text1'>პაროლის</span>{' '}
								<span className='about-pr-text1'>აღდგენა</span>
							</h1>
							
						</div>
					</div>
				</div>
            </div>
        </>
    )
}

export default CredentialsReset
