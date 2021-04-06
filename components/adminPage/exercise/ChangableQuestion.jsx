import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

import TextFieldComponent from '../reusable/TextFieldComponent';

const DynamicComponentWithNoSSR = dynamic(() => import('react-quill'), {
	ssr: false,
});

function ChangableQuestion() {
	const [value, setValue] = useState('');

	return (
		<div>
			<DynamicComponentWithNoSSR
				theme='snow'
				value={value}
				onChange={setValue}
				placeholder='არასწორი ტექსტი'
				style={{ height: '200px', marginBottom: '70px' }}
			/>

			<DynamicComponentWithNoSSR
				theme='snow'
				value={value}
				onChange={setValue}
				placeholder='სწორი ტექსტი'
				style={{ height: '200px', marginBottom: '70px' }}
			/>

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

export default ChangableQuestion;
