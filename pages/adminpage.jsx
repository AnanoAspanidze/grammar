import React from 'react';
import AppBarComponnent from '../components/adminPage/header/AppBar';
import redirect from '../helpers/redirect';

function adminpage() {
	return <AppBarComponnent></AppBarComponnent>;
}

export default adminpage;

export async function getServerSideProps(ctx) {
	redirect('/adminpage/exercisespage', ctx);

	return {
		props: {},
	};
}
