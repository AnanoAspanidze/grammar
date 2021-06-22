import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import '../assets/css/special-exercises3.css';
import '../assets/css/special-exercises3-result.css';
import Header2 from '../components/client/header/Header2';
// import ExerciseLeftSidebar from '../components/client/exerciises/ExerciseLeftSidebar';
import TestExercise from '../components/client/exerciises/types/TestExercise';
import { exerciseService } from '../services/exercise.service';
import MultiTestExercise from '../components/client/exerciises/types/MultiTestExercise';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

function ExercisePage({ match }) {
	let { exerciseId } = useParams();
	const history = useHistory();
	let query = useQuery();

	// const [exercise, setExercise] = useState(null);
	const [questionsData, setQuestionData] = useState(null);
	const [currentQuestion, setcurrentQuestion] = useState(1);
	const [currentQuestionIndex, setcurrentQuestionIndex] = useState(null);

	useEffect(() => {
		if (match.params.exerciseId) {
			exerciseService
				.getExerciseQuestions(match.params.exerciseId)
				.then((res) => {
					const currentQ = res.Questions.find((q, i) => {
						if (q.IsDone) {
							setcurrentQuestionIndex(i);
							history.push({ search: `step=i` });
							return q;
						}
					});
					setQuestionData(res);

					if (currentQ) {
						setcurrentQuestion(currentQ);
					} else {
						history.push({ search: `step=0` });
						setcurrentQuestion(res.Questions[0]);
						setcurrentQuestionIndex(0);
					}
				});

			// exerciseService
			// 	.getExerciseDetails(match.params.exerciseId)
			// 	.then((res) => setExercise(res));
		}
	}, [match.params.exerciseId]);

	const onNext = (i) => {
		history.push({ search: `step=${++i}` });
		setcurrentQuestionIndex(i++);

		// questionsData.Questions.map((q) => {
		// 	if (q.Id === currentQuestion.Id) {
		// 		return { ...q, IsDone: true };
		// 	}
		// });
	};

	const onPrev = (i) => {
		if (query.get('step') == 0) {
			history.push(`/exercisedetails/${exerciseId}`);
		} else {
			setcurrentQuestionIndex(i--);
			history.push({ search: `step=${--i}` });
		}
	};

	return (
		<div>
			<div className='variants-header'>
				<Header2 isExercisePage={true} />
			</div>

			<section className='adverb-content'>
				<div className='container-fluid'>
					<div className='row'>
						{/* <div className='col-3 adverb-exercises-content'>
							{exercise && <ExerciseLeftSidebar data={exercise} />}
						</div> */}

						<div className='col-9 p-0'>
							<div className='spec-exer-fields'>
								<div className='spec-exer-all'>
									{questionsData &&
										questionsData.Questions.map((q, i) => {
											if (i == currentQuestionIndex) {
												return (
													<MultiTestExercise
														key={i}
														question={q}
														index={i}
														numberOfQuestions={questionsData.QuestionsQuantity}
														router={match.params.exerciseId}
														onNext={() => onNext(i)}
														onPrev={() => onPrev(i)}
													/>
												);
											}
										})}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default ExercisePage;
