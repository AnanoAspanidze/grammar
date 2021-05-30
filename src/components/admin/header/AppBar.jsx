import React, { useEffect, useContext } from 'react';
import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import { setCookie } from '../../../helpers/cookie';
import userContext from '../../../context/user/userContext';
import drawerContext from '../../../context/drawer/drawerContext';

const drawerWidth = 240;

export default function AppBarComponnent({ isOpen, children }) {
	let location = useLocation();
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = React.useState(null);
	const { logOutUser, isAuthenticated } = useContext(userContext);
	const { changeDrawer } = useContext(drawerContext);

	useEffect(() => {
		setOpen(null);
	}, []);

	const handleDrawerOpen = () => {
		changeDrawer(true);
		setOpen(true);
		setCookie('Drawer', true);
	};

	const handleDrawerClose = () => {
		changeDrawer(false);
		setOpen(false);
		setCookie('Drawer', false);
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position='fixed'
				className={clsx(classes.appBar, {
					[classes.appBarShift]:
						open === true || open === false ? open : isOpen,
				})}
			>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						onClick={handleDrawerOpen}
						edge='start'
						className={clsx(classes.menuButton, {
							[classes.hide]: open === true || open === false ? open : isOpen,
						})}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' noWrap>
						ადმინისტრატორის პანელი
					</Typography>

					{isAuthenticated && (
						<div className={classes.marginLeft}>
							<Link to='/admin/profile'>
								<Button className={classes.colors}>
									<AccountCircleIcon />
									<span className={classes.iconMargin}>
										პროფილის რედაქტირება
									</span>
								</Button>
							</Link>

							<Button className={classes.colors}>
								<ExitToAppIcon />
								<span className={classes.iconMargin} onClick={logOutUser}>
									გასვლა
								</span>
							</Button>
						</div>
					)}
				</Toolbar>
			</AppBar>

			<Drawer
				variant='permanent'
				className={clsx(classes.drawer, {
					[classes.drawerOpen]: open === true || open === false ? open : isOpen,
					[classes.drawerClose]:
						open === true || open === false ? !open : !isOpen,
				})}
				classes={{
					paper: clsx({
						[classes.drawerOpen]:
							open === true || open === false ? open : isOpen,
						[classes.drawerClose]:
							open === true || open === false ? !open : !isOpen,
					}),
				}}
			>
				<div className={classes.toolbar}>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'rtl' ? (
							<ChevronRightIcon />
						) : (
							<ChevronLeftIcon />
						)}
					</IconButton>
				</div>
				<Divider />

				<List>
					<div>
						<Link to='/admin/issuespage'>
							<ListItem
								button
								className={`${
									location.pathname === '/admin/issuespage' ? 'bg-blue' : ''
								}`}
							>
								<ListItemIcon>
									<DashboardIcon />
								</ListItemIcon>
								<ListItemText
									className={classes.ListItemTextColor}
									primary='საკითხები'
								/>
							</ListItem>
						</Link>

						<Link to='/admin/exercisespage'>
							<ListItem
								button
								className={`${
									location.pathname === '/admin/exercisespage' ||
									location.pathname === '/admin/exercise/addexecise'
										? 'bg-blue'
										: ''
								}`}
							>
								<ListItemIcon>
									<ShoppingCartIcon />
								</ListItemIcon>
								<ListItemText
									className={classes.ListItemTextColor}
									primary='სავარჯიშოები'
								/>
							</ListItem>
						</Link>

						<Link to='/admin/userspage'>
							<ListItem
								button
								className={`${
									location.pathname === '/admin/userspage' ? 'bg-blue' : ''
								}`}
							>
								<ListItemIcon>
									<PeopleIcon />
								</ListItemIcon>
								<ListItemText
									className={classes.ListItemTextColor}
									primary='მომხმარებლები'
								/>
							</ListItem>
						</Link>
					</div>
				</List>
			</Drawer>

			<main className={classes.content}>
				<div className={classes.toolbar} />
				{children}
			</main>
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		width: '100%',
		marginLeft: 0,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9) + 1,
		},
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	colors: {
		color: '#fff',
	},
	marginLeft: {
		marginLeft: 'auto',
	},
	iconMargin: {
		marginLeft: '5px',
	},

	ListItemTextColor: {
		color: 'rgba(0, 0, 0, 1)',
	},
}));
