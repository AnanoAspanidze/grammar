import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
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

function createData(name, calories, fat, carbs, protein) {
	return { name, calories, fat, carbs, protein };
}

const rows = [
	createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
	createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
	createData('Eclair', 262, 16.0, 24, 6.0),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Gingerbread', 356, 16.0, 49, 3.9),
	createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
	createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
	createData('Eclair', 262, 16.0, 24, 6.0),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function Userspage({ drawerIsOpen }) {
	const classes = useStyles();

	const [open, setOpen] = useState(false);
	const [age, setAge] = useState('');

	const handleChange = (event) => {
		setAge(Number(event.target.value) || '');
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
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
							{rows.map((row) => (
								<TableRow key={row.name}>
									<TableCell component='th' scope='row'>
										<Link to='/admin/user/334'>
											<a className={classes.underline}>{row.name}</a>
										</Link>
									</TableCell>
									<TableCell align='left'>{row.calories}</TableCell>
									<TableCell align='left'>{row.calories}</TableCell>
									<TableCell align='left'>{row.calories}</TableCell>
									<TableCell align='left'>{row.calories}</TableCell>
									<TableCell align='left'>{row.calories}</TableCell>
									<TableCell align='left'>
										<Button onClick={handleClickOpen}>როლის ცვლილება</Button>
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
								value={age}
								onChange={handleChange}
								input={<Input />}
								required
							>
								<MenuItem value={1}>ადმინისტრატორი</MenuItem>
								<MenuItem value={20}>მასწავლებელი</MenuItem>
								<MenuItem value={30}>მოსწავლე</MenuItem>
							</Select>
						</FormControl>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color='primary'>
						დახურვა
					</Button>
					<Button variant='contained' type='submit' color='primary'>
						შეცვლა
					</Button>
				</DialogActions>
			</Dialog>
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
