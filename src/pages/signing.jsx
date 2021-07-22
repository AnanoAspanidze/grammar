import React, { useEffect } from 'react'

import HeaderNav from '../components/client/header/HeaderNav';
import { Defaults } from '../helpers/defaults'
import { accountService } from '../services/user.service'

function UserSigning({ match }) {

    useEffect(() => {
        if(match.params.token) {
            accountService.mailConfirmation(match.params.token)
            .then(res => {
                Defaults.SuccessRegisterModal.show()
            })
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
								<span className='project-text1'>ავტორიზაცია</span>
							</h1>
						</div>
					</div>
				</div>
            </div>
        </>
    )
}

export default UserSigning
