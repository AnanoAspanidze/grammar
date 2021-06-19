import React, { useEffect, useState } from 'react';

import Header2 from '../../header/Header2';
import ExerciseLeftSidebar from '../ExerciseLeftSidebar';
import { exerciseService } from '../../../../services/exercise.service';

function TestExercise({ match }) {
	const [exercise, setExercise] = useState(null);

	useEffect(() => {
		exerciseService
			.getExerciseDetails(match.params.exerciseId)
			.then((res) => setExercise(res));
	}, []);

	return (
		<>
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
								<div className='spec-exer-fields'>
									<div className='spec-exer-all'>
										<div className='spec-exer-head'>
											<p className='spec-exer-head-ex3'>სავარჯიშო #3</p>
											<button>
												<i className='fas fa-volume-up' />
												პროექტორის რეჟიმი
											</button>
										</div>
										<div className='spec-exer-questions'>
											<p className='spec-ask-question'>
												რომელ ბრუნვაში დგას მოცემული ნაცვალსახელები:{' '}
												<span className='to-strong'>მათ, მას, ჩვენ, შენ?</span>
											</p>
											<span className='exer-choose-cor-answer'>
												მონიშნე სწორი პასუხი
											</span>
										</div>
										<div className='exer-answers-all'>
											<div className='row'>
												<div className='col-6'>
													<div className='exer-answers-box'>
														<button>ა) სახელობით ბრუნვაში</button>
													</div>
												</div>
												<div className='col-6'>
													<div className='exer-answers-box'>
														<button>ბ) ნათესაობით ბრუნვაში</button>
													</div>
												</div>
												<div className='col-6'>
													<div className='exer-answers-box '>
														<button>გ) მიცემით ბრუნვაში</button>
													</div>
												</div>
												<div className='col-6'>
													<div className='exer-answers-box'>
														<button>დ) წოდებით ბრუნვაში</button>
													</div>
												</div>
												{/* <div class="col-12 check-button">
                                  <button class="exer-check-button">შემოწმება</button>
                              </div> */}
											</div>
										</div>
										<div className='check-count-boxes'>
											<div className='special-exercises-return-button'>
												<img
													src='./assets/images/icons/Arrow - Grey.svg'
													alt=''
												/>
											</div>
											<a
												href='#popup15'
												onclick='navAppear15();'
												className='ganmarteba'
											>
												<p>მაჩვენე განმარტება</p>4
											</a>
											<p className='counted-boxes'>1/6</p>
											<div className='check-button'>
												<button className='exer-check-button'>შემოწმება</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</>
	);
}

export default TestExercise;
