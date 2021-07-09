import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import ApppageHead from '../components/AppHead';
import Header2 from '../components/client/header/Header2';
import VideoImg from '../assets/images/adverb-exercise-1/video-img.svg';
import playIcon from '../assets/images/icons/Arrow - Right 2.svg';
import { exerciseService } from '../services/exercise.service';
import ExerciseLeftSidebar from '../components/client/exerciises/ExerciseLeftSidebar';

function ExerciseDetailsPage({ match }) {
	const [exercise, setExercise] = useState(null);
	let { exerciseId } = useParams();

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
													<Link to={`/exercise/${exerciseId}?step=0`}>
														<button className='flex align-items-center'>
															<img
																src={playIcon}
																style={{ marginRight: '10px' }}
																alt='arrow-right'
															/>
															სავარჯიშოს დაწყება
														</button>
													</Link>
												</div>
											</div>

											<div className='row adverb-row'>
												<div class='col-8 adv-row-first'>
													<div class='adverb-first-sec-all'>
														<div class='adverb-main-text'>
															<p
																class='exercise-rules-p'
																dangerouslySetInnerHTML={{
																	__html: exercise.Description,
																}}
															/>
														</div>
													</div>
												</div>

												<div className='col-3'>
													<div class='video-content'>
														{exercise &&
															exercise.VideoLinks.map((y) => (
																<iframe
																	width='560'
																	height='315'
																	src={`https://www.youtube.com/embed/${y.Url}`}
																	title='YouTube video player'
																	frameborder='0'
																	allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
																	allowfullscreen
																></iframe>
															))}
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
