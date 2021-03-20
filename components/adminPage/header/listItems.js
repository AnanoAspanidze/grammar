import React from 'react';
import Link from 'next/link';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';

export const mainListItems = (
	<div>
		<Link href='/adminpage/issuespage'>
			<ListItem button>
				<ListItemIcon>
					<DashboardIcon />
				</ListItemIcon>
				<ListItemText primary='საკითხები' />
			</ListItem>
		</Link>

		<Link href='/adminpage/exercisespage'>
			<ListItem button>
				<ListItemIcon>
					<ShoppingCartIcon />
				</ListItemIcon>
				<ListItemText primary='სავარჯიშოები' />
			</ListItem>
		</Link>

		<Link href='/adminpage/userspage'>
			<ListItem button>
				<ListItemIcon>
					<PeopleIcon />
				</ListItemIcon>
				<ListItemText primary='მომხმარებლები' />
			</ListItem>
		</Link>
	</div>
);
