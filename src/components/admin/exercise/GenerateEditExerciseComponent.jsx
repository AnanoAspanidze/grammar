import React, { useState, useEffect } from 'react';
import { useFormikContext } from 'formik';

import TestQuestion from '../../../components/admin/exercise/TestQuestion';
import SelectQuestions from '../../../components/admin/exercise/SelectQuestions';
import WritableQuestions from '../../../components/admin/exercise/WritableQuestions';
import ChangableQuestion from '../../../components/admin/exercise/ChangableQuestion';
import TagsQuestions from '../../../components/admin/exercise/TagsQuestions';
import TrueOrFalse from '../../../components/admin/exercise/TrueOrFalse';

function GenerateEditExerciseComponent({
	name,
	value,
	isEditPage,
	setDeleteQuestion,
	closeModal,
	onClick,
}) {
	const [index, setIndex] = useState('1');
	const [count, setcount] = useState(1);
	const [arrayItems, setArrayItems] = useState([1]);

	const { values, setFieldValue } = useFormikContext();

	useEffect(() => {
		setFieldValue('index', 1);
	}, [values.part]);

	useEffect(() => {
		setcount(values.index);
	}, [values.index]);

	useEffect(() => {
		if (count > 1) {
			setIndex((prev) => `${prev}${parseInt(count)}`);
		}

		if (count === 1) {
			setIndex('1');
		}
	}, [count]);

	useEffect(() => {
		const arrayOfDigits = Array.from(String(index), Number);
		setArrayItems(arrayOfDigits);
	}, [index]);

	return (
		<>
			<div>
				{values[name] === 1 &&
					arrayItems &&
					arrayItems.map((item, i) => (
						<TestQuestion
							data={values.Questions[i]}
							key={i}
							isEditPage={isEditPage}
							onClick={onClick}
							setDeleteQuestion={setDeleteQuestion}
							closeModal={closeModal}
						/>
					))}
				{values[name] === 2 &&
					arrayItems &&
					arrayItems.map((item) => (
						<SelectQuestions isEditPage={isEditPage} key={item} />
					))}
				{values[name] === 3 &&
					arrayItems &&
					arrayItems.map((item) => <WritableQuestions key={item} />)}
				{values[name] === 4 &&
					arrayItems &&
					arrayItems.map((item) => <ChangableQuestion key={item} />)}
				{values[name] === 5 &&
					arrayItems &&
					arrayItems.map((item) => <TagsQuestions key={item} />)}
				{values[name] === 6 &&
					arrayItems &&
					arrayItems.map((item) => <TrueOrFalse key={item} />)}
			</div>
		</>
	);
}

export default GenerateEditExerciseComponent;
