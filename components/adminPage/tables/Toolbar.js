import React from 'react';
import {
	Box,
	Button,
	Card,
	CardContent,
	TextField,
	InputAdornment,
	SvgIcon,
	makeStyles,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const Toolbar = ({ className, ...rest }) => {
	return (
		<>
			<Box display='flex' justifyContent='flex-end'>
				<Button color='primary' variant='contained'>
					Add product
				</Button>
			</Box>
			<Box mt={3} mb={3}>
				<Card>
					<CardContent>
						<Box maxWidth={500}>
							<TextField
								fullWidth
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<SvgIcon fontSize='small' color='action'>
												<SearchIcon />
											</SvgIcon>
										</InputAdornment>
									),
								}}
								placeholder='Search product'
								variant='outlined'
							/>
						</Box>
					</CardContent>
				</Card>
			</Box>
		</>
	);
};

export default Toolbar;
