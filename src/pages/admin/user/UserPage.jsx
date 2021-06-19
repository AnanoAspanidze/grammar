import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Doughnut } from 'react-chartjs-2';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import LinearProgress from '@material-ui/core/LinearProgress';
import PaginationComponent from '../../../components/admin/reusable/PaginationComponent';

// import VisibilityIcon from '@material-ui/icons/Visibility';
// import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
// import EditIcon from '@material-ui/icons/Edit';

import AppBarComponnent from '../../../components/admin/header/AppBar';
import TableComponent from '../../../components/admin/tables/TableComponent';
import TableHeadComponent from '../../../components/admin/tables/TableHeadComponent';

import { accountService } from '../../../services/user.service';

function UserPage({ drawerIsOpen, match }) {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [loading, setloading] = useState(false);

	const [rotate, setRotate] = useState('Name');
	const [rotateValue, setRotateValue] = useState('asc');

	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(10);

	const [statistics, setStatistics] = useState(null);
	const [userData, setUserData] = useState({
		Name: '',
		Surname: '',
		role: '',
		Email: '',
		School: '',
		RegionName: '',
		Students: [],
	});

	const data1 = {
		labels: ['არასწორი პასუხები', 'სწორი პასუხები', 'პასუხგაუცემელი'],
		datasets: [
			{
				label: '# of Votes',
				data: [
					statistics ? statistics.GeneralAnswers.RightAnswers : 0,
					statistics ? statistics.GeneralAnswers.UnAnswered : 0,
					statistics ? statistics.GeneralAnswers.WrongAnswers : 0,
				],
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

	const data2 = {
		labels: ['არასწორი პასუხები', 'სწორი პასუხები', 'პასუხგაუცემელი'],
		datasets: [
			{
				label: '# of Votes',
				data: [
					statistics ? statistics.AnswersByCategories.RightAnswers : 0,
					statistics ? statistics.AnswersByCategories.UnAnswered : 0,
					statistics ? statistics.AnswersByCategories.WrongAnswers : 0,
				],
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
	const data3 = {
		labels: ['არასწორი პასუხები', 'სწორი პასუხები', 'პასუხგაუცემელი'],
		datasets: [
			{
				label: '# of Votes',
				data: [
					statistics ? statistics.AnswersBySubCategories.RightAnswers : 0,
					statistics ? statistics.AnswersBySubCategories.UnAnswered : 0,
					statistics ? statistics.AnswersBySubCategories.WrongAnswers : 0,
				],
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

	useEffect(() => {
		setloading(true);

		accountService.getUserdetails(match.params.userId).then((res) => {
			setUserData(res);
			setloading(false);
		});

		accountService
			.userStatistics(match.params.userId)
			.then((res) => setStatistics(res));
	}, []);

	const filterData = (filterValue) => {
		if (filterValue !== rotate) {
			setRotateValue('asc');
			setRotate(filterValue);
		} else {
			setRotateValue(rotateValue === 'desc' ? 'asc' : 'desc');
			setRotate(filterValue);
		}
	};

	let x = userData.Students.sort((a, b) => {
		let isReverced = rotateValue === 'asc' ? 1 : -1;
		return isReverced * a[rotate].localeCompare(b[rotate]);
	});

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	let currentPosts;

	if (userData.Students) {
		currentPosts = x.slice(indexOfFirstPost, indexOfLastPost);
	}

	// Change page
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
								<span>{userData.Name}</span>
							</Paper>
							<Paper className={classes.paper}>
								<span className={classes.Margin}>გვარი:</span>{' '}
								<span>{userData.Surname}</span>
							</Paper>
							<Paper className={classes.paper}>
								<span className={classes.Margin}>მეილი:</span>{' '}
								<span>{userData.Email}</span>
							</Paper>
						</Grid>
						<Grid item xs={6}>
							<Paper className={classes.paper}>
								<span className={classes.Margin}>როლი:</span>{' '}
								<span>{userData.Name && userData.Role.Name}</span>
							</Paper>
							<Paper className={classes.paper}>
								<span className={classes.Margin}>რეგიონი:</span>{' '}
								<span>{userData.RegionName}</span>
							</Paper>
							<Paper className={classes.paper}>
								<span className={classes.Margin}>სკოლა:</span>{' '}
								<span>{userData.School}</span>
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
							<Doughnut data={data1} legend={false} />
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
							<Doughnut data={data2} legend={false} />
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
							<Doughnut data={data3} legend={false} />
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
							<div className='chart w-100'>
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
					{!userData.Id && loading && <LinearProgress />}

					<TableComponent>
						<TableHeadComponent>
							<TableCell
								className='cursor-pointer'
								onClick={() => filterData('Name', 'name')}
							>
								<div className='flex'>
									სახელი
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
								align='left'
								className='cursor-pointer'
								onClick={() => filterData('Surname', 'Surname')}
							>
								<div className='flex'>
									გვარი
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
							<TableCell align='left'>მეილი</TableCell>
							<TableCell align='left'>როლი</TableCell>
							<TableCell align='left'>რეგიონი</TableCell>
							<TableCell align='left'>სკოლა</TableCell>
						</TableHeadComponent>

						<TableBody>
							{currentPosts.map((row, index) => (
								<TableRow
									visible={row.visible}
									style={{
										opacity: `${row.visible ? '0.2' : '1'}`,
									}}
									key={index}
								>
									<TableCell component='th' scope='row'>
										{row.Name}
									</TableCell>
									<TableCell align='left'>{row.Surname}</TableCell>
									<TableCell align='left'>{row.Email}</TableCell>
									<TableCell align='left'>{row.Role}</TableCell>
									<TableCell align='left'>{row.Region}</TableCell>
									<TableCell align='left'>{row.School}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</TableComponent>

					<div className='flex space-center' style={{ marginTop: 30 }}>
						{userData && userData.Students.length > 0 && (
							<PaginationComponent
								postsPerPage={postsPerPage}
								totalPosts={userData.Students.length}
								paginate={paginate}
							/>
						)}
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

UserPage.getInitialProps = async (ctx) => {
	return {
		props: { drawerIsOpen: 'false' },
	};
};
