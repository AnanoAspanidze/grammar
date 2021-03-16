import React from 'react';
import {
	Box,
	Card,
	CardContent,
	TextField,
	InputAdornment,
	SvgIcon,
	makeStyles,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ButtonComponent from '../reusable/ButtonComponent';

const Toolbar = ({ className, ...rest }) => {
	return (
		<>
			<Box display='flex' justifyContent='flex-end'>
				<ButtonComponent
					title='Add product'
					color='primary'
					variant='contained'
				/>
			</Box>

			<Box mt={3} mb={3}>
				<Card>
					<CardContent>
						<Box maxWidth={500}>
							<TextField
								fullWidth
								placeholder='Search product'
								variant='outlined'
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<SvgIcon fontSize='small' color='action'>
												<SearchIcon />
											</SvgIcon>
										</InputAdornment>
									),
								}}
							/>
						</Box>
					</CardContent>
				</Card>
			</Box>
		</>
	);
};

export default Toolbar;
