import React from 'react';
import { useFormikContext } from 'formik';

import TestQuestion from '../../../components/adminPage/exercise/TestQuestion';
import SelectQuestions from '../../../components/adminPage/exercise/SelectQuestions';
import WritableQuestions from '../../../components/adminPage/exercise/WritableQuestions';
import ChangableQuestion from '../../../components/adminPage/exercise/ChangableQuestion';
import TagsQuestions from '../../../components/adminPage/exercise/TagsQuestions';
import TrueOrFalse from '../../../components/adminPage/exercise/TrueOrFalse';

function GenerateExerciseComponent({ name }) {
	const { values, errors, setFieldError, setFieldValue } = useFormikContext();

	return (
		<div>
			{values[name] === '1' ? (
				<TestQuestion />
			) : values[name] === '2' ? (
				<SelectQuestions />
			) : values[name] === '3' ? (
				<WritableQuestions />
			) : values[name] === '4' ? (
				<ChangableQuestion />
			) : values[name] === '5' ? (
				<TagsQuestions />
			) : values[name] === '6' ? (
				<TrueOrFalse />
			) : null}
		</div>
	);
}

export default GenerateExerciseComponent;
