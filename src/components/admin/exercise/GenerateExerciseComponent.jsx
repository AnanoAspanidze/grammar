import React, { useState, useEffect } from 'react';
import { useFormikContext } from 'formik';

import TestQuestion from '../../../components/admin/exercise/TestQuestion';
import SelectQuestions from '../../../components/admin/exercise/SelectQuestions';
import WritableQuestions from '../../../components/admin/exercise/WritableQuestions';
import ChangableQuestion from '../../../components/admin/exercise/ChangableQuestion';
import TagsQuestions from '../../../components/admin/exercise/TagsQuestions';
import TrueOrFalse from '../../../components/admin/exercise/TrueOrFalse';
import { arr1, arr3 } from './data';

function GenerateExerciseComponent({ name, isEditPage }) {
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
			setIndex(1);
		}
	}, [count]);

	useEffect(() => {
		const arrayOfDigits = Array.from(String(index), Number);
		setArrayItems(arrayOfDigits);
	}, [index]);

	useEffect(() => {
		if (values.TypeId === 1 || values.TypeId === 2) {
			setFieldValue('Questions', arr1);
		}

		if (values.TypeId === 3 || values.TypeId === 4 || values.TypeId === 5) {
			setFieldValue('Questions', arr3);
		}
	}, [values.TypeId]);

	if (values.Questions.length > 0) {
		return (
			<>
				<div>
					{values[name] === 1 &&
						arrayItems &&
						arrayItems.map((item, i) => (
							<TestQuestion isEditPage={isEditPage} index={i} key={item} />
						))}
					{values[name] === 2 &&
						arrayItems &&
						arrayItems.map((item, i) => (
							<SelectQuestions isEditPage={isEditPage} index={i} key={item} />
						))}
					{values[name] === 3 &&
						arrayItems &&
						arrayItems.map((item, i) => (
							<WritableQuestions isEditPage={isEditPage} index={i} key={item} />
						))}
					{values[name] === 4 &&
						arrayItems &&
						arrayItems.map((item, i) => (
							<ChangableQuestion isEditPage={isEditPage} index={i} key={item} />
						))}
					{values[name] === 5 &&
						arrayItems &&
						arrayItems.map((item, i) => (
							<TagsQuestions isEditPage={isEditPage} index={i} key={item} />
						))}
					{values[name] === 6 &&
						arrayItems &&
						arrayItems.map((item, i) => (
							<TrueOrFalse isEditPage={isEditPage} index={i} key={item} />
						))}
				</div>
			</>
		);
	} else {
		return null;
	}
}

export default GenerateExerciseComponent;
