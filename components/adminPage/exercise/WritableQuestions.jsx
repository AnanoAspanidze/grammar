import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

import TextFieldComponent from '../reusable/TextFieldComponent';

const DynamicComponentWithNoSSR = dynamic(() => import('react-quill'), {
	ssr: false,
});

function WritableQuestions() {
	const [value, setValue] = useState('');

	return (
		<div>
			<DynamicComponentWithNoSSR
				theme='snow'
				value={value}
				onChange={setValue}
				placeholder='კითხვა'
				style={{ height: '200px', marginBottom: '70px' }}
			/>

			<div className='flex align-items-center mb-20 mt-30'>
				<TextFieldComponent placeholder='სწორი პასუხი' name='correct' />
			</div>

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

export default WritableQuestions;
