import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
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
import GenerateExerciseComponent from '../../../components/admin/exercise/GenerateExerciseComponent';
import AddNewQuestion from '../../../components/admin/exercise/AddNewQuestion';
import { exerciseService } from '../../../services/exercise.service';
import { commonService } from '../../../services/common.service';
import { addExerciseValidationSchema } from '../../../helpers/schema';

function Addexecise({ drawerIsOpen }) {
	const classes = useStyles();
	let history = useHistory();

	const [parts, setParts] = useState([]);
	const [selectedPart, setselectedPart] = useState('');
	const [issues, setissues] = useState([]);

	const [index, setIndex] = useState('1');
	const [count, setcount] = useState(1);
	const [arrayItems, setArrayItems] = useState([1]);
	const [selectetdFile, setSelectedFile] = useState(null);
	const [fileBase64String, setFileBase64String] = useState('');

	const [exerciseTypes, setexerciseTypes] = useState(null);

	const initialValues = {
		Name: '',
		Description: '',
		category: '',
		SubCategoryId: '',
		TypeId: 1,
		OrderNumber: '',
		IsSummaryExercise: false,
		Name: '',
		VideoLinks: [],
		Instruction: '',
		AudioFile: {
			AudioFileData: '',
		},
		VideoLinks: [{ Id: 0, Name: '', Url: '' }],
		Questions: [],

		part: '1',
		index: 1,
	};

	useEffect(() => {
		const arrayOfDigits = Array.from(String(index), Number);
		setArrayItems(arrayOfDigits);
	}, [index]);

	useEffect(() => {
		commonService.getParts().then((res) => setParts(res));
		commonService.getEExerciseTypes().then((res) => setexerciseTypes(res));
	}, []);

	useEffect(() => {
		if (selectedPart) {
			commonService
				.selectedSubcategories(selectedPart)
				.then((res) => setissues(res));
		}
	}, [selectedPart]);

	useEffect(() => {
		if (selectetdFile) {
			encodeFileBase64(selectetdFile);
		}
	}, [selectetdFile]);

	const encodeFileBase64 = (file) => {
		var reader = new FileReader();
		if (file) {
			reader.readAsDataURL(file);
			reader.onload = () => {
				var Base64 = reader.result;
				setFileBase64String(Base64);
			};
			reader.onerror = (error) => {
				console.log('error: ', error);
			};
		}
	};

	function onSubmit(data, action) {
		let modifierAnswer = data.Questions.map((w) => {
			w.Answers.map((c) => delete c.id);
			return w;
		});

		let d = {
			Name: data.Name,
			OrderNumber: parseInt(data.OrderNumber),
			Description: data.Description,
			Instruction: data.Instruction,
			IsSummaryExercise: data.IsSummaryExercise,
			SubCategoryId: data.SubCategoryId,
			TypeId: data.TypeId,
			Questions: modifierAnswer,
			VideoLinks: data.VideoLinks,
		};

		exerciseService.createExercise(d).then((res) => {
			history.push('/admin/exercisespage');
		});
		action.setSubmitting(false);
	}

	return (
		<AppBarComponnent isOpen={drawerIsOpen}>
			<Formik
				initialValues={initialValues}
				validateOnChange={false}
				enableReinitialize={true}
				validationSchema={addExerciseValidationSchema}
				onSubmit={onSubmit}
			>
				{({
					values,
					errors,
					handleChange,
					setFieldValue,
					handleReset,
					handleSubmit,
					setErrors,
				}) => (
					<form onSubmit={handleSubmit}>
						<Typography variant='h5' component='h5' align='center' gutterBottom>
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
											setFieldValue('category', e);
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
											console.log('render.....');
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
										hasOnchange={true}
										onChange={(e) => {
											if (Object.keys(errors).length > 0) {
												setErrors({});
											}
											setFieldValue('TypeId', e);
										}}
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
											accept='audio/*'
											className={classes.input}
											id='contained-button-file'
											onChange={(e) => setSelectedFile(e.target.files[0])}
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
										{selectetdFile ? selectetdFile.name : 'აუდიოს ატვირთვა'}
									</div>
								</div>

								<div className='mb-30'>
									{arrayItems &&
										arrayItems.map((item) => (
											<div className='mb-10'>
												<TextFieldComponent
													placeholder={`youtube ის ლინკი ${item}`}
													name={`VideoLinks[${item - 1}].Url`}
													onChange={(e) =>
														setFieldValue(
															`VideoLinks[${item - 1}].Url`,
															e.target.value
														)
													}
												/>
											</div>
										))}

									<ButtonComponent
										onClick={() => {
											setcount(count + 1);
											setIndex((prev) => `${prev}${parseInt(count) + 1}`);
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

								<GenerateExerciseComponent name='TypeId' isEditPage={false} />

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
				)}
			</Formik>
		</AppBarComponnent>
	);
}

export default Addexecise;

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
	input: {
		display: 'none',
	},

	MarginLeft: {
		marginRight: '10px',
	},
}));
