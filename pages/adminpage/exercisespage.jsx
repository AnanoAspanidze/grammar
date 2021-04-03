import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '../../components/adminPage/tables/Toolbar';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import EditIcon from '@material-ui/icons/Edit';
import Link from 'next/link';
import Checkbox from '@material-ui/core/Checkbox';

import ButtonComponent from '../../components/adminPage/reusable/ButtonComponent';
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

function Exercises() {
	const classes = useStyles();

	const [checked, setChecked] = React.useState(true);
	const [checkedId, setCheckedId] = React.useState(null);

	const handleChange = (event) => {
		setChecked(event.target.checked);
		setCheckedId(parseInt(event.target.id));
	};

	return (
		<AppBarComponnent>
			<Toolbar
				btnHref='/adminpage/exercise/addexecise'
				btnTitle='სავარჯიშოს დამატება'
				searchFieldPlacehoolder='search'
			/>
			<Grid container spacing={3} justify='center'>
				<Grid item lg={12}>
					<TableComponent>
						<TableHeadComponent>
							<TableCell>სავარჯიშოს ნაწილი</TableCell>
							<TableCell align='left'>საკითხი</TableCell>
							<TableCell align='left'>ტიპი</TableCell>
							<TableCell align='left'>სათაური</TableCell>
							<TableCell align='left'>შემაჯამებელი სავარჯიშო</TableCell>
							<TableCell align='left'></TableCell>
						</TableHeadComponent>

						<TableBody>
							{rows.map((row, index) => (
								<TableRow key={row.name}>
									<TableCell component='th' scope='row'>
										<Link href='/adminpage/exercise/334'>
											<a className={classes.underline}>{row.name}</a>
										</Link>
									</TableCell>
									<TableCell align='left'>{row.calories}</TableCell>
									<TableCell align='left'>{row.calories}</TableCell>
									<TableCell align='left'>{row.calories}</TableCell>
									<TableCell align='left'>
										<Checkbox
											checked={checked && index === checkedId}
											color='primary'
											id={index}
											onChange={handleChange}
										/>
									</TableCell>
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

export default Exercises;

const useStyles = makeStyles((theme) => ({
	underline: {
		textDecoration: 'underline',
		color: 'inherit',
		paddingBottom: '5px',
	},
}));
