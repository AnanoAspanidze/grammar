import React from 'react';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import EditIcon from '@material-ui/icons/Edit';

import Toolbar from '../../components/adminPage/tables/Toolbar';
import AppBarComponnent from '../../components/adminPage/header/AppBar';
import TableComponent from '../../components/adminPage/tables/TableComponent';
import TableHeadComponent from '../../components/adminPage/tables/TableHeadComponent';

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

function Issuespage() {
	return (
		<AppBarComponnent>
			<Toolbar />

			<Grid container spacing={3} justify='center'>
				<Grid item xs={12} sm={12} lg={8}>
					<TableComponent>
						<TableHeadComponent>
							<TableCell>საკითხი</TableCell>
							<TableCell align='left'>ნაწილი</TableCell>
							<TableCell align='left'></TableCell>
						</TableHeadComponent>

						<TableBody>
							{rows.map((row) => (
								<TableRow key={row.name}>
									<TableCell component='th' scope='row'>
										{row.name}
									</TableCell>
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
		</AppBarComponnent>
	);
}

export default Issuespage;
