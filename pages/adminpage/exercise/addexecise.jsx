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
import { getCookie } from '../../../helpers/cookie';

function addexecise({ drawerIsOpen }) {
	const classes = useStyles();

	const [index, setIndex] = useState('1');
	const [count, setcount] = useState(1);
	const [arrayItems, setArrayItems] = useState([1]);

	const [checked, setChecked] = useState(false);
	const [checkedId, setCheckedId] = useState(null);

	const [exerciseTypes, setexerciseTypes] = useState([
		{
			id: 1,
			value: '1',
			label: 'ტესტი',
		},
		{
			id: 2,
			value: '2',
			label: 'ჩამოსაშლელი და ასარჩევი სავარაუდო პასუხებიდან',
		},
		{
			id: 3,
			value: '3',
			label: 'ჩასაწერი',
		},
		{
			id: 4,
			value: '4',
			label: 'ჩასწორება',
		},
		{
			id: 5,
			value: '5',
			label: 'წინადადებაში სიტყვის ან სიტყვების არჩევა',
		},
		{
			id: 6,
			value: '6',
			label: 'ჭეშმარიტია/მცდარია',
		},
	]);

	const [Part, setPart] = useState([
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
		<AppBarComponnent isOpen={drawerIsOpen}>
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
					<Grid item xs={12} sm={12} md={8}>
						<div className='mb-30 mt-30'>
							<SelectComponent name='name' label='ნაწილი' options={Part} />
						</div>
						<div className='mb-30 mt-30'>
							<SelectComponent
								name='name'
								label='საკითხის არჩევა'
								options={Part}
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
								options={exerciseTypes}
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
						</div>

						<AddNewQuestion />

						<div className='mt-30 mb-50'>
							<ButtonComponent
								size='large'
								variant='contained'
								color='secondary'
								title='კითხვების დამატების ვიდეო ახსნა'
							/>
						</div>

						<GenerateExerciseComponent name='part' />

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

	MarginLeft: {
		marginRight: '10px',
	},
}));

export async function getServerSideProps(ctx) {
	let cookie = '';

	if (getCookie('Drawer', ctx.req)) {
		cookie = getCookie('Drawer', ctx.req);
	} else {
		cookie = 'true';
	}

	return {
		props: { drawerIsOpen: cookie },
	};
}
