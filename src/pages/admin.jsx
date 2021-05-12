import React from 'react';
import AppBarComponnent from '../components/admin/header/AppBar';
import AdminpageHead from '../components/admin/AdminpageHead';
import { getCookie } from '../helpers/cookie';

function Adminpage() {
	return (
		<>
			<AdminpageHead />
			<AppBarComponnent isOpen={true}></AppBarComponnent>
		</>
	);
}

export default Adminpage;
