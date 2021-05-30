import React, { useState, useEffect, useContext } from 'react';
import SnackbarComponent from '../../components/admin/reusable/SnackbarComponent';
import { useHistory } from 'react-router-dom';

import { accountService } from '../../services/user.service';
import userContext from '../../context/user/userContext';

function Signing({ match }) {
	let history = useHistory();

	const { errors, setCurrentUser, setError, clearErrors } = useContext(
		userContext
	);

	const [isActive, setisActive] = useState(null);

	const [state, setState] = useState({
		open: false,
		vertical: 'top',
		horizontal: 'center',
		severity: '',
		error: null,
	});

	const { open } = state;

	useEffect(() => {
		accountService
			.mailConfirmation(match.params.token)
			.then((res) => {
				setisActive(true);
				handleClick({ severity: 'success' }, res.message);
			})
			.catch((err) => {
				setisActive(false);
				handleClick({ severity: 'error' }, err);
			});
	}, []);

	const handleClick = (newState, message) => {
		setState({ open: true, error: message, ...newState });
	};

	const handleClose = () => {
		clearErrors();
		setState({ ...state, open: false });
		history.push('/admin/signin');
	};

	return (
		<SnackbarComponent
			open={open}
			message={state.error}
			severity={state.severity}
			handleClose={handleClose}
		/>
	);
}

export default Signing;
