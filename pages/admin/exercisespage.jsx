import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '../../components/admin/tables/Toolbar';
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

import ButtonComponent from '../../components/admin/reusable/ButtonComponent';
import AppBarComponnent from '../../components/admin/header/AppBar';
import TableComponent from '../../components/admin/tables/TableComponent';
import TableHeadComponent from '../../components/admin/tables/TableHeadComponent';
import { getCookie } from '../../helpers/cookie';

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

function Exercises({ drawerIsOpen }) {
	const classes = useStyles();

	const [checked, setChecked] = React.useState(true);
	const [checkedId, setCheckedId] = React.useState(null);
	const [array, setArray] = React.useState(rows);

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

	const handleChange = (event) => {
		setChecked(event.target.checked);
		setCheckedId(parseInt(event.target.id));
	};

	return (
		<AppBarComponnent isOpen={drawerIsOpen}>
			<Toolbar
				btnHref='/admin/exercise/addexecise'
				btnTitle='სავარჯიშოს დამატება'
				searchFieldPlacehoolder='search'
			/>
			<Grid container spacing={3} justify='center'>
				<Grid item lg={12}>
					<TableComponent>
						<TableHeadComponent>
							<TableCell>სათაური</TableCell>
							<TableCell align='left'>სავარჯიშოს ნაწილი</TableCell>
							<TableCell align='left'>საკითხი</TableCell>
							<TableCell align='left'>ტიპი</TableCell>
							<TableCell align='left'>შემაჯამებელი სავარჯიშო</TableCell>
							<TableCell align='left'></TableCell>
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
									<TableCell align='left'>{row.name}</TableCell>
									<TableCell component='th' scope='row'>
										{row.name}
									</TableCell>
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
										<IconButton onClick={(e) => generateArray(index)}>
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