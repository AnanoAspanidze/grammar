import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';

function TableComponent({ children }) {
	const classes = useStyles();

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label='simple table'>
				{children}
			</Table>
		</TableContainer>
	);
}

export default TableComponent;

const useStyles = makeStyles({
	table: {
		minWidth: 450,
	},
});
