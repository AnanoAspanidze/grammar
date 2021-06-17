import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '../../components/admin/tables/Toolbar';
import Grid from '@material-ui/core/Grid';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import LinearProgress from '@material-ui/core/LinearProgress';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import EditIcon from '@material-ui/icons/Edit';
import SnackbarComponent from '../../components/admin/reusable/SnackbarComponent';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import Checkbox from '@material-ui/core/Checkbox';
import { exerciseService } from '../../services/exercise.service';
import AppBarComponnent from '../../components/admin/header/AppBar';
import TableComponent from '../../components/admin/tables/TableComponent';
import TableHeadComponent from '../../components/admin/tables/TableHeadComponent';
import PaginationComponent from '../../components/admin/reusable/PaginationComponent';

function Exercises({ drawerIsOpen }) {
	const classes = useStyles();

	const [state, setState] = useState({
		open: false,
		vertical: 'top',
		horizontal: 'center',
		severity: '',
		error: null,
	});

	const [exercises, setExercises] = useState(null);
	const [searchValue, setSearchValue] = useState('');

	const [rotate, setRotate] = useState('Name');
	const [rotateValue, setRotateValue] = useState('asc');
	const [sortOrder, setSortOrder] = useState('');
	const [sortOrderValue, setSortOrderValue] = useState('name_asc');
	const [isSearchingMode, setIsSearchingMode] = useState(false);
	const [checked, setChecked] = React.useState(true);
	const [checkedId, setCheckedId] = React.useState(null);
	const [array, setArray] = React.useState();
	const [loading, setLoading] = useState(false);
	const [currentPage, setcurrentPage] = useState(1);

	const { open } = state;

	useEffect(() => {
		setLoading(true);
		exerciseService
			.getExercises({
				PageSize: 10,
				PageNumber: currentPage,
				SortOrder: sortOrderValue,
				SearchQuery: searchValue,
			})
			.then((res) => {
				setExercises(res);
				setLoading(false);
			});
	}, [currentPage, sortOrderValue, searchValue]);

	useEffect(() => {
		if (sortOrder) {
			console.log(rotateValue);
			setSortOrderValue(`${sortOrder}_${rotateValue}`);
		}
	}, [sortOrder, rotateValue]);

	const handleChange = (event) => {
		setChecked(event.target.checked);
		setCheckedId(parseInt(event.target.id));
	};

	const handleClick = (newState, message) => {
		setState({ open: true, error: message, ...newState });
	};

	const handleClose = () => {
		setState({ ...state, open: false });
	};

	const toggleVisible = (id, isActive) => {
		if (!isActive) {
			setLoading(true);

			const items = exercises.Exercises.map((w) => {
				if (w.Id === id) {
					return { ...w, IsActive: true };
				}

				return w;
			});

			setExercises({ ...exercises, Exercises: items });

			console.log(items);

			exerciseService.unhideExercise(id).then((res) => {
				// setExercises(res);
				setLoading(false);

				handleClick(
					{ vertical: 'bottom', horizontal: 'center', severity: 'success' },
					res.Message
				);
			});
		}

		if (isActive) {
			setLoading(true);

			const items = exercises.Exercises.map((w) => {
				if (w.Id === id) {
					return { ...w, IsActive: false };
				}

				return w;
			});

			setExercises({ ...exercises, Exercises: items });

			exerciseService.hideExercise(id).then((res) => {
				setLoading(false);

				handleClick(
					{ vertical: 'bottom', horizontal: 'center', severity: 'success' },
					res.Message
				);
			});
		}
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

	const paginate = (pageNumber) => setcurrentPage(pageNumber);

	return (
		<AppBarComponnent isOpen={drawerIsOpen}>
			<Toolbar
				btnHref='/admin/exercise/addexecise'
				btnTitle='სავარჯიშოს დამატება'
				searchFieldPlacehoolder='search'
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
			/>
			<Grid container spacing={3} justify='center'>
				<Grid item lg={12}>
					<div style={{ height: '4px' }}>{loading && <LinearProgress />}</div>
					<TableComponent>
						<TableHeadComponent>
							<TableCell
								className='cursor-pointer'
								onClick={() => {
									if (!loading) {
										filterData('Name', 'name');
									}
								}}
							>
								<div className='flex'>
									<div>სათაური</div>
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
							<TableCell align='left'>
								<div className='flex'>
									<div>სავარჯიშოს ნაწილი</div>
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
							<TableCell align='left'>საკითხი</TableCell>
							<TableCell align='left'>ტიპი</TableCell>
							<TableCell align='left'>შემაჯამებელი სავარჯიშო</TableCell>
							<TableCell align='left'></TableCell>
						</TableHeadComponent>

						<TableBody>
							{exercises &&
								exercises.Exercises.map((row, index) => (
									<TableRow
										visible={row.IsActive.toString()}
										style={{
											opacity: `${row.IsActive ? '1' : '0.2'}`,
										}}
										key={row.Id}
									>
										<TableCell align='left'>{row.Name}</TableCell>

										<TableCell component='th' scope='row'>
											{row.Category}
										</TableCell>
										<TableCell align='left'>{row.SubCategory}</TableCell>
										<TableCell align='left'>{row.Type}</TableCell>
										<TableCell align='left'>
											<Checkbox
												checked={row.IsSummaryExercise}
												color='primary'
												id={index}
												onChange={handleChange}
											/>
										</TableCell>
										<TableCell align='left'>
											<Link to={`/admin/editexecise/${row.Id}`}>
												<IconButton>
													<EditIcon />
												</IconButton>
											</Link>
											<IconButton
												onClick={() => toggleVisible(row.Id, row.IsActive)}
											>
												<VisibilityIcon />
											</IconButton>
										</TableCell>
									</TableRow>
								))}
						</TableBody>
					</TableComponent>

					<div className='flex space-center' style={{ marginTop: 30 }}>
						{exercises && (
							<PaginationComponent
								postsPerPage={10}
								totalPosts={exercises.ExercisesQuantity}
								paginate={paginate}
							/>
						)}
					</div>
				</Grid>
			</Grid>

			<SnackbarComponent
				open={open}
				message={state.error}
				severity={state.severity}
				handleClose={handleClose}
			/>
		</AppBarComponnent>
	);
}

export default Exercises;

const useStyles = makeStyles((theme) => ({
	underline: {
		textDecoration: 'underline',
		color: 'inherit',
		paddingBottom: '5px',
	},
}));

Exercises.getInitialProps = async (ctx) => {
	return {
		props: { drawerIsOpen: 'false' },
	};
};
