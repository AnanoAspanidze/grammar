import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Doughnut } from 'react-chartjs-2';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Link from 'next/link';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import EditIcon from '@material-ui/icons/Edit';

import AppBarComponnent from '../../../components/admin/header/AppBar';
import TableComponent from '../../../components/admin/tables/TableComponent';
import TableHeadComponent from '../../../components/admin/tables/TableHeadComponent';
import { getCookie } from '../../../helpers/cookie';

const data = {
	labels: ['არასწორი პასუხები', 'სწორი პასუხები', 'პასუხგაუცემელი'],
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

function createData(name, calories, fat, carbs, protein, visible) {
	return { name, calories, fat, carbs, protein, visible };
}

const rows = [
	createData('Frozen yoghurt', 159, 6.0, 24, 4.0, false),
	createData('Ice cream sandwich', 237, 9.0, 37, 4.3, false),
	createData('Eclair', 262, 16.0, 24, 6.0, false),
	createData('Cupcake', 305, 3.7, 67, 4.3, false),
	createData('Gingerbread', 356, 16.0, 49, 3.9, false),
	createData('Frozen yoghurt', 159, 6.0, 24, 4.0, false),
	createData('Ice cream sandwich', 237, 9.0, 37, 4.3, false),
	createData('Eclair', 262, 16.0, 24, 6.0, false),
	createData('Cupcake', 305, 3.7, 67, 4.3, false),
	createData('Gingerbread', 356, 16.0, 49, 3.9, false),
];

function UserPage({ drawerIsOpen }) {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [array, setArray] = useState(rows);

	const generateArray = (index) => {
		const modifier = array.map((w, i) => {
			if (i == index) {
				if (w.visible) {
					return { ...w, visible: false };
				} else if (!w.visible) {
					return { ...w, visible: true };
				}
			}
			return w;
		});

		setArray(modifier);
	};

	return (
		<AppBarComponnent isOpen={drawerIsOpen}>
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
								საერთო სტატისტიკა
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
								მორფოლოგია
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
								სინტაქტი
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
						<div className='row w-100'>
							<h6 className='chart__h6'>Bar One</h6>
							<div class='chart w-100'>
								<span
									css={`
										width: 40%;
									`}
									className='block'
								>
									<span className='value'>40%</span>
									<span className='legend'>პასუხგაუცემელი</span>
								</span>
								<span
									css={`
										width: 40%;
									`}
									className='block'
								>
									<span className='value'>40%</span>
									<span className='legend'>სწორი პასუხები</span>
								</span>
								<span
									css={`
										width: 20%;
									`}
									className='block'
								>
									<span className='value'>20%</span>
									<span className='legend'>არასწორი პასუხები</span>
								</span>
							</div>
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
						</TableHeadComponent>

						<TableBody>
							{array.map((row, index) => (
								<TableRow
									visible={row.visible}
									style={{
										opacity: `${row.visible ? '0.2' : '1'}`,
									}}
									key={index}
								>
									<TableCell component='th' scope='row'>
										<Link href='/admin/user/334'>
											<a className={classes.underline}>{row.name}</a>
										</Link>
									</TableCell>
									<TableCell align='left'>{row.calories}</TableCell>
									<TableCell align='left'>{row.calories}</TableCell>
									<TableCell align='left'>{row.calories}</TableCell>
									<TableCell align='left'>{row.calories}</TableCell>
									<TableCell align='left'>{row.calories}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</TableComponent>

					<div className='flex space-center' style={{ marginTop: 30 }}>
						<Pagination count={10} size='large' color='primary' />
					</div>
				</Grid>
			</Grid>
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
	underline: {
		textDecoration: 'underline',
		color: 'inherit',
		paddingBottom: '5px',
	},
}));

export async function getServerSideProps(ctx) {
	let cookie = '';

	if (getCookie('Drawer', ctx.req)) {
		cookie = getCookie('Drawer', ctx.req);
	} else {
		cookie = 'true';
	}

	return {
		props: { drawerIsOpen: cookie },
	};
}
