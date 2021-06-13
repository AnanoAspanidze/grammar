import React from 'react';
import { Link } from 'react-router-dom';

import '../assets/css/exercises.css';
import '../assets/css/responsive.css';
import ArrowIcon from '../assets/images/exercises/Arrow - Right 2.png';
import ApppageHead from '../components/AppHead';

function ExercisesPage() {
	return (
		<>
			<ApppageHead />

			<section className='variants-content'>
				<div className='container-fluid'>
					<div className='row'>
						<div className='col-3 variants-user'>
							<div className='user-registred2'>
								<div className='variants-user-content user-registred-yes2'>
									<p className='variants-user-title'>თამთა კერესელიძე</p>
									<p className='variants-user-point'>
										<span> 56</span>/250 ქულა
									</p>
									<button className='variants-user-button'>ჩემი პროფილი</button>
								</div>
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
									<div className='exercises-grammar'>
										<div className='exercises-grammar-fields'>
											<div className='all-variants-first all-exercises-first'>
												<div className='exercises-head-pr'>
													<p className='variants-issue-name'>
														არსებითი სახელი{' '}
													</p>
													<div className='c100 p56 center small'>
														{/* <span>.</span> */}
														<div className='slice'>
															<div className='bar' />
															<div className='fill' />
														</div>
													</div>
													<span className='percentage-distance'>56%</span>
												</div>
												<span className='variants-issue-status exercises-issue-status'>
													სინტაქსი
												</span>
											</div>
											<div className='exercises-head-right'>
												<p>
													გაგრძელება
													<i className='fas fa-arrow-right' />
												</p>
											</div>
										</div>
										<div className='exercises-grammar-box'>
											<div className='row'>
												<div className='col-3 '>
													<div className='exercises-white-box'>
														<div className='exercises-wb-pad'>
															<p className='exercises-grammar-pagination'>
																სავარჯიშო #1
															</p>
															<h4 className='exercises-grammar-title'>
																ზმნიზედები შინაარსის მიხედვით
															</h4>
															<div className='exercises-grammar-item'>
																<span>8/10</span>
																<a href='#'></a>
															</div>
														</div>
													</div>
												</div>
												<div className='col-3'>
													<div className='exercises-white-box'>
														<div className='exercises-wb-pad'>
															<p className='exercises-grammar-pagination'>
																სავარჯიშო #2
															</p>
															<h4 className='exercises-grammar-title'>
																ნაცვალსახელთა ბრუნება{' '}
															</h4>
															<div className='exercises-grammar-item'>
																<span>10/10</span>
																<Link to='/'>
																	<img src={ArrowIcon} alt='arrow-right' />
																</Link>
															</div>
														</div>
													</div>
												</div>
												<div className='col-3'>
													<div className='exercises-white-box'>
														<div className='exercises-wb-pad'>
															<p className='exercises-grammar-pagination'>
																სავარჯიშო #3
															</p>
															<h4 className='exercises-grammar-title'>
																ზმნის პირიანობა და პირის როგორობა
															</h4>
															<div className='exercises-grammar-item'>
																<span>6/7</span>
																<Link to='/'>
																	<img src={ArrowIcon} alt='arrow-right' />
																</Link>
															</div>
														</div>
													</div>
												</div>
												<div className='col-3'>
													<div className='exercises-white-box'>
														<div className='exercises-wb-pad'>
															<p className='exercises-grammar-pagination'>
																სავარჯიშო #4
															</p>
															<h4 className='exercises-grammar-title'>
																უკვეცელი უცხოური არსებითი სახელები
															</h4>
															<div className='exercises-grammar-item'>
																<span>სავარჯიშოს დაწყება</span>
																<Link to='/'>
																	<img src={ArrowIcon} alt='arrow-right' />
																</Link>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className='exercises-grammar'>
										<div className='exercises-grammar-fields'>
											<div className='all-variants-first all-exercises-first'>
												<div className='exercises-head-pr'>
													<p className='variants-issue-name'>
														ზედსართავი სახელი{' '}
													</p>
													<div className='c100 p12 center small'>
														{/* <span>.</span> */}
														<div className='slice'>
															<div className='bar' />
															<div className='fill' />
														</div>
													</div>
													<span className='percentage-distance'>12%</span>
												</div>
												<span className='variants-issue-status exercises-issue-status'>
													სინტაქსი
												</span>
											</div>
											<div className='exercises-head-right'>
												<p>
													დაწყება
													<i className='fas fa-arrow-right' />
												</p>
											</div>
										</div>
										<div className='exercises-grammar-box'>
											<div className='row'>
												<div className='col-3 '>
													<div className='exercises-white-box'>
														<div className='exercises-wb-pad'>
															<p className='exercises-grammar-pagination'>
																სავარჯიშო #1
															</p>
															<h4 className='exercises-grammar-title'>
																კუმშვადი და უკუმშველი სახელები
															</h4>
															<div className='exercises-grammar-item'>
																<span>სავარჯიშოს დაწყება</span>
																<Link to='/'>
																	<img src={ArrowIcon} alt='arrow-right' />
																</Link>
															</div>
														</div>
													</div>
												</div>
												<div className='col-3'>
													<div className='exercises-white-box'>
														<div className='exercises-wb-pad'>
															<p className='exercises-grammar-pagination'>
																სავარჯიშო #2
															</p>
															<h4 className='exercises-grammar-title'>
																თანდებულიანი სიტყვების მართლწერა
															</h4>
															<div className='exercises-grammar-item'>
																<span>სავარჯიშოს დაწყება</span>
																<Link to='/'>
																	<img src={ArrowIcon} alt='arrow-right' />
																</Link>
															</div>
														</div>
													</div>
												</div>
												<div className='col-3'>
													<div className='exercises-white-box'>
														<div className='exercises-wb-pad'>
															<p className='exercises-grammar-pagination'>
																სავარჯიშო #3
															</p>
															<h4 className='exercises-grammar-title'>
																მაერთებელი კავშირი
															</h4>
															<div className='exercises-grammar-item'>
																<span>სავარჯიშოს დაწყება</span>
																<Link to='/'>
																	<img src={ArrowIcon} alt='arrow-right' />
																</Link>
															</div>
														</div>
													</div>
												</div>
												<div className='col-3'>
													<div className='exercises-white-box'>
														<div className='exercises-wb-pad exercises-wb-pad-more'>
															<p className='exercises-number-up'>+4</p>
															<p className='exercises-work'>სავარჯიშო</p>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className='exercises-grammar'>
										<div className='exercises-grammar-fields'>
											<div className='all-variants-first all-exercises-first'>
												<div className='exercises-head-pr'>
													<p className='variants-issue-name'>ზმნიზედა </p>
													<div className='c100 p12 center small'>
														{/* <span>.</span> */}
														<div className='slice'>
															<div className='bar' />
															<div className='fill' />
														</div>
													</div>
													<span className='percentage-distance'>12%</span>
												</div>
												<span className='variants-issue-status exercises-issue-status'>
													სინტაქსი
												</span>
											</div>
											<div className='exercises-head-right'>
												<p>
													დაწყება
													<i className='fas fa-arrow-right' />
												</p>
											</div>
										</div>
										<div className='exercises-grammar-box'>
											<div className='row'>
												<div className='col-3 '>
													<div className='exercises-white-box'>
														<div className='exercises-wb-pad'>
															<p className='exercises-grammar-pagination'>
																სავარჯიშო #1
															</p>
															<h4 className='exercises-grammar-title'>
																კუმშვადი და უკუმშველი სახელები
															</h4>
															<div className='exercises-grammar-item'>
																<span>სავარჯიშოს დაწყება</span>
																<Link to='/'>
																	<img src={ArrowIcon} alt='arrow-right' />
																</Link>
															</div>
														</div>
													</div>
												</div>
												<div className='col-3'>
													<div className='exercises-white-box'>
														<div className='exercises-wb-pad'>
															<p className='exercises-grammar-pagination'>
																სავარჯიშო #2
															</p>
															<h4 className='exercises-grammar-title'>
																თანდებულიანი სიტყვების მართლწერა
															</h4>
															<div className='exercises-grammar-item'>
																<span>სავარჯიშოს დაწყება</span>
																<Link to='/'>
																	<img src={ArrowIcon} alt='arrow-right' />
																</Link>
															</div>
														</div>
													</div>
												</div>
												<div className='col-3'>
													<div className='exercises-white-box'>
														<div className='exercises-wb-pad'>
															<p className='exercises-grammar-pagination'>
																სავარჯიშო #3
															</p>
															<h4 className='exercises-grammar-title'>
																მაერთებელი კავშირი
															</h4>
															<div className='exercises-grammar-item'>
																<span>სავარჯიშოს დაწყება</span>
																<Link to='/'>
																	<img src={ArrowIcon} alt='arrow-right' />
																</Link>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
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
