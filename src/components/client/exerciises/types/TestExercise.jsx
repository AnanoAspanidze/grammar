import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { exerciseService } from '../../../../services/exercise.service';
import ArrowIcon from '../../../../assets/images/icons/Arrow - Grey.svg';
import { Defaults } from '../../../../helpers/defaults';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

function TestExercise({
	question,
	numberOfQuestions,
	exerciseId,
	DoneQuestion,
	IsDone,
	index,
}) {
	const history = useHistory();
	let query = useQuery();

	const [loading, setLoading] = useState(false);
	const [definitionModal, setDefinitionModal] = useState(false);
	const [haveToChecked, setHaveToChecked] = useState(true);

	const [correctAnswerId, setCorrectAnswerId] = useState(null);
	const [iscorrect, setIsCorrect] = useState(null);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
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

	useEffect(() => {
		if (IsDone && DoneQuestion) {
			setHaveToChecked(false);
			setDefinitionModal(true);

			if (DoneQuestion.IsDoneQuestionCorrect) {
				setCorrectAnswerId({
					id: DoneQuestion.DoneAnswerId[0],
					isCorrect: true,
				});

				setSelectedAnswer({
					id: DoneQuestion.DoneAnswerId[0],
					isCorrect: true,
				});

				setIsCorrect(true);
			} else {
				const x = question.Answers.find((w) => w.IsCorrect === true);

				setCorrectAnswerId({
					id: x.Id,
					isCorrect: false,
				});

				setSelectedAnswer({
					id: DoneQuestion.DoneAnswerId[0],
					isCorrect: false,
				});

				setIsCorrect(false);
			}
		}
	}, [DoneQuestion]);

	const selectQuestion = (id, isCorrect) => {
		if (haveToChecked) {
			setSelectedAnswer({ id, isCorrect });
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
				CategoryId: question.Category.Id,
				SubCategoryId: question.SubCategory.Id,
			};

			exerciseService
				.checkQuestion(data)
				.then((res) => {
					setHaveToChecked(false);
					setDefinitionModal(true);
					setLoading(false);

					if (res.IsCorrect) {
						setIsCorrect(true);
					} else {
						const x = question.Answers.find((w) => w.IsCorrect === true);
						setCorrectAnswerId({ ...x, id: x.Id });
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
		console.log(i);
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
									<button
										id={q.Id}
										onClick={() => selectQuestion(q.Id, q.IsCorrect)}
									>
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

				{/* <div className='ganmarteba'>
					{definitionModal && (
						<p onClick={() => Defaults.Definition.show()}>მაჩვენე განმარტება</p>
					)}
				</div> */}

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

export default TestExercise;

const ButtonParent = styled.div`
	${({ questionId, selectedAnswer }) =>
		questionId == selectedAnswer &&
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
		correctAnswer.id === questionId &&
		`
		button {
			background: #F4FAF7 !important;
			border: 2px solid #239F61 !important;
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
