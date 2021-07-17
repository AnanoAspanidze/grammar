import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

// context
import userContext from './context/user/userContext';
import drawerContext from './context/drawer/drawerContext';
import UserState from './context/user/UserState';
import DrawerState from './context/drawer/DrawerState';

import { getCookie } from './helpers/cookie';
import PrivateRoute from './components/PrivateRoute';

import Landing from './pages/Landing';
import IssuesMainApp from './pages/issues';
import ExercisesMainApp from './pages/exercises';
import ExerciseDetailsPage from './pages/exercisedetails';
import ExercisePage from './pages/exercise';
import CompletedPage from './pages/result';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import NotFoundPage from './pages/NotFoundPage';

import Adminpage from './pages/admin';
import Profile from './pages/admin/profile';
import Signin from './pages/admin/signin';
import Signing from './pages/admin/signing';

import Issuespage from './pages/admin/issuespage';
import Addissue from './pages/admin/issue/addissue';
import EditIssue from './pages/admin/issue/EditIssue';

import Exercises from './pages/admin/exercisespage';
import Addexecise from './pages/admin/exercise/addexecise';
import Editexecise from './pages/admin/exercise/editexecise';

import Userspage from './pages/admin/userspage';
import UserPage from './pages/admin/user/UserPage';

import ResetPasswordContainer from './components/client/containers/ResetPasswordContainer';
import DefinitionModal from './components/client/modal/DefinitionModal';
import SignInModalContainer from './components/client/containers/SignInModalContainer';
import SignUpModalContainer from './components/client/containers/SignUpModalContainer';
import ResetNewPasswordModalContainer from './components/client/containers/ResetNewPasswordModalContainer';

import { Defaults } from './helpers/defaults';

function App() {
	return (
		<UserState>
			<DrawerState>
				<MyComponent />
			</DrawerState>
			<ResetPasswordContainer ref={(ref) => (Defaults.ResetPassword = ref)} />
			<DefinitionModal ref={(ref) => (Defaults.Definition = ref)} />
			<SignInModalContainer ref={(ref) => (Defaults.SigninModal = ref)} />
			<SignUpModalContainer ref={(ref) => (Defaults.SignUpModal = ref)} />
			<ResetNewPasswordModalContainer
				ref={(ref) => (Defaults.ResetNewPassword = ref)}
			/>
		</UserState>
	);
}

function MyComponent() {
	const { setCurrentUser } = useContext(userContext);
	const { isOpen, changeDrawer } = useContext(drawerContext);

	useEffect(() => {
		if (getCookie('Drawer')) {
			changeDrawer(JSON.parse(getCookie('Drawer')));
		}
	}, []);

	useEffect(() => {
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
			<Switch>
				<Route exact path='/' component={Landing} drawerIsOpen={isOpen} />

				<Route path='/issues' exact>
					<IssuesMainApp />
				</Route>
				<Route path='/exercises' exact>
					<ExercisesMainApp />
				</Route>

				<Route path='/about' exact>
					<About />
				</Route>

				<Route path='/privacy-policy' exact>
					<PrivacyPolicy />
				</Route>

				<Route path='/terms' exact>
					<Terms />
				</Route>

				<Route
					path='/exercisedetails/:exerciseId'
					component={ExerciseDetailsPage}
					drawerIsOpen={isOpen}
					exact
				/>
				<Route
					path='/exercise/:exerciseId'
					component={ExercisePage}
					drawerIsOpen={isOpen}
					exact
				/>
				<Route
					path='/result'
					component={CompletedPage}
					drawerIsOpen={isOpen}
					exact
				/>

				<PrivateRoute
					component={Adminpage}
					path='/admin'
					drawerIsOpen={isOpen}
					exact
				/>
				<PrivateRoute
					component={Profile}
					path='/admin/profile'
					drawerIsOpen={isOpen}
					exact
				/>

				<Route path='/admin/signin' drawerIsOpen={isOpen} exact>
					<Signin />
				</Route>

				<Route
					path='/admin/signing/:token'
					component={Signing}
					drawerIsOpen={isOpen}
				></Route>

				<PrivateRoute
					component={Issuespage}
					path='/admin/issuespage'
					drawerIsOpen={isOpen}
					exact
				/>

				<PrivateRoute
					component={EditIssue}
					path='/admin/editissue/:issueId'
					drawerIsOpen={isOpen}
					exact
				/>

				<PrivateRoute
					component={Addissue}
					path='/admin/addissue'
					drawerIsOpen={isOpen}
					exact
				/>

				<PrivateRoute
					component={Exercises}
					path='/admin/exercisespage'
					drawerIsOpen={isOpen}
					exact
				/>

				<PrivateRoute
					component={Addexecise}
					path='/admin/exercise/addexecise'
					drawerIsOpen={isOpen}
					exact
				/>

				<PrivateRoute
					component={Editexecise}
					path='/admin/editexecise/:exerciseId'
					drawerIsOpen={isOpen}
					exact
				/>

				<PrivateRoute
					component={Userspage}
					path='/admin/userspage'
					drawerIsOpen={isOpen}
					exact
				/>
				<PrivateRoute
					component={UserPage}
					path='/admin/user/:userId'
					drawerIsOpen={isOpen}
					exact
				/>

				<Route component={NotFoundPage} />
			</Switch>
		</Router>
	);
}

export default App;
