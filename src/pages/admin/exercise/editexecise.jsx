import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Fab from '@material-ui/core/Fab';
import GraphicEqRoundedIcon from '@material-ui/icons/GraphicEqRounded';
import FormHelperText from '@material-ui/core/FormHelperText';
import SelectComponent from '../../../components/admin/reusable/SelectComponent';
import TextFieldComponent from '../../../components/admin/reusable/TextFieldComponent';
import AppBarComponnent from '../../../components/admin/header/AppBar';
import SubmitButton from '../../../components/admin/reusable/SubmitButton';
import ButtonComponent from '../../../components/admin/reusable/ButtonComponent';

import AddNewQuestion from '../../../components/admin/exercise/AddNewQuestion';
import { exerciseService } from '../../../services/exercise.service';
import { commonService } from '../../../services/common.service';
import { issueService } from '../../../services/issue.service';
import { addExerciseValidationSchema } from '../../../helpers/schema';
import GenerateEditExerciseComponent from '../../../components/admin/exercise/GenerateEditExerciseComponent';

import AddExerciseFormikContainer from '../../../components/admin/exercise/AddExerciseFormikContainer';

function Editexecise({ drawerIsOpen, match }) {
	const classes = useStyles();

	const [value, setValue] = useState({
		part: '1',
		index: 1,
	});
	const [parts, setParts] = useState([]);
	const [selectedPart, setselectedPart] = useState('');
	const [issues, setissues] = useState([]);

	const [index, setIndex] = useState('1');
	const [count, setcount] = useState(1);
	const [arrayItems, setArrayItems] = useState([1]);

	const [exerciseTypes, setexerciseTypes] = useState(null);

	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [deleteModalItem, setDeleteModalItem] = useState(null);
	const [modalData, setModalData] = useState(null);
	const [selectedUser, setSelectedUser] = useState({
		userId: '',
		userRoleId: '',
	});

	useEffect(() => {
		const arrayOfDigits = Array.from(String(index), Number);
		setArrayItems(arrayOfDigits);
	}, [index]);

	useEffect(() => {
		commonService.getParts().then((res) => setParts(res));
		commonService.getEExerciseTypes().then((res) => setexerciseTypes(res));

		exerciseService
			.exercisedetails(match.params.exerciseId)
			.then((res) => setValue({ ...value, ...res }));
	}, []);

	useEffect(() => {
		if (selectedPart) {
			commonService
				.selectedSubcategories(selectedPart)
				.then((res) => setissues(res));
		}
	}, [selectedPart]);

	const handleModalClose = () => {
		setOpen(false);
		setSelectedUser(null);
	};

	function onSubmit(data, action) {
		console.log(data);

		// exerciseService.createExercise(d).then((res) => console.log(res));

		action.setSubmitting(false);
	}

	return (
		<AppBarComponnent isOpen={drawerIsOpen}>
			<Formik
				initialValues={value}
				validateOnChange={true}
				enableReinitialize={true}
				validationSchema={addExerciseValidationSchema}
				onSubmit={onSubmit}
			>
				{({
					values,
					errors,
					handleChange,
					setFieldValue,
					handleSubmit,
					isSubmitting,
				}) => (
					<>
						<form onSubmit={handleSubmit}>
							<Typography
								variant='h5'
								component='h5'
								align='center'
								gutterBottom
							>
								სავარჯიშოს დამატება
							</Typography>

							<Grid container spacing={5} justify='center'>
								<Grid item xs={12} sm={12} md={8}>
									<div className='mb-30 mt-30'>
										<SelectComponent
											name='category'
											label='ნაწილი *'
											text='Name'
											value='Id'
											hasOnchange={true}
											onChange={(e) => {
												setselectedPart(e);
												handleChange('category');
											}}
											options={parts}
										/>
									</div>

									<div className='mb-30 mt-30'>
										<SelectComponent
											name='SubCategoryId'
											text='Name'
											value='Id'
											label='საკითხის არჩევა *'
											options={issues}
										/>
									</div>

									<div className='flex align-items-center mb-30'>
										<span>შემაჯამებელი სავარჯიშო</span>
										<Checkbox
											checked={values['IsSummaryExercise']}
											color='primary'
											value={values['IsSummaryExercise']}
											onChange={(e) => {
												setFieldValue(
													'IsSummaryExercise',
													!values['IsSummaryExercise']
												);
											}}
										/>
									</div>

									{!values['IsSummaryExercise'] && (
										<div className='mb-30 mt-30'>
											<TextFieldComponent
												name='OrderNumber'
												variant='outlined'
												label='მერამდენე იყოს ეს სავარჯიშო'
												onChange={handleChange}
											/>
										</div>
									)}

									<div className='mb-30 mt-30'>
										<SelectComponent
											name='TypeId'
											text='Name'
											value='Id'
											label='სავარჯიშოს ტიპი *'
											options={exerciseTypes}
											onChange={handleChange}
										/>
									</div>

									<div className='mb-30'>
										<TextFieldComponent
											placeholder='სავარჯიშოს სათაური'
											name='Name'
											onChange={handleChange}
										/>
									</div>

									<div className='mb-30'>
										<TextareaAutosize
											name='Description'
											className={classes.Textarea}
											aria-label='empty textarea'
											placeholder='გრამატიკის წესები'
											onChange={handleChange}
										/>
										{errors.Description && (
											<div className='mb-20'>
												<FormHelperText error={true} variant='standard'>
													{errors.Description}
												</FormHelperText>
											</div>
										)}

										<div>
											<input
												accept='image/*'
												className={classes.input}
												id='contained-button-file'
												multiple
												type='file'
											/>
											<label
												htmlFor='contained-button-file'
												className={classes.MarginLeft}
											>
												<Fab component='span'>
													<GraphicEqRoundedIcon />
												</Fab>
											</label>
											აუდიოს ატვირთვა
										</div>
									</div>

									<div className='mb-30'>
										{arrayItems &&
											arrayItems.map((item, i) => (
												<div className='mb-10' key={i}>
													<TextFieldComponent
														placeholder={`youtube ის ლინკი ${item}`}
														name={`${item}`}
														value={values['VideoLinks']}
														onChange={() =>
															setFieldValue('VideoLinks', { Url: item })
														}
													/>
												</div>
											))}

										<ButtonComponent
											onClick={() => {
												setcount(count + 1);
												setIndex((prev) => `${prev}${parseInt(count) + 1}`);
											}}
											variant='contained'
											color='primary'
											title='დამატება'
										/>
									</div>

									<div className='mb-30'>
										<TextareaAutosize
											name='Instruction'
											className={classes.Textarea}
											value={values.desc}
											onChange={handleChange}
										/>

										{errors.Instruction && (
											<div className='mb-20'>
												<FormHelperText error={true} variant='standard'>
													{errors.Instruction}
												</FormHelperText>
											</div>
										)}
									</div>

									<div className='mt-30 mb-50'>
										<ButtonComponent
											size='large'
											variant='contained'
											color='primary'
											title='კითხვების დამატების ვიდეო ახსნა'
										/>
									</div>

									<GenerateEditExerciseComponent
										name='TypeId'
										value={value}
										closeModal={setOpen}
										setDeleteQuestion={(e) => setDeleteModal(e)}
										onClick={(e) => setModalData(e)}
									/>

									<AddNewQuestion />

									<div className='flex space-center mt-70 mt-30'>
										<SubmitButton
											title='სავარჯიშოს დამატება'
											size='large'
											color='primary'
											variant='contained'
										/>
									</div>
								</Grid>
							</Grid>
						</form>
					</>
				)}
			</Formik>
			{modalData && open && (
				<Dialog
					disableBackdropClick
					disableEscapeKeyDown
					open={open}
					maxWidth='md'
					classes={{ paper: classes.dialogPaper }}
					onClose={handleModalClose}
				>
					<AddExerciseFormikContainer closeModal={setOpen} data={modalData} />
				</Dialog>
			)}

			{deleteModal && modalData && (
				<Dialog
					disableBackdropClick
					disableEscapeKeyDown
					open={deleteModal}
					maxWidth='sm'
					classes={{ paper: classes.dialogPaper }}
					onClose={handleModalClose}
				>
					<DialogContent>
						<DialogContentText className='text-center'>
							ნამდვილად გსურთ კითხვის წაშლა?
						</DialogContentText>
						<DialogActions
							style={{
								marginTop: '50px',
								display: 'flex',
								justifyContent: 'center',
							}}
						>
							<Button
								type='button'
								size='large'
								color='primary'
								style={{
									paddingLeft: '40px',
									paddingRight: '40px',
									marginRight: '40px',
								}}
								onClick={() => setDeleteModal(false)}
							>
								არა
							</Button>

							<Button
								variant='contained'
								type='submit'
								size='large'
								style={{ paddingLeft: '40px', paddingRight: '40px' }}
								color='secondary'
							>
								კი
							</Button>
						</DialogActions>
						`
					</DialogContent>
				</Dialog>
			)}
		</AppBarComponnent>
	);
}

export default Editexecise;

const useStyles = makeStyles((theme) => ({
	Textarea: {
		padding: '18.5px 14px',
		font: 'inherit',
		minWidth: 0,
		height: '100px !important',
		width: '95%',
		background: 'none',
		boxSizing: 'content-box',
		borderRadius: '4px',
		border: '1px solid rgba(0, 0, 0, 0.23)',
		fontSize: '16px',
		resize: 'none',
	},
	dialogPaper: {
		padding: '1%',
		width: '100%',
	},
	input: {
		display: 'none',
	},

	MarginLeft: {
		marginRight: '10px',
	},
}));
