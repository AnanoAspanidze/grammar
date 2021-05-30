import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

import SelectComponent from '../../../components/admin/reusable/SelectComponent';
import TextFieldComponent from '../../../components/admin/reusable/TextFieldComponent';
import AppForm from '../../../components/client/forms/AppForm';
import AppBarComponnent from '../../../components/admin/header/AppBar';
import SubmitButton from '../../../components/admin/reusable/SubmitButton';
import { commonService } from '../../../services/common.service';
import { issueService } from '../../../services/issue.service';
import SnackbarComponent from '../../../components/admin/reusable/SnackbarComponent';

function Editissue({ drawerIsOpen, match }) {
	const [initialState, setInitialState] = useState({
		Name: '',
		CategoryId: '',
	});
	const [data, setData] = useState(null);
	const [parts, setParts] = useState(null);
	const [state, setState] = React.useState({
		open: false,
		vertical: 'top',
		horizontal: 'center',
		severity: '',
		error: null,
	});

	const { open } = state;

	const validationSchema = Yup.object().shape({
		CategoryId: Yup.string().required('შეავსეთ ველი'),
		Name: Yup.string().required('შეავსეთ ველი'),
	});

	useEffect(() => {
		commonService.getParts().then((res) => {
			setParts(res);
		});
	}, []);

	useEffect(() => {
		issueService.getIssue(match.params.issueId).then((res) => {
			setData(res);
			setInitialState({
				Name: res.Name,
				CategoryId: res.Category.Id,
			});
		});
	}, [match.params.issueId]);

	const handleClick = (newState, message) => {
		setState({ open: true, error: message, ...newState });
	};

	const handleClose = () => {
		setState({ ...state, open: false });
	};

	function onSubmit(data, action) {
		issueService
			.updateIssue(match.params.issueId, data.Name, data.CategoryId)
			.then((res) => {
				handleClick(
					{ vertical: 'bottom', horizontal: 'center', severity: 'success' },
					res.Message
				);
				action.setSubmitting(false);
			})
			.catch((err) => {
				handleClick(
					{ vertical: 'bottom', horizontal: 'center', severity: 'error' },
					err
				);
				action.setSubmitting(false);
			});
	}

	return (
		<AppBarComponnent isOpen={drawerIsOpen}>
			<AppForm
				initialValues={initialState}
				enableReinitialize={true}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
			>
				<Typography variant='h5' component='h5' align='center' gutterBottom>
					საკითხის რედაქტირება
				</Typography>

				<Grid container spacing={5} justify='center'>
					<Grid item xs={12} sm={12} md={6}>
						<div className='mb-30 mt-30'>
							<div style={{ height: '10px' }}>
								{!data && <LinearProgress />}
							</div>

							<SelectComponent
								name='CategoryId'
								label='ნაწილი *'
								text='Name'
								value='Id'
								options={parts}
								id='demo-controlled-open-select'
							/>
						</div>

						<div className='mb-30'>
							<TextFieldComponent placeholder='სახელი *' name='Name' />
						</div>

						<div className='flex space-center'>
							<SubmitButton
								title='რედაქტირება'
								size='large'
								color='primary'
								variant='contained'
							/>
						</div>
					</Grid>
				</Grid>
			</AppForm>
			<SnackbarComponent
				open={open}
				message={state.error}
				severity={state.severity}
				handleClose={handleClose}
			/>
		</AppBarComponnent>
	);
}

export default Editissue;

Editissue.getInitialProps = async (ctx) => {
	return {
		props: { drawerIsOpen: 'false' },
	};
};
