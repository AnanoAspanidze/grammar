import React, { useEffect } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
import { setCookie, getCookie } from '../../../helpers/cookie';

const drawerWidth = 240;

export default function AppBarComponnent({ isOpen, children }) {
	const router = useRouter();
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = React.useState(null);
	// const [cookie, setcookie] = React.useState(null);

	useEffect(() => {
		setOpen(null);
	}, []);

	const handleDrawerOpen = () => {
		setOpen(true);
		setCookie('Drawer', true);
	};

	const handleDrawerClose = () => {
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
						open == true || open == false ? open : JSON.parse(isOpen),
				})}
			>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						onClick={handleDrawerOpen}
						edge='start'
						className={clsx(classes.menuButton, {
							[classes.hide]:
								open == true || open == false ? open : JSON.parse(isOpen),
						})}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' noWrap>
						ადმინისტრატორის პანელი
					</Typography>

					<div className={classes.marginLeft}>
						<Link href='/adminpage/profile'>
							<Button className={classes.colors}>
								<AccountCircleIcon />
								<span className={classes.iconMargin}>პროფილის რედაქტირება</span>
							</Button>
						</Link>

						<Button className={classes.colors}>
							<ExitToAppIcon />
							<span className={classes.iconMargin}>გასვლა</span>
						</Button>
					</div>
				</Toolbar>
			</AppBar>

			<Drawer
				variant='permanent'
				className={clsx(classes.drawer, {
					[classes.drawerOpen]:
						open == true || open == false ? open : JSON.parse(isOpen),
					[classes.drawerClose]:
						open == true || open == false ? !open : !JSON.parse(isOpen),
				})}
				classes={{
					paper: clsx({
						[classes.drawerOpen]:
							open == true || open == false ? open : JSON.parse(isOpen),
						[classes.drawerClose]:
							open == true || open == false ? !open : !JSON.parse(isOpen),
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
						<Link href='/adminpage/issuespage'>
							<ListItem
								button
								className={`${
									router.pathname === '/adminpage/issuespage' ? 'bg-blue' : ''
								}`}
							>
								<ListItemIcon>
									<DashboardIcon />
								</ListItemIcon>
								<ListItemText primary='საკითხები' />
							</ListItem>
						</Link>

						<Link href='/adminpage/exercisespage'>
							<ListItem
								button
								className={`${
									router.pathname === '/adminpage/exercisespage'
										? 'bg-blue'
										: ''
								}`}
							>
								<ListItemIcon>
									<ShoppingCartIcon />
								</ListItemIcon>
								<ListItemText primary='სავარჯიშოები' />
							</ListItem>
						</Link>

						<Link href='/adminpage/userspage'>
							<ListItem
								button
								className={`${
									router.pathname === '/adminpage/userspage' ? 'bg-blue' : ''
								}`}
							>
								<ListItemIcon>
									<PeopleIcon />
								</ListItemIcon>
								<ListItemText primary='მომხმარებლები' />
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
}));
