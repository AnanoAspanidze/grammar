import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { exerciseService } from '../../../../services/exercise.service';
import ArrowIcon from '../../../../assets/images/icons/Arrow - Grey.svg';
import { Defaults } from '../../../../helpers/defaults';

function MultiTestExercise({
	question,
	numberOfQuestions,
	exerciseId,
	index,
	onNext,
	onPrev,
}) {
	const [loading, setLoading] = useState(false);
	const [definitionModal, setDefinitionModal] = useState(false);
	const [haveToChecked, setHaveToChecked] = useState(true);

	const [correctAnswerId, setCorrectAnswerId] = useState(null);
	const [iscorrect, setIsCorrect] = useState(null);
	const [selectedAnswer, setSelectedAnswer] = useState([]);

	const [questionData, setquestionData] = useState(null);

	useEffect(() => {
		if (question) {
			setquestionData(question);
			question.Answers.filter((q, i) => {
				if (q.IsCorrect) {
					setCorrectAnswerId(q.Id);
				}
			});
		}
	}, []);

	const selectQuestion = (name, id) => {
		if (haveToChecked) {
			if (selectedAnswer.includes(id)) {
				let it = selectedAnswer;
				let items = selectedAnswer.indexOf(id);
				if (items >= 0) {
					it.splice(items, 1);
				}
				setSelectedAnswer(it);
			} else {
				setSelectedAnswer([...selectedAnswer, id]);
			}
		}
	};

	const checkQuestion = () => {
		if (selectedAnswer) {
			setLoading(true);

			let data = {
				ExerciseId: exerciseId,
				QuestionId: question.Id,
				answersId: [selectedAnswer.id],
				AnswerText: '',
				CategoryId: 1,
				SubCategoryId: 4,
			};

			exerciseService
				.checkQuestion(data)
				.then((res) => {
					setHaveToChecked(false);
					setLoading(false);
					setDefinitionModal(true);

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

	return (
		<>
			<div className='spec-exer-head'>
				<p className='spec-exer-head-ex3'>
					{`სავარჯიშო # ${question.OrderNumber} - ${question.ExerciseTitle}`}
				</p>
				<button>
					<i className='fas fa-volume-up' />
					პროექტორის რეჟიმი
				</button>
			</div>

			<div className='spec-exer-questions'>
				<div dangerouslySetInnerHTML={{ __html: question.Text }} />
				<span className='exer-choose-cor-answer'>{question.Instruction}</span>
			</div>
			<div className='exer-answers-all'>
				<div className='row'>
					{questionData &&
						questionData.Answers.map((q, i) => (
							<div className='col-6' key={i}>
								<ButtonParent
									className='exer-answers-box'
									questionId={q.Id}
									selectedAnswer={selectedAnswer && selectedAnswer.id}
									correctAnswer={correctAnswerId}
									iscorrect={iscorrect}
								>
									<button id={q.Id}>
										<div className='squaredOne'>
											<input
												type='checkbox'
												id='squaredOne'
												value={`squaredOne${q.Id}`}
												checked={selectedAnswer.includes(q.Id)}
												onChange={() =>
													selectQuestion(`squaredOne${q.Id}`, q.Id)
												}
											/>
											<label htmlFor='squaredOne' className='squaredOne2' />
										</div>{' '}
										{q.Text}
									</button>
								</ButtonParent>
							</div>
						))}
				</div>
			</div>

			<div className='check-count-boxes'>
				<div className='special-exercises-return-button' onClick={onPrev}>
					<img src={ArrowIcon} alt='' />
				</div>

				<div className='ganmarteba'>
					{definitionModal && (
						<p onClick={() => Defaults.Definition.show()}>მაჩვენე განმარტება</p>
					)}
				</div>

				<p className='counted-boxes'>{`${index + 1} / ${numberOfQuestions}`}</p>

				{!haveToChecked ? (
					<div className='check-button'>
						<button onClick={onNext} className='next-exercise'>
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

	${({ questionId, selectedAnswer }) =>
		questionId === selectedAnswer &&
		`
		button {
			background: #EDF0EE;
			border: 2px solid #4B6858
		}
    `}

	${({ iscorrect, questionId, selectedAnswer }) =>
		iscorrect === false &&
		questionId === selectedAnswer &&
		`
		button {
		background: #FEF4F6;
		border: 2px solid #EB2347;
		}
    `}
	
	${({ iscorrect, correctAnswer, questionId }) =>
		iscorrect === false &&
		correctAnswer === questionId &&
		`
		button {
			background: #F4FAF7;
			border: 2px solid #239F61;
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
