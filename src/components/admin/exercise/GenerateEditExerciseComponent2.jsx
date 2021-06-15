import React, { useState, useEffect } from 'react';
import { useFormikContext } from 'formik';

import EditTestQuestion from '../../../components/admin/editexercise/EditTestQuestion';

import TestQuestion from '../../../components/admin/exercise/TestQuestion';
import SelectQuestions from '../../../components/admin/exercise/SelectQuestions';
import WritableQuestions from '../../../components/admin/exercise/WritableQuestions';
import ChangableQuestion from '../../../components/admin/exercise/ChangableQuestion';
import TagsQuestions from '../../../components/admin/exercise/TagsQuestions';
import TrueOrFalse from '../../../components/admin/exercise/TrueOrFalse';
import { arr1, arr3 } from './data';
import { exerciseService } from '../../../services/exercise.service';

function GenerateEditExerciseComponent2({
	name,
	isEditPage,
	data,
	closeModal,
	onEditQuestion,
	setQuestionIndex,
	onSuccessSnackbar,
	onFailSnackbar,
}) {
	const [index, setIndex] = useState('1');
	const [count, setcount] = useState(1);
	const [arrayItems, setArrayItems] = useState([1]);

	const { values, setFieldValue } = useFormikContext();

	useEffect(() => {
		setFieldValue('Id', data.Id);
		setFieldValue('Name', data.Name);
		setFieldValue('Description', data.Description);
		setFieldValue('Instruction', data.Instruction);
		setFieldValue('OrderNumber', data.OrderNumber);
		setFieldValue('IsSummaryExercise', data.IsSummaryExercise);
		setFieldValue('Questions', data.Questions);
		setFieldValue('VideoLinks', data.VideoLinks);
		setFieldValue('CategoryId', data.CategoryId);
		setFieldValue('SubCategoryId', data.SubCategoryId);
		setFieldValue('TypeId', data.TypeId);
	}, []);

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

	// useEffect(() => {
	// 	if (values.TypeId === 1 || values.TypeId === 2) {
	// 		setFieldValue('Questions', arr1);
	// 	}

	// 	if (values.TypeId === 3 || values.TypeId === 4 || values.TypeId === 5) {
	// 		setFieldValue('Questions', arr3);
	// 	}
	// }, [values.TypeId]);

	if (values.Questions.length > 0) {
		return (
			<>
				<div>
					{values[name] === 1 &&
						values.Questions.map((item, i) => (
							<EditTestQuestion
								isEditPage={isEditPage}
								index={i}
								data={item}
								key={item.Id}
								closeModal={closeModal}
								onSuccessSnackbar={onSuccessSnackbar}
								onFailSnackbar={onFailSnackbar}
								onEditQuestion={(bool, i, index) =>
									onEditQuestion(bool, i, index)
								}
							/>
						))}

					{values[name] === 2 &&
						values.Questions.map((item, i) => (
							<SelectQuestions
								key={i}
								isEditPage={isEditPage}
								index={i}
								data={item}
								key={item.Id}
								closeModal={closeModal}
								onSuccessSnackbar={onSuccessSnackbar}
								onFailSnackbar={onFailSnackbar}
								onEditQuestion={(bool, i, index) =>
									onEditQuestion(bool, i, index)
								}
							/>
						))}

					{values[name] === 3 &&
						values.Questions.map((item, i) => (
							<WritableQuestions
								key={i}
								isEditPage={isEditPage}
								index={i}
								data={item}
								key={item.Id}
								closeModal={closeModal}
								onSuccessSnackbar={onSuccessSnackbar}
								onFailSnackbar={onFailSnackbar}
								onEditQuestion={(bool, i, index) =>
									onEditQuestion(bool, i, index)
								}
							/>
						))}

					{values[name] === 4 &&
						values.Questions.map((item, i) => (
							<ChangableQuestion
								key={i}
								isEditPage={isEditPage}
								index={i}
								data={item}
								key={item.Id}
								closeModal={closeModal}
								onSuccessSnackbar={onSuccessSnackbar}
								onFailSnackbar={onFailSnackbar}
								onEditQuestion={(bool, i, index) =>
									onEditQuestion(bool, i, index)
								}
							/>
						))}

					{values[name] === 5 &&
						values.Questions.map((item, i) => (
							<TagsQuestions
								key={i}
								isEditPage={isEditPage}
								index={i}
								data={item}
								key={item.Id}
								closeModal={closeModal}
								onSuccessSnackbar={onSuccessSnackbar}
								onFailSnackbar={onFailSnackbar}
								onEditQuestion={(bool, i, index) =>
									onEditQuestion(bool, i, index)
								}
							/>
						))}

					{values[name] === 6 &&
						values.Questions.map((item, i) => (
							<TrueOrFalse
								key={i}
								isEditPage={isEditPage}
								index={i}
								data={item}
								key={item.Id}
								closeModal={closeModal}
								onSuccessSnackbar={onSuccessSnackbar}
								onFailSnackbar={onFailSnackbar}
								onEditQuestion={(bool, i, index) =>
									onEditQuestion(bool, i, index)
								}
							/>
						))}
				</div>
			</>
		);
	} else {
		return null;
	}
}

export default GenerateEditExerciseComponent2;
