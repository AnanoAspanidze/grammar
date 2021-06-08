import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
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
import SnackbarComponent from '../../../components/admin/reusable/SnackbarComponent';
import AddNewQuestion from '../../../components/admin/exercise/AddNewQuestion';
import { exerciseService } from '../../../services/exercise.service';
import { commonService } from '../../../services/common.service';
import { addExerciseValidationSchema2 } from '../../../helpers/schema';
import GenerateEditExerciseComponent2 from '../../../components/admin/exercise/GenerateEditExerciseComponent2';
import AddExerciseFormikContainer from '../../../components/admin/exercise/AddExerciseFormikContainer';

function Editexecise({ drawerIsOpen, match }) {
	const classes = useStyles();

	const [state, setState] = useState({
		open: false,
		vertical: 'top',
		horizontal: 'center',
		severity: '',
		error: null,
	});

	const [data, setdata] = useState(null);
	const [isFull, setIsfull] = useState(false);
	const [parts, setParts] = useState([]);
	const [selectedPart, setselectedPart] = useState();
	const [issues, setissues] = useState([]);

	const [index, setIndex] = useState('1');
	const [questionIndex, setQuestionIndex] = useState();
	const [count, setcount] = useState(1);
	const [arrayItems, setArrayItems] = useState([1]);

	const [exerciseTypes, setexerciseTypes] = useState(null);

	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);

	const [deleteModal, setDeleteModal] = useState(false);
	const [modalData, setModalData] = useState(null);
	const [subcategory, setSubcategory] = useState(false);

	const [selectedUser, setSelectedUser] = useState({
		userId: '',
		userRoleId: '',
	});

	const initialValues = {
		part: '1',
		index: 1,
		Id: 0,
		Name: '',
		Description: '',
		Instruction: '',
		OrderNumber: 0,
		IsSummaryExercise: false,
		Questions: [],
		VideoLinks: [],
		CategoryId: '',
		SubCategoryId: 0,
		TypeId: 0,
	};

	const handleClick = (newState, message) => {
		setState({ open: true, error: message, ...newState });
	};

	const handleClose = () => {
		setState({ ...state, open: false });
	};

	useEffect(() => {
		const arrayOfDigits = Array.from(String(index), Number);
		setArrayItems(arrayOfDigits);
	}, [index]);

	useEffect(() => {
		commonService.getParts().then((res) => setParts(res));
		commonService.getEExerciseTypes().then((res) => {
			setexerciseTypes(res);
			setIsfull(true);
		});
		exerciseService
			.exercisedetails(match.params.exerciseId)
			.then((res) => setdata(res));
	}, []);

	const handleModalClose = () => {
		setOpen(false);
		setSelectedUser(null);
	};

	const deleteQuestion = () => {
		setLoading(true);
		exerciseService
			.deleteQuestion(deleteModal)
			.then((res) => {
				handleClick(
					{ vertical: 'bottom', horizontal: 'center', severity: 'success' },
					res.Message
				);

				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
				handleClick(
					{ vertical: 'bottom', horizontal: 'center', severity: 'error' },
					err.Message
				);
			});
	};

	function onSubmit(data, action) {
		let newObj = data;
		delete newObj.index;
		delete newObj.part;

		exerciseService
			.editExercise(newObj)
			.then((res) => {
				handleClick(
					{ vertical: 'bottom', horizontal: 'center', severity: 'success' },
					res.Message
				);
			})
			.catch((err) => {
				handleClick(
					{ vertical: 'bottom', horizontal: 'center', severity: 'success' },
					err
				);
			});

		action.setSubmitting(false);
	}

	useEffect(() => {
		if (subcategory) {
			commonService
				.selectedSubcategories(subcategory)
				.then((res) => setissues(res));
		}
	}, [initialValues.CategoryId, subcategory, selectedPart]);

	if (data) {
		return (
			<AppBarComponnent isOpen={drawerIsOpen}>
				<Formik
					initialValues={initialValues}
					enableReinitialize={true}
					validateOnChange={false}
					validationSchema={addExerciseValidationSchema2}
					onSubmit={onSubmit}
				>
					{({
						values,
						errors,
						handleChange,
						setFieldValue,
						handleSubmit,
						isSubmitting,
					}) => {
						if (!subcategory) {
							setSubcategory(values.SubCategoryId);
						}

						if (isFull) {
							return (
								<>
									<form onSubmit={handleSubmit}>
										<Typography
											variant='h5'
											component='h5'
											align='center'
											gutterBottom
										>
											სავარჯიშოს რედაქტირება
										</Typography>

										<Grid container spacing={5} justify='center'>
											<Grid item xs={12} sm={12} md={8}>
												<div className='mb-30 mt-30'>
													<SelectComponent
														name='CategoryId'
														label='ნაწილი *'
														text='Name'
														value={`${values.CategoryId}`}
														hasOnchange={true}
														onChange={(e) => {
															setselectedPart(e);
															setFieldValue('SubCategoryId', '');
															setFieldValue('CategoryId', e);
														}}
														options={parts}
													/>
												</div>

												<div className='mb-30 mt-30'>
													<SelectComponent
														name='SubCategoryId'
														label='საკითხის არჩევა *'
														text='Name'
														value={`${values.subcategory}`}
														hasOnchange={true}
														onChange={(e) => {
															setselectedPart(e);
															handleChange('SubCategoryId');
														}}
														options={issues}
													/>
												</div>

												<div className='flex align-items-center mb-30'>
													<span>შემაჯამებელი სავარჯიშო</span>
													<Checkbox
														checked={
															values.IsSummaryExercise
																? values.IsSummaryExercise
																: false
														}
														color='primary'
														onChange={(e) => {
															let parsedValue = JSON.parse(
																values.IsSummaryExercise
															);
															console.log(parsedValue);
															setFieldValue('IsSummaryExercise', !parsedValue);
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
														value={values.Name ? values.Name : ''}
														onChange={handleChange}
													/>
												</div>

												<div className='mb-30'>
													<TextareaAutosize
														name='Description'
														className={classes.Textarea}
														value={values.Description}
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
													{values.VideoLinks.map((item, i) => (
														<div className='mb-10' key={i}>
															<TextFieldComponent
																placeholder={`youtube ის ლინკი ${i + 1}`}
																name={`VideoLinks[${i}].Url`}
																value={values['VideoLinks'][i].Url}
																onChange={(e) =>
																	setFieldValue(
																		`VideoLinks[${i}].Url`,
																		e.target.value
																	)
																}
															/>
														</div>
													))}

													<ButtonComponent
														onClick={() => {
															setcount(count + 1);
															setIndex(
																(prev) => `${prev}${parseInt(count) + 1}`
															);
															setFieldValue('VideoLinks', [
																...values.VideoLinks,
																{ Id: 0, Name: '', Url: '' },
															]);
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
														value={values.Instruction}
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

												<GenerateEditExerciseComponent2
													name='TypeId'
													isEditPage={true}
													value={values}
													data={data}
													onFailSnackbar={(message) =>
														handleClick(
															{
																vertical: 'bottom',
																horizontal: 'center',
																severity: 'error',
															},
															message
														)
													}
													onSuccessSnackbar={(message) => {
														handleClick(
															{
																vertical: 'bottom',
																horizontal: 'center',
																severity: 'success',
															},
															message
														);
													}}
													onEditQuestion={(bool, i, index) => {
														setOpen(bool);
														setModalData(i);
														setQuestionIndex(index);
													}}
												/>

												<div className='flex space-center mt-70 mt-30'>
													<SubmitButton
														title='სავარჯიშოს რედაქტირება'
														size='large'
														color='primary'
														variant='contained'
													/>
												</div>
											</Grid>
										</Grid>
									</form>

									{modalData && open && (
										<Dialog
											disableBackdropClick
											disableEscapeKeyDown
											open={open}
											maxWidth='md'
											classes={{ paper: classes.dialogPaper }}
											onClose={handleModalClose}
										>
											<AddExerciseFormikContainer
												modalIndex={questionIndex}
												closeModal={setOpen}
												data={modalData}
												onChangeParetFormikQuestionn={(d) => {
													const x = values.Questions.map((w) => {
														if (d.Id === w.Id) {
															return d;
														}
													});

													setFieldValue('Questions', x);
												}}
											/>
										</Dialog>
									)}
								</>
							);
						} else {
							return null;
						}
					}}
				</Formik>

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
									disabled={loading}
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
									onClick={deleteQuestion}
								>
									კი
								</Button>
							</DialogActions>
							`
						</DialogContent>
					</Dialog>
				)}

				<SnackbarComponent
					open={state.open}
					message={state.error}
					severity={state.severity}
					handleClose={handleClose}
				/>
			</AppBarComponnent>
		);
	} else {
		return null;
	}
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
