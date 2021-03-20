import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Pagination from '@material-ui/lab/Pagination';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import EditIcon from '@material-ui/icons/Edit';
import Link from 'next/link';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import AppBarComponnent from '../../../components/adminPage/header/AppBar';
import TableComponent from '../../../components/adminPage/tables/TableComponent';
import TableHeadComponent from '../../../components/adminPage/tables/TableHeadComponent';

function createData(name, calories, fat, carbs, protein) {
	return { name, calories, fat, carbs, protein };
}

const rows = [
	createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
	createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
	createData('Eclair', 262, 16.0, 24, 6.0),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function TeacherPage() {
	const classes = useStyles();

	const [age, setAge] = useState('');
	const [open, setOpen] = useState(false);

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
		<AppBarComponnent>
			<Grid container spacing={3} justify='center'>
				<Grid item xs={12} sm={12} lg={12}>
					<Typography variant='h5' component='h5' gutterBottom>
						მომხმარებლის შესახებ
					</Typography>
					<div className='flex mb-30'>
						<Grid item xs={6} className={classes.marginRight}>
							<Paper className={classes.paper}>
								<span className={classes.Margin}>სახელი:</span>{' '}
								<span>ჯეკო</span>
							</Paper>
							<Paper className={classes.paper}>
								<span className={classes.Margin}>გვარი:</span> <span>ჯეკო</span>
							</Paper>
							<Paper className={classes.paper}>
								<span className={classes.Margin}>მეილი:</span> <span>ჯეკო</span>
							</Paper>
						</Grid>
						<Grid item xs={6}>
							<Paper className={classes.paper}>
								<span className={classes.Margin}>როლი:</span> <span>ჯეკო</span>
							</Paper>
							<Paper className={classes.paper}>
								<span className={classes.Margin}>რეგიონი:</span>{' '}
								<span>ჯეკო</span>
							</Paper>
							<Paper className={classes.paper}>
								<span className={classes.Margin}>სკოლა:</span> <span>ჯეკო</span>
							</Paper>
						</Grid>
					</div>

					<Grid item xs={12} sm={12} lg={12}>
						<Typography variant='h5' component='h5' gutterBottom>
							სტატისტიკა
						</Typography>
						<div className='flex mb-30'>
							<Grid item xs={6} className={classes.marginRight}>
								<Paper className={classes.paper}>
									<div className='flex align-items-center'>
										<span className={classes.Margin2}>
											კითხვების რაოდენობა:
										</span>{' '}
										<span>ჯეკო</span>
									</div>
								</Paper>
								<Paper className={classes.paper}>
									<div className='flex align-items-center'>
										<span className={classes.Margin2}>
											კითხვებზე გაცემული პასუხი:
										</span>{' '}
										<span>ჯეკო</span>
									</div>
								</Paper>
								<Paper className={classes.paper}>
									<div className='flex align-items-center'>
										<span className={classes.Margin2}>
											სწორად გაცემული პასუხი:
										</span>{' '}
										<span>ჯეკო</span>
									</div>

									<Button
										onClick={handleClickOpen}
										variant='contained'
										color='secondary'
									>
										წაშლა
									</Button>
								</Paper>
							</Grid>
						</div>
					</Grid>

					<Typography variant='h5' component='h5' gutterBottom>
						მოსწავლეები
					</Typography>
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
										<Link href='/adminpage/user/334'>
											<a className={classes.underline}>{row.name}</a>
										</Link>
									</TableCell>
									<TableCell align='left'>{row.calories}</TableCell>
									<TableCell align='left'>{row.calories}</TableCell>
									<TableCell align='left'>{row.calories}</TableCell>
									<TableCell align='left'>{row.calories}</TableCell>
									<TableCell align='left'>{row.calories}</TableCell>
									<TableCell align='left'>
										<IconButton>
											<EditIcon />
										</IconButton>
										<IconButton>
											<VisibilityIcon />
										</IconButton>
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
				<DialogTitle className='text-center'>
					ნამდვილად გსურთ წაშლა?
				</DialogTitle>
				<DialogActions>
					<Button variant='contained' onClick={handleClose}>
						არა
					</Button>
					<Button variant='contained' color='secondary' onClick={handleClose}>
						კი
					</Button>
				</DialogActions>
			</Dialog>
		</AppBarComponnent>
	);
}

export default TeacherPage;

const useStyles = makeStyles((theme) => ({
	container: {
		width: '300px',
	},
	Margin: {
		width: '80px',
		display: 'inline-block',
		fontWeight: 'bold',
	},
	marginRight: {
		marginRight: '30px',
	},
	Margin2: {
		width: '220px',
		display: 'inline-block',
		fontWeight: 'bold',
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'left',
		display: 'flex',
		justifyContent: 'space-between',
		marginBottom: '15px',
		color: theme.palette.text.secondary,
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
