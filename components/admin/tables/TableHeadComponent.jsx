import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function TableHeadComponent({ children }) {
	return (
		<TableHead>
			<TableRow>{children}</TableRow>
		</TableHead>
	);
}

export default TableHeadComponent;
