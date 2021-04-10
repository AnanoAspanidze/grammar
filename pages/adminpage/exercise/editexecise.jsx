import React from 'react';
import { getCookie } from '../../../helpers/cookie';

function Editexecise({ drawerIsOpen }) {
	return <div>edit exercixe</div>;
}

export default Editexecise;

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
