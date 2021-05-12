import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import EditIcon from '@material-ui/icons/Edit';

import Toolbar from '../../components/admin/tables/Toolbar';
import AppBarComponnent from '../../components/admin/header/AppBar';
import TableComponent from '../../components/admin/tables/TableComponent';
import TableHeadComponent from '../../components/admin/tables/TableHeadComponent';

import { issueService } from '../../services/issue.service';

function Issuespage({ drawerIsOpen }) {
	const [array, setArray] = useState([]);

	useEffect(() => {
		issueService.getIssues().then((res) => setArray(res));
	}, []);

	// const generateArray = (index) => {
	// 	const modifier = array.map((w, i) => {
	// 		if (i == index) {
	// 			if (w.visible) {
	// 				return { ...w, visible: false };
	// 			} else if (!w.visible) {
	// 				return { ...w, visible: true };
	// 			}
	// 		}
	// 		return w;
	// 	});

	// 	setArray(modifier);
	// };

	return (
		<AppBarComponnent isOpen={drawerIsOpen}>
			<Toolbar
				btnHref='/admin/addissue'
				btnTitle='საკითხის დამატება'
				searchFieldPlacehoolder='search'
			/>

			<Grid container spacing={3} justify='center'>
				<Grid item xs={12} sm={12} lg={8}>
					<TableComponent>
						<TableHeadComponent>
							<TableCell>საკითხი</TableCell>
							<TableCell align='left'>ნაწილი</TableCell>
							<TableCell align='left'></TableCell>
						</TableHeadComponent>

						<TableBody>
							{array.map((row) => (
								<TableRow
									visible={row.IsActive}
									style={{
										opacity: `${row.IsActive ? '0.2' : '1'}`,
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
		</AppBarComponnent>
	);
}

export default Issuespage;
