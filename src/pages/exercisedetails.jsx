import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import ApppageHead from '../components/AppHead';
import Header2 from '../components/client/header/Header2';
import VideoImg from '../assets/images/adverb-exercise-1/video-img.svg';
import playIcon from '../assets/images/icons/Arrow - Right 2.svg';
import { exerciseService } from '../services/exercise.service';
import ExerciseLeftSidebar from '../components/client/exerciises/ExerciseLeftSidebar';

function ExerciseDetailsPage({ match }) {
	const [exercise, setExercise] = useState(null);

	useEffect(() => {
		exerciseService
			.getExerciseDetails(match.params.exerciseId)
			.then((res) => setExercise(res));
	}, []);

	return (
		<>
			<ApppageHead />
			<div>
				<div className='variants-header'>
					<Header2 isExercisePage={true} />
				</div>

				<section className='adverb-content'>
					<div className='container-fluid'>
						<div className='row'>
							<div className='col-3 adverb-exercises-content'>
								{exercise && <ExerciseLeftSidebar data={exercise} />}
							</div>

							<div className='col-9 p-0'>
								<div className='adverb-fields'>
									{exercise && (
										<>
											<div className='variants-choose-fields adverb-choose-fields'>
												<div className='adverb-fields-description'>
													<p className='adverb-fields-text'>
														{exercise.SubCategory.Name}
													</p>
													<p className='adverb-fields-title'>{exercise.Name}</p>
												</div>
												<div className='start-exercises'>
													<a href='#'>
														<button
															className='flex align-items-center'
															onClick={() =>
																(window.location.href = '/exercise/105')
															}
														>
															<img
																src={playIcon}
																style={{ marginRight: '10px' }}
																alt='arrow-right'
															/>
															სავარჯიშოს დაწყება
														</button>
													</a>
												</div>
											</div>

											<div className='row adverb-row'>
												<div className='col-8 adv-row-first'>
													<div className='adverb-first-sec-all'>
														{exercise.Instruction}
													</div>
												</div>
												<div className='col-3'>
													<div className='video-content'>
														<img src={VideoImg} alt='video' />
													</div>
													<div className='video-content'>
														<img src={VideoImg} alt='video' />
													</div>
												</div>
											</div>
										</>
									)}
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</>
	);
}

export default ExerciseDetailsPage;
