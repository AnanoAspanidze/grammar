import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import EditIcon from '@material-ui/icons/Edit';
import LinearProgress from '@material-ui/core/LinearProgress';
import SnackbarComponent from '../../components/admin/reusable/SnackbarComponent';

import PaginationComponent from '../../components/admin/reusable/PaginationComponent';
import Toolbar from '../../components/admin/tables/Toolbar';
import AppBarComponnent from '../../components/admin/header/AppBar';
import TableComponent from '../../components/admin/tables/TableComponent';
import TableHeadComponent from '../../components/admin/tables/TableHeadComponent';

import { issueService } from '../../services/issue.service';

function Issuespage({ drawerIsOpen }) {
	const [state, setState] = useState({
		open: false,
		vertical: 'top',
		horizontal: 'center',
		severity: '',
		error: null,
	});

	const [array, setArray] = useState([]);
	const [searchedArray, setSearchedArray] = useState([]);
	const [isSearchingMode, setIsSearchingMode] = useState(false);
	const [value, setValue] = useState('');
	const [loading, setloading] = useState(false);

	const [rotate, setRotate] = useState('Name');
	const [rotateValue, setRotateValue] = useState('asc');
	// const [isHidden, setIsHidden] = useState(false);

	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(10);

	const { open } = state;

	useEffect(() => {
		setloading(true);
		issueService.getIssues().then((res) => {
			setArray(res);
			setSearchedArray(res);
			setloading(false);
		});
	}, []);

	const handleClick = (newState, message) => {
		setState({ open: true, error: message, ...newState });
	};

	const handleClose = () => {
		setState({ ...state, open: false });
	};

	const toggleVisible = (id, isActive) => {
		if (!isActive) {
			setloading(true);
			issueService.unHideIssue(id).then((res) => {
				issueService.getIssues().then((res) => {
					setArray(res);
					setloading(false);
				});

				handleClick(
					{ vertical: 'bottom', horizontal: 'center', severity: 'success' },
					res.Message
				);
			});
		}

		if (isActive) {
			setloading(true);
			issueService.hideIssue(id).then((res) => {
				issueService.getIssues().then((res) => {
					setArray(res);
					setloading(false);
				});

				handleClick(
					{ vertical: 'bottom', horizontal: 'center', severity: 'success' },
					res.Message
				);
			});
		}
	};

	const filterData = (filterValue) => {
		if (filterValue !== rotate) {
			setRotateValue('asc');
			setRotate(filterValue);
		} else {
			setRotateValue(rotateValue === 'desc' ? 'asc' : 'desc');
			setRotate(filterValue);
		}
	};

	useEffect(() => {
		const handleSearch = () => {
			if (value !== '') {
				setIsSearchingMode(true);

				let v = value.toLowerCase();
				let result = [];

				result = array.filter((data) => {
					return data.Name.search(v) != -1;
				});
				setSearchedArray(result);
			} else {
				setIsSearchingMode(false);
			}
		};

		handleSearch();
	}, [value]);

	let x = array.sort((a, b) => {
		let isReverced = rotateValue === 'asc' ? 1 : -1;
		return isReverced * a[rotate].localeCompare(b[rotate]);
	});

	if (isSearchingMode) {
		var y = searchedArray.sort((a, b) => {
			let isReverced = rotateValue === 'asc' ? 1 : -1;
			return isReverced * a[rotate].localeCompare(b[rotate]);
		});
	}

	// Get current posts
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	let currentPosts;

	if (!isSearchingMode) {
		currentPosts = x.slice(indexOfFirstPost, indexOfLastPost);
	} else {
		currentPosts = y.slice(indexOfFirstPost, indexOfLastPost);
	}

	// Change page
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<AppBarComponnent isOpen={drawerIsOpen}>
			<Toolbar
				btnHref='/admin/addissue'
				btnTitle='საკითხის დამატება'
				searchFieldPlacehoolder='search'
				onChange={(e) => setValue(e.target.value)}
				inputValue={value}
			/>

			<Grid container spacing={3} justify='center'>
				<Grid item xs={12} sm={12} lg={8}>
					{array.length < 1 && loading && <LinearProgress />}
					<TableComponent>
						<TableHeadComponent>
							<TableCell
								className='cursor-pointer'
								onClick={() => filterData('Name')}
							>
								<div className='flex'>
									<div>საკითხი</div>
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
								onClick={() => filterData('Category')}
								align='left'
							>
								<div className='flex'>
									<div>ნაწილი</div>
									<ArrowDropDownIcon
										style={{
											transform: `rotate(${
												rotateValue === 'asc' ? 0 : 180
											}deg)`,
											display: `${rotate !== 'Category' ? 'none' : 'initial'}`,
										}}
									/>
								</div>
							</TableCell>
							<TableCell align='left'></TableCell>
						</TableHeadComponent>

						<TableBody style={{ minHeight: '200px' }}>
							{currentPosts.map((row) => (
								<TableRow
									visible={row.IsActive.toString()}
									style={{
										opacity: `${row.IsActive === true ? '1' : '0.2'}`,
									}}
									key={row.Id}
								>
									<TableCell component='th' scope='row'>
										{row.Name}
									</TableCell>
									<TableCell align='left'>{row.Category}</TableCell>
									<TableCell align='left'>
										<Link to={`/admin/editissue/${row.Id}`}>
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
						{!loading && (
							<PaginationComponent
								postsPerPage={postsPerPage}
								totalPosts={
									isSearchingMode ? searchedArray.length : array.length
								}
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

export default Issuespage;
