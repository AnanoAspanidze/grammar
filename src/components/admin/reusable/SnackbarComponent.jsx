import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function SnackbarComponent({ open, message, severity, handleClose }) {
	return (
		<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
			<Alert onClose={handleClose} severity={severity}>
				{message}
			</Alert>
		</Snackbar>
	);
}

function Alert(props) {
	return <MuiAlert elevation={6} variant='filled' {...props} />;
}

export default SnackbarComponent;
