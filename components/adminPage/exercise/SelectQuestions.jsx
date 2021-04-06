import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

import ExerciseCheckbox from './ExerciseCheckbox';
const DynamicComponentWithNoSSR = dynamic(() => import('react-quill'), {
	ssr: false,
});

function SelectQuestions() {
	const [value, setValue] = useState('');

	const [index, setIndex] = useState('12');
	const [count, setcount] = useState(2);
	const [arrayItems, setArrayItems] = useState([1, 2]);

	useEffect(() => {
		const arrayOfDigits = Array.from(String(index), Number);
		setArrayItems(arrayOfDigits);
	}, [index]);

	return (
		<div>
			<DynamicComponentWithNoSSR
				theme='snow'
				value={value}
				onChange={setValue}
				placeholder='კითხვა'
				style={{ height: '200px', marginBottom: '70px' }}
			/>

			<Fab
				component='span'
				onClick={() => {
					setcount(count + 1);
					setIndex((prev) => `${prev}${parseInt(count) + 1}`);
				}}
			>
				<AddIcon />
			</Fab>

			{arrayItems &&
				arrayItems.map((item) => (
					<div className='flex align-items-center mb-20 mt-30'>
						<ExerciseCheckbox
							placeholder='პასუხი'
							name='1'
							inputName='answer'
						/>
					</div>
				))}

			<DynamicComponentWithNoSSR
				theme='snow'
				value={value}
				onChange={setValue}
				placeholder='კომენტარი პასუხის სწორად გაცემის შემთხვევაში'
				style={{ height: '200px', marginBottom: '70px' }}
			/>

			<DynamicComponentWithNoSSR
				theme='snow'
				value={value}
				onChange={setValue}
				placeholder='კომენტარი პასუხის არასწორად გაცემის შემთხვევაში'
				style={{ height: '200px', marginBottom: '70px' }}
			/>
		</div>
	);
}

export default SelectQuestions;
