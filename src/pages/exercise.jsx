import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components/macro';
// import '../assets/css/special-exercises3.css';
// import '../assets/css/special-exercises-dropdown.css';

import Header2 from '../components/client/header/Header2';
import { exerciseService } from '../services/exercise.service';
import ExerciseLeftSidebar from '../components/client/exerciises/ExerciseLeftSidebar';
import TestExercise from '../components/client/exerciises/types/TestExercise';
import MultiTestExercise from '../components/client/exerciises/types/MultiTestExercise';
import SelectedExercise from '../components/client/exerciises/types/SelectedExercise';
import MistakesExercise from '../components/client/exerciises/types/MistakesExercise';
import TagsExercise from '../components/client/exerciises/types/TagsExercise';
import MissedWordExercise from '../components/client/exerciises/types/MissedWordExercise';
import CompletedExercise from '../components/client/exerciises/CompletedExercise';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

function ExercisePage({ match }) {
	let query = useQuery();

	let x;

	if (parseInt(query.get('step'))) {
		x = parseInt(query.get('step'));
	}

	const [questionsData, setQuestionData] = useState(null);
	const [exercise, setExercise] = useState(null);
	const [currentQuestionIndex, setcurrentQuestionIndex] = useState(0);

	const stepId = query.get('step');

	useEffect(() => {
		if (match.params.exerciseId) {
			exerciseService
				.getExerciseQuestions(match.params.exerciseId)
				.then((res) => setQuestionData(res));

			exerciseService
				.getExerciseDetails(match.params.exerciseId)
				.then((res) => setExercise(res));
		}
	}, [x, match.params.exerciseId]);

	useEffect(() => {
		if (stepId) {
			setcurrentQuestionIndex(parseInt(stepId));
		}
	}, [stepId]);

	return (
		<div>
			<div className='variants-header'>
				<Header2 isExercisePage={true} />
			</div>

			<section className='adverb-content'>
				<div className='container-fluid'>
					<div className='row'>
						<div className='col-3 adverb-exercises-content'>
							{exercise && (
								<ExerciseLeftSidebar
									match={match.params.exerciseId}
									data={exercise}
								/>
							)}
						</div>

						<div className='col-9 p-0'>
							<div className='spec-exer-fields'>
								<div className='spec-exer-all'>
									{questionsData &&
										questionsData.Questions.map((q, i) => {
											if (i == currentQuestionIndex) {
												if (
													(q.ExerciseType === 'ტესტები' && q.IsAnswerSingle) ||
													q.ExerciseType === 'ჭეშმარიტია/მცდარია'
												) {
													return (
														<TestExercise
															key={i}
															question={q}
															index={i}
															IsDone={q.IsDone}
															DoneQuestion={q.DoneQuestion && q.DoneQuestion}
															exerciseId={parseInt(match.params.exerciseId)}
															numberOfQuestions={
																questionsData.QuestionsQuantity
															}
															router={match.params.exerciseId}
														/>
													);
												} else if (
													q.ExerciseType === 'ტესტები' &&
													q.IsAnswerSingle === false
												) {
													return (
														<MultiTestExercise
															key={i}
															question={q}
															index={i}
															IsDone={q.IsDone}
															DoneQuestion={q.DoneQuestion && q.DoneQuestion}
															exerciseId={parseInt(match.params.exerciseId)}
															numberOfQuestions={
																questionsData.QuestionsQuantity
															}
															router={match.params.exerciseId}
														/>
													);
												} else if (
													q.ExerciseType ===
													'ჩამოსაშლელი და ასარჩევი სავარაუდო პასუხებიდან'
												) {
													return (
														<SelectedExercise
															key={i}
															question={q}
															index={i}
															IsDone={q.IsDone}
															DoneQuestion={q.DoneQuestion && q.DoneQuestion}
															exerciseId={parseInt(match.params.exerciseId)}
															numberOfQuestions={
																questionsData.QuestionsQuantity
															}
															router={match.params.exerciseId}
														/>
													);
												} else if (q.ExerciseType === 'ჩასწორება') {
													return (
														<MistakesExercise
															key={i}
															question={q}
															index={i}
															IsDone={q.IsDone}
															DoneQuestion={q.DoneQuestion && q.DoneQuestion}
															exerciseId={parseInt(match.params.exerciseId)}
															numberOfQuestions={
																questionsData.QuestionsQuantity
															}
															router={match.params.exerciseId}
														/>
													);
												} else if (q.ExerciseType === 'ჩასაწერი') {
													return (
														<MissedWordExercise
															key={i}
															question={q}
															index={i}
															IsDone={q.IsDone}
															DoneQuestion={q.DoneQuestion && q.DoneQuestion}
															exerciseId={parseInt(match.params.exerciseId)}
															numberOfQuestions={
																questionsData.QuestionsQuantity
															}
															router={match.params.exerciseId}
														/>
													);
												} else if (
													q.ExerciseType ===
													'წინადადებაში სიტყვის ან სიტყვების არჩევა'
												) {
													return (
														<TagsExercise
															key={i}
															question={q}
															index={i}
															IsDone={q.IsDone}
															DoneQuestion={q.DoneQuestion && q.DoneQuestion}
															exerciseId={parseInt(match.params.exerciseId)}
															numberOfQuestions={
																questionsData.QuestionsQuantity
															}
															router={match.params.exerciseId}
														/>
													);
												}
											}
										})}

									{questionsData &&
										questionsData.QuestionsQuantity < stepId && (
											<CompletedExercise />
										)}
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
