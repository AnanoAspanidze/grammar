import React from 'react';
import {
	Box,
	Card,
	CardContent,
	TextField,
	InputAdornment,
	SvgIcon,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ButtonComponent from '../reusable/ButtonComponent';
import { Link } from 'react-router-dom';

const Toolbar = ({
	className,
	btnHref,
	btnTitle,
	searchFieldPlacehoolder,
	downloadExelFile,
	onChange,
	value,
	...rest
}) => {
	return (
		<>
			<Box display='flex' justifyContent='flex-end'>
				{downloadExelFile && (
					<ButtonComponent
						style={{ marginRight: '20px' }}
						title='გადმოწერე EXCEL ის ფაილად'
						color='primary'
						variant='contained'
					/>
				)}

				{btnHref && btnTitle && (
					<Link to={btnHref}>
						<ButtonComponent
							title={btnTitle}
							color='primary'
							variant='contained'
						/>
					</Link>
				)}
			</Box>

			<Box mt={3} mb={3}>
				<Card>
					<CardContent>
						<Box maxWidth={500}>
							<TextField
								fullWidth
								placeholder={searchFieldPlacehoolder}
								variant='outlined'
								onChange={onChange}
								value={value}
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
