import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { exerciseService } from '../../../../services/exercise.service';
import ArrowIcon from '../../../../assets/images/icons/Arrow - Grey.svg';
import { Defaults } from '../../../../helpers/defaults';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

function MultiTestExercise({
	question,
	numberOfQuestions,
	exerciseId,
	index,
	exId,
	DoneQuestion,
	IsDone,
}) {
	const history = useHistory();
	let query = useQuery();

	const [loading, setLoading] = useState(false);
	const [definitionModal, setDefinitionModal] = useState(false);
	const [haveToChecked, setHaveToChecked] = useState(true);

	const [correctAnswerId, setCorrectAnswerId] = useState('');
	const [iscorrect, setIsCorrect] = useState(null);
	const [selectedAnswer, setSelectedAnswer] = useState(true);
	const [explanation, setExplanation] = useState('');
	const [questionData, setquestionData] = useState(null);

	const [checkboxes, setCheckboxes] = useState(null);

	useEffect(() => {
		if (question) {
			setquestionData(question);
			question.Answers.map((q, i) => {
				if (q.IsCorrect) {
					setCorrectAnswerId((prev) => [...prev, q.Id]);
					return q;
				}

				return q;
			});
		}
	}, []);

	useEffect(() => {
		if (question) {
			const questionsArray = question.Answers.map((q, i) => {
				if (q.IsCorrect) {
					return { ...q, IsCorrect: false };
				}
				return q;
			});

			setCheckboxes(questionsArray);
		}
	}, []);

	useEffect(() => {
		if (IsDone && DoneQuestion) {
			setHaveToChecked(false);
			setDefinitionModal(true);

			if (DoneQuestion.IsDoneQuestionCorrect) {
				setCorrectAnswerId(DoneQuestion.DoneAnswerId);

				setIsCorrect(true);
			} else {
				const x = question.Answers.find((w) => w.IsCorrect === true);
				setIsCorrect(false);
			}
		}
	}, [DoneQuestion]);

	const selectQuestion = (e, id) => {
		if (haveToChecked) {
			const modifier = checkboxes.map((q) => {
				if (q.Id == id) {
					return { ...q, IsCorrect: e.checked };
				}
				return q;
			});

			setCheckboxes(modifier);
		}
	};

	const checkQuestion = () => {
		if (selectedAnswer) {
			setLoading(true);

			let array = [];

			checkboxes.filter((q) => {
				if (q.IsCorrect) {
					array.push(q.Id);
				}
			});

			let data = {
				ExerciseId: exerciseId,
				QuestionId: question.Id,
				answersId: array,
				AnswerText: '',
				CategoryId: 1,
				SubCategoryId: 4,
				TypeName: question.ExerciseType,
			};

			exerciseService
				.checkQuestion(data)
				.then((res) => {
					setHaveToChecked(false);
					setLoading(false);
					setDefinitionModal(true);
					setExplanation(res.AnswerResponse);

					if (res.IsCorrect) {
						setIsCorrect(true);
					} else {
						setIsCorrect(false);
					}
				})
				.catch((err) => {
					console.log(err);
					setLoading(false);
				});
		}
	};

	const onNext = (i) => {
		if (numberOfQuestions - 1 > i) {
			let routerNum = parseInt(query.get('step'));
			history.push({ search: `step=${++routerNum}` });
		} else {
			window.location.href = `/result?exerciseId=${exerciseId}&subcategoryId=${question.SubCategory.Id}`;
		}
	};

	const onPrev = (i) => {
		if (parseInt(query.get('step')) === 0) {
			history.push(`/exercisedetails/${exerciseId}`);
		} else {
			history.push({ search: `step=${--i}` });
		}
	};

	return (
		<>
			<div className='spec-exer-head'>
				<p className='spec-exer-head-ex3'>
					{`სავარჯიშო # ${exId} - ${question.ExerciseTitle}`}
				</p>
				<button>
					<i className='fas fa-volume-up' />
					პროექტორის რეჟიმი
				</button>
			</div>

			<div className='spec-exer-questions'>
				<p
					className='spec-ask-question'
					dangerouslySetInnerHTML={{ __html: question.Text }}
				/>
				<span className='exer-choose-cor-answer'>{question.Instruction}</span>
			</div>
			<div className='exer-answers-all'>
				<div className='row'>
					{checkboxes &&
						checkboxes.map((q, i) => (
							<div className='col-6' key={i}>
								<ButtonParent
									className='exer-answers-box'
									questionId={q.Id}
									questionIsCorrect={q.IsCorrect}
									correctAnswer={
										iscorrect &&
										correctAnswerId &&
										correctAnswerId.includes(q.Id)
									}
									iscorrect={iscorrect}
									greenColor={
										(iscorrect &&
											correctAnswerId &&
											correctAnswerId.includes(q.Id)) ||
										(iscorrect === false &&
											q.IsCorrect &&
											correctAnswerId &&
											correctAnswerId.includes(q.Id))
									}
									halpGreenColor={
										iscorrect === false &&
										q.IsCorrect === false &&
										correctAnswerId &&
										correctAnswerId.includes(q.Id)
									}
									redColor={
										iscorrect === false &&
										(q.IsCorrect === true || q.IsCorrect === false) &&
										correctAnswerId.includes(q.Id) === false
									}
								>
									<button id={q.Id}>
										<CheckboxWrapper>
											{IsDone ? (
												<input
													type='checkbox'
													checked={IsDone && correctAnswerId.includes(q.Id)}
													onChange={(e) => selectQuestion(e.target, q.Id)}
												/>
											) : (
												<input
													type='checkbox'
													onChange={(e) => selectQuestion(e.target, q.Id)}
												/>
											)}
										</CheckboxWrapper>

										{q.Text}
									</button>
								</ButtonParent>
							</div>
						))}
				</div>
			</div>

			<div className='check-count-boxes'>
				<div
					className='special-exercises-return-button'
					onClick={() => onPrev(index)}
				>
					<img src={ArrowIcon} alt='' />
				</div>

				<div className='ganmarteba'>
					{definitionModal &&
						explanation &&
						(iscorrect === true || iscorrect === false) && (
							<p
								onClick={() =>
									Defaults.Definition.show(
										explanation || DoneQuestion.DoneAnswerExplanation
									)
								}
							>
								მაჩვენე განმარტება
							</p>
						)}
				</div>

				<p className='counted-boxes'>{`${index + 1} / ${numberOfQuestions}`}</p>

				{!haveToChecked ? (
					<div className='check-button'>
						<button onClick={() => onNext(index)} className='next-exercise'>
							შემდეგი
						</button>
					</div>
				) : (
					<div className='check-button' onClick={checkQuestion}>
						<button className='exer-check-button' disabled={loading}>
							შემოწმება
						</button>
					</div>
				)}
			</div>
		</>
	);
}

export default MultiTestExercise;

const ButtonParent = styled.div`
	.squaredOne {
		margin-right: 5px;
	}

	${({ questionId, greenColor, correctAnswer, selectedAnswer }) =>
		greenColor &&
		`
		button {
			background: #EDF0EE;
			border: 2px solid #4B6858
		}
    `}

	${({ iscorrect, redColor, questionId, correctAnswer, selectedAnswer }) =>
		redColor &&
		`
		button {
		background: #FEF4F6;
		border: 2px solid #EB2347;
		}
    `}
	
	${({ iscorrect, halpGreenColor, correctAnswer, questionId }) =>
		halpGreenColor &&
		`
		button {
			background: #F4FAF7;
			border: transparent;
		}
    `}
	
	${({ iscorrect, selectedAnswer, questionId }) =>
		iscorrect === true &&
		questionId === selectedAnswer &&
		`
		button {
			background: #F4FAF7;
			border: 2px solid #239F61;
		}
    `}
`;

const CheckboxWrapper = styled.label`
	display: inline-flex;
	cursor: pointer;
	position: relative;
	margin-right: 10px;
	input {
		height: 16px;
		width: 16px;
		-webkit-appearance: none;
		-moz-appearance: none;
		-o-appearance: none;
		appearance: none;
		background: transparent;
		border: 2px solid #4b6858;
		border-radius: 6px;
		outline: none;
		transition-duration: 0.3s;
		cursor: pointer;
		position: relative;
		margin-left: 0;
		transition: all 0.3s;

		&:checked::before {
			content: '';
			-ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=0)';
			filter: alpha(opacity=0);
			position: absolute;
			width: 8px;
			height: 8px;
			background: #4b6858;
			border-radius: 2px;
			top: 2px;
			left: 2px;
		}
	}
`;
