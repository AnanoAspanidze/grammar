import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { useFormikContext } from 'formik';

import FormHelperText from '@material-ui/core/FormHelperText';

function ChangableQuestion({ isEditPage, index }) {
	const { values, setFieldValue, errors, handleChange } = useFormikContext();

	return (
		<div>
			<div className='mb-30'>
				<ReactQuill
					disabled={isEditPage}
					theme='snow'
					readOnly={isEditPage}
					name={`Questions[${index}].Text`}
					value={values.Questions[index].Text}
					onChange={(e) => setFieldValue(`Questions[${index}].Text`, e)}
					placeholder='კითხვა *'
					style={{ height: '200px', marginBottom: '60px' }}
				/>
			</div>
			{errors.Questions && (
				<div className='mb-20'>
					<FormHelperText error={true} variant='standard'>
						{errors.Questions[0].Text}
					</FormHelperText>
				</div>
			)}

			<div className='mb-30'>
				<ReactQuill
					theme='snow'
					name={`Questions[${index}].Answers[${0}].Text`}
					value={values.Questions[index].Answers[0].Text}
					onChange={(e) =>
						setFieldValue(`Questions[${index}].Answers[0].Text`, e)
					}
					placeholder='სწორი ტექსტი'
					style={{ height: '200px', marginBottom: '60px' }}
				/>
			</div>

			{errors.Questions &&
				Object.keys(errors).length > 0 &&
				errors.Questions[index].Answers && (
					<FormHelperText error={true} variant='standard'>
						{errors.Questions[index].Answers[0].Text}
					</FormHelperText>
				)}

			<ReactQuill
				theme='snow'
				className='mt-80'
				name={`Questions[${index}].RightAnswerText`}
				value={values.Questions[index].RightAnswerText}
				onChange={(e) =>
					setFieldValue(`Questions[${index}].RightAnswerText`, e)
				}
				readOnly={isEditPage}
				placeholder='კომენტარი პასუხის სწორად გაცემის შემთხვევაში'
				style={{ height: '200px', marginBottom: '70px' }}
			/>

			<ReactQuill
				theme='snow'
				name={`Questions[${index}].WrongAnswerText`}
				value={values.Questions[index].WrongAnswerText}
				onChange={(e) =>
					setFieldValue(`Questions[${index}].WrongAnswerText`, e)
				}
				readOnly={isEditPage}
				placeholder='კომენტარი პასუხის არასწორად გაცემის შემთხვევაში'
				style={{ height: '200px', marginBottom: '70px' }}
			/>
		</div>
	);
}

export default ChangableQuestion;
