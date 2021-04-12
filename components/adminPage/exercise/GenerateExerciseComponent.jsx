import React, { useState, useEffect } from 'react';
import { useFormikContext } from 'formik';

import TestQuestion from '../../../components/adminPage/exercise/TestQuestion';
import SelectQuestions from '../../../components/adminPage/exercise/SelectQuestions';
import WritableQuestions from '../../../components/adminPage/exercise/WritableQuestions';
import ChangableQuestion from '../../../components/adminPage/exercise/ChangableQuestion';
import TagsQuestions from '../../../components/adminPage/exercise/TagsQuestions';
import TrueOrFalse from '../../../components/adminPage/exercise/TrueOrFalse';
import DragEndDropQuestion from './DragEndDropQuestion';

function GenerateExerciseComponent({ name }) {
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
				{values[name] == '1' &&
					arrayItems &&
					arrayItems.map((item) => <TestQuestion />)}
				{values[name] == '2' &&
					arrayItems &&
					arrayItems.map((item) => <SelectQuestions />)}
				{values[name] == '3' &&
					arrayItems &&
					arrayItems.map((item) => <WritableQuestions />)}
				{values[name] == '4' &&
					arrayItems &&
					arrayItems.map((item) => <ChangableQuestion />)}
				{values[name] == '5' &&
					arrayItems &&
					arrayItems.map((item) => <TagsQuestions />)}
				{values[name] == '6' &&
					arrayItems &&
					arrayItems.map((item) => <TrueOrFalse />)}
				{values[name] == '7' || values[name] == '8' ? (
					<DragEndDropQuestion />
				) : null}
			</div>
		</>
	);
}

export default GenerateExerciseComponent;
