import React from 'react';
import AppBarComponnent from '../../components/adminPage/header/AppBar';
import IssuesTable from '../../components/adminPage/tables/IssuesTable';

function Issues() {
	return (
		<AppBarComponnent>
			<IssuesTable />
		</AppBarComponnent>
	);
}

export default Issues;
