import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import '../assets/css/exercises.css';
import '../assets/css/responsive.css';
import ApppageHead from '../components/AppHead';
import { issueService } from '../services/issue.service';
import userContext from '../context/user/userContext';
import Header2 from '../components/client/header/Header2';
import playIcon from '../assets/images/exercises/Arrow - Right 2.svg';

function ExercisesPage() {
	const [exercises, setexercises] = useState(null);

	const { user, isAuthenticated, logOutUser } = useContext(userContext);

	useEffect(() => {
		issueService.getExercisesList().then((res) => setexercises(res));
	}, []);

	return (
		<>
			<ApppageHead />
			<Header2 />
			<section className='variants-content'>
				<div className='container-fluid'>
					<div className='row'>
						<div className='col-3 variants-user'>
							<div className='user-registred2'>
								{isAuthenticated ? (
									<div className='variants-user-content user-registred-yes2'>
										<p className='variants-user-title'>
											{user.Name} {user.Surname}
										</p>
										{/* <p className='variants-user-point'>
												<span> 56</span>
												/250 ქულა
											</p> */}
										<button className='variants-user-button'>
											ჩემი პროფილი
										</button>
									</div>
								) : (
									<div className='variants-user-content user-registred-no2'>
										<p className='variants-user-title2'>
											სავარჯიშოების გასაკეთებლად გაიარე ავტორიზაცია
										</p>
										<button className='variants-user-button-longin'>
											შესვლა
										</button>
										<button className='variants-user-button-regist'>
											რეგისტრაცია
										</button>
									</div>
								)}
							</div>

							<div className='variants-navbar'>
								<ul>
									<li className='variants-active'>
										<Link to='issues'>
											<i className='fas fa-bookmark' /> საკითხები
										</Link>
									</li>
									<li>
										<Link to='exercises'>
											<i className='fas fa-file-alt' /> სავარჯიშოები
										</Link>
									</li>
									<li>
										<Link to='/'>
											<i className='fas fa-chart-pie' /> სტატისტიკა
										</Link>
									</li>
									<li>
										<Link to='/'>
											<i className='fas fa-user' /> ჩემი პროფილი
										</Link>
									</li>
								</ul>
							</div>
							<div className='variants-need-help'>
								<a href='#'>გჭირდება დახმარება?</a>
							</div>
						</div>

						<div className='col-9 p-0'>
							<div className='variants-bg-fill'>
								<div className='variants-choose-fields exercises-choose-fields'>
									<div className='variants-fields-title'>
										<p>სავარჯიშოები</p>
									</div>
									<div className='switch-toggle switch-3 switch-candy'>
										<input id='on' name='state-d' type='radio' defaultChecked />
										<label htmlFor='on' onclick>
											ყველა
										</label>
										<input id='no' name='state-d' type='radio' />
										<label htmlFor='no' onclick>
											მორფოლოგია
										</label>
										<input id='off' name='state-d' type='radio' />
										<label htmlFor='off' onclick>
											სინტაქსი
										</label>
									</div>
								</div>

								<div className='all-exercises-all'>
									{exercises &&
										exercises.map((exercise, i) => (
											<div key={exercise.Id}>
												{exercise.Exercises.length > 0 && (
													<div className='exercises-grammar-fields'>
														<div className='all-variants-first all-exercises-first'>
															<div className='exercises-head-pr'>
																<p className='variants-issue-name'>
																	{exercise.Name}{' '}
																</p>
																<div className='c100 p56 center small'>
																	{/* <span>.</span> */}
																	<div className='slice'>
																		<div className='bar' />
																		<div className='fill' />
																	</div>
																</div>
																<span className='percentage-distance'>
																	{exercise.UserDoneExerciseAnswersQuantity}
																</span>
															</div>
															<span className='variants-issue-status exercises-issue-status'>
																{exercise.Category.Name}
															</span>
														</div>
														<div className='exercises-head-right'>
															<p>
																გაგრძელება
																<i className='fas fa-arrow-right' />
															</p>
														</div>
													</div>
												)}

												<div className='exercises-grammar'>
													<div className='exercises-grammar-box'>
														<div className='row'>
															{exercise.Exercises.map((ex, i) => (
																<div className='col-3' key={ex.Id}>
																	<div className='exercises-white-box'>
																		<div className='exercises-wb-pad'>
																			<p className='exercises-grammar-pagination'>
																				სავარჯიშო #{ex.OrderNumber}
																			</p>
																			<h4 className='exercises-grammar-title'>
																				{ex.Name}
																			</h4>
																			<div className='exercises-grammar-item'>
																				<span>8/10</span>
																				<Link to='exercises'>
																					<img
																						src={playIcon}
																						alt='arrow-right'
																					/>
																				</Link>
																			</div>
																		</div>
																	</div>
																</div>
															))}
														</div>
													</div>
												</div>
											</div>
										))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default ExercisesPage;
