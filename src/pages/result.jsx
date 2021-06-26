import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import Header2 from '../components/client/header/Header2';
import { exerciseService } from '../services/exercise.service';
import ExerciseLeftSidebar from '../components/client/exerciises/ExerciseLeftSidebar';
import CompletedExercise from '../components/client/exerciises/CompletedExercise';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

function CompletedPage({ match }) {
	let query = useQuery();

    const [exercise, setExercise] = useState(null);
	const [exerciseData, setExerciseData] = useState(null);
    let x = parseInt(query.get('exerciseId'));
    let y = parseInt(query.get('subcategoryId'));



	useEffect(() => {
		if (x && y) {
			exerciseService
				.getexerciseresult(x, y)
				.then((res) => setExerciseData(res));

			exerciseService
				.getExerciseDetails(x)
				.then((res) => setExercise(res));
		}
	}, []);


	return (
		<div>
			<div className='variants-header'>
				<Header2 isExercisePage={true} />
			</div>

			<section className='adverb-content'>
				<div className='container-fluid'>
					<div className='row'>
						<div className='col-3 adverb-exercises-content'>
							{exercise && x && (
								<ExerciseLeftSidebar
									match={x}
									data={exercise}
								/>
							)}
						</div>

						<div className='col-9 p-0'>
							<div className='spec-exer-fields'>
								<div className='spec-exer-all'>
                                    {exerciseData ? <CompletedExercise data={exerciseData} /> : null}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default CompletedPage;
