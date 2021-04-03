import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import AppBarComponnent from '../../../components/adminPage/header/AppBar';

function ExercisePage() {
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
						ინფორმაცია სავარჯიშოს შესახებ
					</Typography>
					<div className='flex mb-30'>
						<Grid item xs={6} className={classes.marginRight}>
							<Paper className={classes.paper}>
								<span className={classes.Margin}>სავარჯიშოს ნაწილი:</span>{' '}
								<span>ჯეკო</span>
							</Paper>
							<Paper className={classes.paper}>
								<span className={classes.Margin}>საკითხი:</span>{' '}
								<span>ჯეკო</span>
							</Paper>
							<Paper className={classes.paper}>
								<span className={classes.Margin}>ტიპი:</span> <span>ჯეკო</span>
							</Paper>
						</Grid>
						<Grid item xs={6}>
							<Paper className={classes.paper}>
								<span className={classes.Margin}>სათაური:</span>{' '}
								<span>ჯეკო</span>
							</Paper>
							<Paper className={classes.paper}>
								<span className={classes.Margin}>შემაჯამებელი სავარჯიშო:</span>{' '}
								<span>ჯეკო</span>
							</Paper>
						</Grid>
					</div>
					<Grid item xs={12}>
						<Paper className={classes.paper}>
							<span className={classes.Margin}>აღწერა:</span>{' '}
							<span>
								Lorem Ipsum is simply dummy text of the printing and typesetting
								industry. Lorem Ipsum has been the industry's standard dummy
								text ever since the 1500s, when an unknown printer took a galley
								of type and scrambled it to make a type specimen book. It has
								survived not only five centuries, but also the leap into
								electronic typesetting, remaining essentiall
							</span>
						</Paper>
					</Grid>
				</Grid>
			</Grid>
		</AppBarComponnent>
	);
}

export default ExercisePage;

const useStyles = makeStyles((theme) => ({
	Margin: {
		display: 'inline-block',
		fontWeight: 'bold',
		marginRight: '30px',
	},
	marginRight: {
		marginRight: '30px',
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'left',
		display: 'flex',
		marginBottom: '15px',
		color: theme.palette.text.secondary,
	},
}));
