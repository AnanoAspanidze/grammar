import React from 'react';
import Pagination from '@material-ui/lab/Pagination';

const PaginationComponent = ({ postsPerPage, totalPosts, paginate }) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
		pageNumbers.push(i);
	}

	const handleChange = (event, value) => {
		paginate(value);
	};

	return (
		<Pagination
			count={pageNumbers.length}
			color='primary'
			onChange={handleChange}
		/>
	);
};

export default PaginationComponent;
