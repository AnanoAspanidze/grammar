import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import SnackbarComponent from '../../components/admin/reusable/SnackbarComponent';
// import IconButton from '@material-ui/core/IconButton';
// import VisibilityIcon from '@material-ui/icons/Visibility';
// import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
// import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Link } from 'react-router-dom';

import Toolbar from '../../components/admin/tables/Toolbar';
import AppBarComponnent from '../../components/admin/header/AppBar';
import TableComponent from '../../components/admin/tables/TableComponent';
import TableHeadComponent from '../../components/admin/tables/TableHeadComponent';

import { commonService } from '../../services/common.service';
import { accountService } from '../../services/user.service';

function Userspage({ drawerIsOpen }) {
	const classes = useStyles();

	const [state, setState] = useState({
		open: false,
		vertical: 'top',
		horizontal: 'center',
		severity: '',
		error: null,
	});

	const [users, setUsers] = useState(null);
	const [roles, setRoles] = useState(false);
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState({
		userId: '',
		userRoleId: '',
	});

	useEffect(() => {
		commonService.getRoles().then((res) => setRoles(res));
		accountService.getUsers().then((res) => setUsers(res));
	}, []);

	const handleChange = (event) => {
		setSelectedUser({
			userId: selectedUser.userId,
			userRoleId: Number(event.target.value),
		});
	};

	const handleClickOpen = (id, userRoleId) => {
		setOpen(true);
		setSelectedUser({
			userId: id,
			userRoleId: userRoleId,
		});
	};

	const handleClose = () => {
		setOpen(false);
		setSelectedUser(null);
	};

	const changeRole = () => {
		setLoading(true);

		accountService
			.changeUserRole(selectedUser.userId, selectedUser.userRoleId)
			.then((res) => {
				handleClose();
				handleClickSnackbar(
					{ vertical: 'bottom', horizontal: 'center', severity: 'success' },
					res.Message
				);
				setLoading(false);
			})
			.catch((err) => {
				handleClickSnackbar(
					{ vertical: 'bottom', horizontal: 'center', severity: 'error' },
					err
				);
			});
	};

	const handleClickSnackbar = (newState, message) => {
		setState({ open: true, error: message, ...newState });
	};

	const handleCloseSnackbar = () => {
		setState({ ...state, open: false });
	};

	return (
		<AppBarComponnent isOpen={drawerIsOpen}>
			<Grid container spacing={3} justify='center'>
				<Grid item xs={12} sm={12} lg={12}>
					<div className='mb-30 mt-30'>
						<Toolbar searchFieldPlacehoolder='search' downloadExelFile={true} />
					</div>

					<TableComponent>
						<TableHeadComponent>
							<TableCell>სახელი</TableCell>
							<TableCell align='left'>გვარი</TableCell>
							<TableCell align='left'>მეილი</TableCell>
							<TableCell align='left'>როლი</TableCell>
							<TableCell align='left'>რეგიონი</TableCell>
							<TableCell align='left'>სკოლა</TableCell>
							<TableCell align='left'></TableCell>
						</TableHeadComponent>

						<TableBody>
							{users &&
								users.map((row) => (
									<TableRow key={row.Id}>
										<TableCell component='th' scope='row'>
											<Link to={`/admin/user/${row.Id}`}>
												<span className={classes.underline}>{row.Name}</span>
											</Link>
										</TableCell>
										<TableCell align='left'>{row.Surname}</TableCell>
										<TableCell align='left'>{row.Email}</TableCell>
										<TableCell align='left'>{row.Role.Name}</TableCell>
										<TableCell align='left'>{row.RegionName}</TableCell>
										<TableCell align='left'>{row.School}</TableCell>
										<TableCell align='left'>
											<Button
												onClick={() => handleClickOpen(row.Id, row.Role.Id)}
											>
												როლის ცვლილება
											</Button>
										</TableCell>
									</TableRow>
								))}
						</TableBody>
					</TableComponent>

					<div className='flex space-center' style={{ marginTop: 30 }}>
						<Pagination count={10} size='large' color='primary' />
					</div>
				</Grid>
			</Grid>

			<Dialog
				disableBackdropClick
				disableEscapeKeyDown
				open={open}
				onClose={handleClose}
			>
				<DialogTitle className='text-center'>როლის ცვლილება</DialogTitle>
				<DialogContent>
					<form className={classes.container}>
						<FormControl className={classes.formControl} className='w-100'>
							<InputLabel id='demo-dialog-select-label'>როლი</InputLabel>
							<Select
								labelId='demo-dialog-select-label'
								id='demo-dialog-select'
								value={selectedUser ? selectedUser.userRoleId : ''}
								onChange={handleChange}
								input={<Input />}
								required
							>
								{roles &&
									roles.map((role) => (
										<MenuItem key={role.Id} value={role.Id}>
											{role.Name}
										</MenuItem>
									))}
							</Select>
						</FormControl>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color='primary'>
						დახურვა
					</Button>
					<Button
						variant='contained'
						type='submit'
						color='primary'
						onClick={changeRole}
						disabled={loading}
					>
						შეცვლა
					</Button>
				</DialogActions>
			</Dialog>

			<SnackbarComponent
				open={state.open}
				message={state.error}
				severity={state.severity}
				handleClose={handleCloseSnackbar}
			/>
		</AppBarComponnent>
	);
}

export default Userspage;

const useStyles = makeStyles((theme) => ({
	container: {
		width: '300px',
	},
	formControl: {
		margin: theme.spacing(2),
		minWidth: 120,
	},
	underline: {
		textDecoration: 'underline',
		color: 'inherit',
		paddingBottom: '5px',
	},
}));

Userspage.getInitialProps = async (ctx) => {
	return {
		props: { drawerIsOpen: 'false' },
	};
};
