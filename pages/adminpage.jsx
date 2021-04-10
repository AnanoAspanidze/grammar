import React from 'react';
import AppBarComponnent from '../components/adminPage/header/AppBar';
import redirect from '../helpers/redirect';

function Adminpage() {
	return <AppBarComponnent></AppBarComponnent>;
}

export default Adminpage;

Adminpage.getInitialProps = async (ctx) => {
	return redirect('/adminpage/exercisespage', ctx);
};
