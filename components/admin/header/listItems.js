import React from 'react';
import Link from 'next/link';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
console.log(window.location);
export const mainListItems = (
	<div>
		<Link href='/admin/issuespage'>
			<ListItem button>
				<ListItemIcon>
					<DashboardIcon />
				</ListItemIcon>
			</ListItem>
		</Link>

		<Link href='/admin/exercisespage'>
			<ListItem button>
				<ListItemIcon>
					<ShoppingCartIcon />
				</ListItemIcon>
			</ListItem>
		</Link>

		<Link href='/admin/userspage'>
			<ListItem button>
				<ListItemIcon>
					<PeopleIcon />
				</ListItemIcon>
			</ListItem>
		</Link>
	</div>
);
