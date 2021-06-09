import React from 'react';

import Footer from './footer/Footer';
import Header from './header/Header';
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/bootstrap-grid.min.css';

function Layout({ children }) {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
}

export default Layout;
