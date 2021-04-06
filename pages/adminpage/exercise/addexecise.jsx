import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Fab from '@material-ui/core/Fab';
import GraphicEqRoundedIcon from '@material-ui/icons/GraphicEqRounded';

import SelectComponent from '../../../components/adminPage/reusable/SelectComponent';
import TextFieldComponent from '../../../components/adminPage/reusable/TextFieldComponent';
import AppForm from '../../../components/client/forms/AppForm';
import AppBarComponnent from '../../../components/adminPage/header/AppBar';
import SubmitButton from '../../../components/adminPage/reusable/SubmitButton';
import ButtonComponent from '../../../components/adminPage/reusable/ButtonComponent';
import GenerateExerciseComponent from '../../../components/adminPage/exercise/GenerateExerciseComponent';
import AddNewQuestion from '../../../components/adminPage/exercise/AddNewQuestion';

function addexecise() {
	const classes = useStyles();

	const [index, setIndex] = useState('1');
	const [count, setcount] = useState(1);
	const [arrayItems, setArrayItems] = useState([1]);

	const [checked, setChecked] = useState(true);
	const [checkedId, setCheckedId] = useState(null);

	const [array, setarray] = useState([
		{
			id: 1,
			value: '1',
			label: '1',
		},
		{
			id: 2,
			value: '2',
			label: '2',
		},
		{
			id: 3,
			value: '3',
			label: '3',
		},
		{
			id: 4,
			value: '4',
			label: '4',
		},
		{
			id: 5,
			value: '5',
			label: '5',
		},
		{
			id: 6,
			value: '6',
			label: '6',
		},
	]);

	const [array2, setarray2] = useState([
		{
			id: 1,
			value: 'მორფოლოგია',
			label: 'მორფოლოგია',
		},
		{
			id: 2,
			value: 'სინტაქსი',
			label: 'სინტაქსი',
		},
	]);

	const validationSchema = Yup.object().shape({
		part: Yup.string().required('Fill out the field'),
		name: Yup.string(),
	});

	const initialValues = {
		part: 1,
		name: '',
		index: 1,
	};

	useEffect(() => {
		const arrayOfDigits = Array.from(String(index), Number);
		setArrayItems(arrayOfDigits);
	}, [index]);

	function onSubmit(data, action) {
		console.log(data);
	}

	const handleChange = (event) => {
		setChecked(event.target.checked);
		setCheckedId(parseInt(event.target.id));
	};

	return (
		<AppBarComponnent>
			<AppForm
				initialValues={initialValues}
				validateOnChange={true}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
			>
				<Typography variant='h5' component='h5' align='center' gutterBottom>
					სავარჯიშოს დამატება
				</Typography>

				<Grid container spacing={5} justify='center'>
					<Grid item xs={12} sm={12} md={6}>
						<div className='mb-30 mt-30'>
							<SelectComponent name='name' label='ნაწილი' options={array2} />
						</div>
						<div className='mb-30 mt-30'>
							<SelectComponent
								name='name'
								label='საკითხის არჩევა'
								options={array2}
							/>
						</div>

						<div className='flex align-items-center mb-30'>
							<span>შემაჯამებელი სავარჯიშო</span>
							<Checkbox
								checked={checked}
								color='primary'
								onChange={handleChange}
							/>
						</div>

						<div className='mb-30 mt-30'>
							<SelectComponent
								name='part'
								label='სავარჯიშოს ტიპი'
								options={array}
							/>
						</div>

						<div className='mb-30'>
							<TextFieldComponent
								placeholder='სავარჯიშოს სათაური'
								name='name'
							/>
						</div>

						<div className='mb-30'>
							<TextareaAutosize
								className={classes.Textarea}
								aria-label='empty textarea'
								placeholder='გრამატიკის წესები'
							/>

							<input
								accept='image/*'
								className={classes.input}
								id='contained-button-file'
								multiple
								type='file'
							/>
							<label htmlFor='contained-button-file'>
								<Fab component='span'>
									<GraphicEqRoundedIcon />
								</Fab>
							</label>
						</div>

						<div className='mb-30'>
							{arrayItems &&
								arrayItems.map((item) => (
									<div className='mb-10'>
										<TextFieldComponent
											placeholder={`youtube ის ლინკი ${item}`}
											name='name'
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
								className={classes.Textarea}
								aria-label='empty textarea'
								placeholder='სავარჯიშოს აღწერა'
							/>
							<ButtonComponent
								variant='contained'
								color='primary'
								title='ვიდეო ახსნა'
							/>
						</div>

						<GenerateExerciseComponent name='part' />

						<AddNewQuestion />

						<div className='flex space-center mt-70'>
							<SubmitButton
								title='სავარჯიშოს დამატება'
								size='large'
								color='primary'
								variant='contained'
							/>
						</div>
					</Grid>
				</Grid>
			</AppForm>
		</AppBarComponnent>
	);
}

export default addexecise;

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
}));
