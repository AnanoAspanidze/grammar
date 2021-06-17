import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import ApppageHead from '../components/AppHead';
import Header2 from '../components/client/header/Header2';
import VideoImg from '../assets/images/adverb-exercise-1/video-img.svg';
import playIcon from '../assets/images/icons/Arrow - Right 2.svg';
import { exerciseService } from '../services/exercise.service';

function ExercisePage({ match }) {
	const [exercise, setExercise] = useState(null);

	useEffect(() => {
		exerciseService
			.getExerciseDetails(match.params.exerciseId)
			.then((res) => setExercise(res));
	}, []);

	return (
		<>
			<ApppageHead />
			<Helmet>
				<link rel='stylesheet' href='/variants.css' />
				<link rel='stylesheet' href='/exercises.css' />
				<link rel='stylesheet' href='/adverb-exercise-1.css' />
				<link rel='stylesheet' href='/special-exercises3.css' />
			</Helmet>

			<div>
				<div className='variants-header'>
					<Header2 isExercisePage={true} />
				</div>

				<section className='adverb-content'>
					<div className='container-fluid'>
						<div className='row'>
							<div className='col-3 adverb-exercises-content'>
								{exercise &&
									exercise.SubExercises.map((ex) => (
										<div className='exercises-grammar-box' key={ex.Id}>
											<div
												className='exercises-grey-box'
												style={{
													border: `${
														exercise.Id == match.params.exerciseId
															? '2.5px solid #4B6858'
															: 'initial'
													}`,
												}}
											>
												<div className='exercises-wb-pad'>
													<p className='exercises-grammar-pagination'>
														სავარჯიშო #{ex.OrderNumber}
													</p>
													<h4 className='exercises-grammar-title'>{ex.Name}</h4>
													<div className='exercises-adverb-item'>
														<span>
															{ex.UserAnsweredQuestionsQuantity}/
															{ex.QuestionsQuantity}
														</span>
														<Link to={`/exercise`}>
															<img src={playIcon} alt='arrow-right' />
														</Link>
													</div>
												</div>
											</div>
										</div>
									))}
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
														<button className='flex align-items-center'>
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
													<div className='adverb-first-sec-all'>
														<div className='subt-read'>
															<h5 className='subtitle'>ქვესათაურის ტექსტი</h5>
															{/* <button><i class="fas fa-volume-up"></i>წაკითხვა</button> */}
														</div>
														<div className='adverb-main-text'>
															<p>
																ლორემ იპსუმ მოსამართლის დარდითა ბუნების
																შემოვიდნენ შევიტყვე ქრისტიანობაზე. ხაჯალზე ფუჭ
																სტანისლავსკის, ვეძახდი საოპერაციო აკნატუნებდნენ,
																ბუნების წიგნს კედლებმოხატული დაიმციროს ვიტანდი,
																სითბო აივნების შემოვიდნენ სიმულაციას.
																გააკონტროლეთ გრეგორი ბუნებრივად, ჩაკირულმა
																ძველად თერთმეტმა ციკლების ლოქოს გვახრჩობს
																დაკოჭლებული ტლინკები სოციოფობია ბეგიაშვილებთან,
																აუელავდა მისურელი.
															</p>
															<p>
																ლორემ იპსუმ მოსამართლის დარდითა ბუნების
																შემოვიდნენ შევიტყვე ქრისტიანობაზე. ხაჯალზე ფუჭ
																სტანისლავსკის, ვეძახდი საოპერაციო აკნატუნებდნენ,
																ბუნების წიგნს კედლებმოხატული დაიმციროს ვიტანდი
															</p>
														</div>
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

export default ExercisePage;
