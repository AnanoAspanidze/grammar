import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
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

function Issuespage({ drawerIsOpen }) {
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
			<Toolbar
				btnHref='/adminpage/issue/addissue'
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
							{array.map((row, index) => (
								<TableRow
									visible={row.visible}
									style={{
										opacity: `${row.visible ? '0.2' : '1'}`,
									}}
									key={index}
								>
									<TableCell component='th' scope='row'>
										{row.name}
									</TableCell>
									<TableCell align='left'>{row.calories}</TableCell>
									<TableCell align='left'>
										<Link href='/adminpage/editissue/2435'>
											<IconButton>
												<EditIcon />
											</IconButton>
										</Link>

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

export default Issuespage;

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
