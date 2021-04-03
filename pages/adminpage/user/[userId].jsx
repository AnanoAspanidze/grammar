import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Doughnut } from 'react-chartjs-2';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import AppBarComponnent from '../../../components/adminPage/header/AppBar';

const data = {
	labels: ['Red', 'Blue', 'Yellow'],
	datasets: [
		{
			label: '# of Votes',
			data: [12, 19, 3],
			backgroundColor: [
				'rgba(255, 99, 132, 0.2)',
				'rgba(18, 135, 41, 0.2)',
				'rgba(84, 84, 84, 0.2)',
			],
			borderColor: ['#c71639', '#22a915', '#373737'],
			borderWidth: 1,
		},
	],
};

function UserPage() {
	const classes = useStyles();
	const [open, setOpen] = useState(false);

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
				</Grid>

				<Grid item xs={12} sm={12} lg={12}>
					<Typography variant='h5' component='h5' gutterBottom>
						სტატისტიკა
					</Typography>
					<Grid container xs={12} sm={12} lg={12} justify='center'>
						<Grid item xs={6}>
							<Typography
								variant='h5'
								component='h5'
								className='text-center'
								gutterBottom
							>
								სტატისტიკა
							</Typography>
							<Doughnut data={data} legend={false} />
						</Grid>
					</Grid>
					<Grid
						container
						xs={12}
						sm={12}
						lg={12}
						justify='center'
						className='mb-50'
					>
						<Grid item xs={6}>
							<Typography
								variant='h5'
								component='h5'
								className='text-center'
								gutterBottom
							>
								სტატისტიკა
							</Typography>
							<Doughnut data={data} legend={false} />
						</Grid>
						<Grid item xs={6}>
							<Typography
								variant='h5'
								component='h5'
								className='text-center'
								gutterBottom
							>
								სტატისტიკა
							</Typography>
							<Doughnut data={data} legend={false} />
						</Grid>
					</Grid>
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

export default UserPage;

const useStyles = makeStyles((theme) => ({
	Margin: {
		width: '250px',
		display: 'inline-block',
		fontWeight: 'bold',
	},
	Margin2: {
		width: '220px',
		display: 'inline-block',
		fontWeight: 'bold',
	},
	marginRight: {
		marginRight: '30px',
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'left',
		display: 'flex',
		justifyContent: 'space-between',
		marginBottom: '15px',
		color: theme.palette.text.secondary,
	},
}));
