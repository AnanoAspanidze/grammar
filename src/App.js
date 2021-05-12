import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

// context
import userContext from './context/user/userContext';
import UserState from './context/user/UserState';

import { getCookie } from './helpers/cookie';

import Index from './pages/Index';
import Adminpage from './pages/admin';
import Profile from './pages/admin/profile';
import Signin from './pages/admin/signin';

import Issuespage from './pages/admin/issuespage';
import Addissue from './pages/admin/issue/addissue';
import EditIssue from './pages/admin/issue/EditIssue';

import Exercises from './pages/admin/exercisespage';
import Addexecise from './pages/admin/exercise/addexecise';

import Userspage from './pages/admin/userspage';
import UserPage from './pages/admin/user/UserPage';

// import Signup from './pages/user/Signup';
// import Signin from './pages/user/Signin';

function App({ children }) {
	return (
		<UserState>
			<MyComponent />
		</UserState>
	);
}

function MyComponent() {
	const { setCurrentUser } = useContext(userContext);

	useEffect(() => {
		// fetch(
		// 	'https://cors-anywhere.herokuapp.com/https://grammar.emis.ge/api/Users/userexeldata',
		// 	{
		// 		headers: {
		// 			...authHeader(),
		// 		},
		// 	}
		// ).then((res) => {
		// 	const blob = new Blob([res.data], {
		// 		type:
		// 			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		// 	});

		// 	console.log(blob);
		// });

		if (getCookie('JwtToken')) {
			const decode = jwt_decode(getCookie('JwtToken'));

			setCurrentUser(
				{
					...decode,
					Name: decode.unique_name,
					Surname: decode.family_name,
					Id: parseInt(decode.nameid),
				},
				getCookie('JwtToken'),
				getCookie('RefreshToken')
			);
		}
	}, []);

	return (
		<Router>
			<Route path='/' exact>
				<Index />
			</Route>

			<Switch>
				<Route path='/admin' exact>
					<Adminpage />
				</Route>
				<Route path='/admin/profile' exact>
					<Profile />
				</Route>
				<Route path='/admin/signin' exact>
					<Signin />
				</Route>

				<Route path='/admin/issuespage' exact>
					<Issuespage />
				</Route>

				<Route path='/admin/editissue/:issueId' component={EditIssue} />

				<Route path='/admin/addissue' exact>
					<Addissue />
				</Route>

				<Route path='/admin/exercisespage' exact>
					<Exercises />
				</Route>
				<Route path='/admin/addexecise' exact>
					<Addexecise />
				</Route>

				<Route path='/admin/userspage' exact>
					<Userspage />
				</Route>
				<Route path='/admin/user/:userId'>
					<UserPage />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
