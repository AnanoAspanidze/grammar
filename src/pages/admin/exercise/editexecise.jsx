import React from 'react';
import { getCookie } from '../../../helpers/cookie';

function Editexecise({ drawerIsOpen }) {
	return <div>edit exercixe</div>;
}

export default Editexecise;

Editexecise.getInitialProps = async (ctx) => {
	return {
		props: { drawerIsOpen: 'false' },
	};
};
