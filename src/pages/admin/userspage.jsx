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
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import LinearProgress from '@material-ui/core/LinearProgress';
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
import PaginationComponent from '../../components/admin/reusable/PaginationComponent';

import { commonService } from '../../services/common.service';
import { accountService } from '../../services/user.service';
import { authHeader } from '../../helpers/auth-header';

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
	const [searchValue, setSearchValue] = useState('');
	const [currentPage, setcurrentPage] = useState(1);

	const [rotate, setRotate] = useState('Name');
	const [rotateValue, setRotateValue] = useState('asc');
	const [sortOrder, setSortOrder] = useState('');
	const [sortOrderValue, setSortOrderValue] = useState('name_asc');

	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState({
		userId: '',
		userRoleId: '',
	});

	useEffect(() => {
		const requestOptions = {
			method: 'GET',
			headers: {
				...authHeader(),
			},
		};

		fetch(
			'https://grammar.emis.ge/api/Users/userexeldata',
			requestOptions
		).then((res) => console.log(res));

		// accountService.userexeldata().then((res) => console.log(res));
	}, []);

	useEffect(() => {
		commonService.getRoles().then((res) => setRoles(res));
	}, []);

	useEffect(() => {
		setLoading(true);

		accountService
			.getUsers({
				PageNumber: currentPage,
				SortOrder: sortOrderValue,
				PageSize: 10,
				SearchQuery: searchValue,
			})
			.then((res) => {
				setUsers(res);
				setLoading(false);
			});
	}, [currentPage, sortOrderValue, searchValue]);

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

	const filterData = (filterValue, secondParam) => {
		if (filterValue !== rotate) {
			setRotateValue('asc');
			setRotate(filterValue);
			setSortOrder(secondParam);
		} else {
			setRotateValue(rotateValue === 'desc' ? 'asc' : 'desc');
			setRotate(filterValue);
			setSortOrder(secondParam);
		}
	};

	useEffect(() => {
		if (sortOrder) {
			console.log(rotateValue);
			setSortOrderValue(`${sortOrder}_${rotateValue}`);
		}
	}, [sortOrder, rotateValue]);

	const handleClickSnackbar = (newState, message) => {
		setState({ open: true, error: message, ...newState });
	};

	const handleCloseSnackbar = () => {
		setState({ ...state, open: false });
	};

	const handleChange3 = (event, value) => {
		setLoading(true);
		setcurrentPage(value);
	};

	const paginate = (pageNumber) => setcurrentPage(pageNumber);

	return (
		<AppBarComponnent isOpen={drawerIsOpen}>
			<Grid container spacing={3} justify='center'>
				<Grid item xs={12} sm={12} lg={12}>
					<div className='mb-30 mt-30'>
						<Toolbar
							searchFieldPlacehoolder='search'
							downloadExelFile={true}
							value={searchValue}
							onChange={(e) => setSearchValue(e.target.value)}
						/>
					</div>

					<div style={{ height: '4px' }}>{loading && <LinearProgress />}</div>
					<TableComponent>
						<TableHeadComponent>
							<TableCell
								className='cursor-pointer'
								onClick={() => filterData('Name', 'name')}
							>
								<div className='flex align-items-center'>
									<div>სახელი</div>
									<ArrowDropDownIcon
										style={{
											transform: `rotate(${
												rotateValue === 'asc' ? 0 : 180
											}deg)`,
											display: `${rotate !== 'Name' ? 'none' : 'initial'}`,
										}}
									/>
								</div>
							</TableCell>
							<TableCell
								className='cursor-pointer'
								align='left'
								onClick={() => filterData('Surname', 'Surname')}
							>
								<div className='flex'>
									<div>გვარი</div>
									<ArrowDropDownIcon
										style={{
											transform: `rotate(${
												rotateValue === 'asc' ? 0 : 180
											}deg)`,
											display: `${rotate !== 'Surname' ? 'none' : 'initial'}`,
										}}
									/>
								</div>
							</TableCell>
							<TableCell align='left'>
								<div>მეილი</div>
							</TableCell>
							<TableCell align='left'>
								<div>როლი</div>
							</TableCell>
							<TableCell align='left'>
								<div>რეგიონი</div>
							</TableCell>
							<TableCell align='left'>
								<div className='flex'>
									<div>სკოლა</div>
									<ArrowDropDownIcon
										style={{
											transform: `rotate(${
												rotateValue === 'asc' ? 0 : 180
											}deg)`,
											display: `${rotate !== 'School' ? 'none' : 'initial'}`,
										}}
									/>
								</div>
							</TableCell>
							<TableCell align='left'></TableCell>
						</TableHeadComponent>

						<TableBody>
							{users &&
								users.Users.map((row) => (
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
						{users && (
							<PaginationComponent
								postsPerPage={10}
								totalPosts={users.UsersQuantity}
								paginate={paginate}
							/>
						)}
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
