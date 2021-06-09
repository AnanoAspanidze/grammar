import React, { useContext } from 'react';

import { Link } from 'react-router-dom';
import '../assets/css/variants.css';
// import '../assets/css/sign-in.css';
import '../assets/css/buttons.css';
import '../assets/css/inputs.css';
import userContext from '../context/user/userContext';

function IssuesPage() {
	const { user } = useContext(userContext);

	return (
		<>
			<div>
				<div className='variants-header'>
					<nav className='navbar navbar-expand-md navbar-light'>
						<div className='container container-variants'>
							<a className='navbar-brand'>
								<img
									className='hide3'
									src='./assets/images/icons/logo.svg'
									alt='logo'
								/>
								<img
									className='appear3'
									src='./assets/images/icons/logo-414.svg'
									alt=''
								/>
							</a>
							<div className='navbar-icons'>
								<a className='login appear'>
									<img src='./assets/images/icons/login.svg' alt='' />
								</a>
								<a href='#popup5' onclick='navAppear();'>
									<button
										className='navbar-toggler'
										type='button'
										data-bs-toggle='collapse'
										data-bs-target='#navb  arsExample04'
										aria-controls='navbarsExample04'
										aria-expanded='false'
										aria-label='Toggle navigation'
									>
										<span className='navbar-toggler-icon'>
											<img src='./assets/images/icons/burger-icon.svg' alt='' />
										</span>
									</button>
								</a>
							</div>
							<div className='col-9 navbar-content'>
								<div className='header-variants-input-search'>
									<input
										type='search'
										name='search'
										placeholder='მოძებნე საკითხი ან სავარჯიშო'
									/>
								</div>
								<div className='col-4 user-registred'>
									<div className='header-variants-item user-registred-yes'>
										<div className='col-9 header-variants-input-user'>
											<div className='header-variants-input-user-text'>
												<p>თკ</p>
											</div>
											<div className='header-variants-input-user-fields'>
												<p className='variants-user-name'>თამთა კერესელიძე</p>
												<span className='variants-user-status'>მოსწავლე</span>
											</div>
										</div>

										{/* <div className='header-variants-input-user-fields'>
											<p className='variants-user-name'>
												{user.Name}
												{'  '}
												{user.family_name}
											</p>
											<span className='variants-user-status'>{user.role}</span>
										</div> */}
										<div className='header-variants-login-icon'>
											<a href='#'>
												<img
													src='./assets/images/icons/Logout-variants.svg'
													alt='Logout-variants'
												/>
											</a>
										</div>
									</div>
									<div className='header-variants-item user-registred-no'>
										<div className='col-9 header-variants-input-user'>
											<a href='#' className='header-variants-regist'>
												რეგისტრაცია
											</a>
											<a href='#' className='header-variants-login'>
												შესვლა
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</nav>
				</div>
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
										<button className='variants-user-button'>
											ჩემი პროფილი
										</button>
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
											<a href='variants.html'>
												<i className='fas fa-bookmark' /> საკითხები
											</a>
										</li>
										<li>
											<a href='exercises.html'>
												<i className='fas fa-file-alt' /> სავარჯიშოები
											</a>
										</li>
										<li>
											<a href='#'>
												<i className='fas fa-chart-pie' /> სტატისტიკა
											</a>
										</li>
										<li>
											<a href='#'>
												<i className='fas fa-user' /> ჩემი პროფილი
											</a>
										</li>
									</ul>
								</div>
								<div className='variants-need-help'>
									<a href='#' target='_blank'>
										გჭირდება დახმარება?
									</a>
								</div>
							</div>
							<div className='col-9 p-0'>
								<div className='variants-bg-fill'>
									<div className='variants-choose-fields'>
										<div className='variants-fields-title'>
											<p>საკითხები</p>
										</div>
										<div className='switch-toggle switch-3 switch-candy'>
											<input
												id='on'
												name='state-d'
												type='radio'
												defaultChecked
											/>
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
									<div className='all-variants-all'>
										<div className='all-variants-one'>
											<div className='all-variants-distance'>
												<div className='all-variants-first'>
													<p className='variants-issue-name'>არსებითი სახელი</p>
													<span className='variants-issue-status'>
														სინტაქსი
													</span>
												</div>
												<div className='all-variants-second'>
													<img
														className='variants-file'
														src='./assets/images/icons/variants-file.svg'
														alt='variants-file'
													/>
													<div className='exercises-left'>
														<p className='number-of-exercises'>9 სავარჯიშო</p>
														<div className='percentage-of-exercise'>
															{/* <img src="./assets/images/icons/variants-radio.svg" alt=""> */}
															{/* <svg viewBox="0 0 14 14">
                                              
                                              <path
                                                d="M7 1
                                                  a 6 6 0 0 1 0 12
                                                  a 6 6 0 0 1 0 -12"
                                                fill="none"
                                                stroke="#444";
                                                stroke-width="1";
                                                stroke-dasharray="56, 100"
                                              />
                                             
                                            </svg> */}
															<div className='c100 p56 center small'>
																{/* <span>.</span> */}
																<div className='slice'>
																	<div className='bar' />
																	<div className='fill' />
																</div>
															</div>
															<span className='percentage-distance'>56%</span>
														</div>
													</div>
												</div>
												<div className='all-variants-third'>
													<button className='open-this-variant'>
														საკითხის გახსნა
													</button>
												</div>
											</div>
										</div>
										<div className='all-variants-one'>
											<div className='all-variants-distance'>
												<div className='all-variants-first'>
													<p className='variants-issue-name'>რიცხვითი სახელი</p>
													<span className='variants-issue-status'>
														სინტაქსი
													</span>
												</div>
												<div className='all-variants-second'>
													<img
														className='variants-file'
														src='./assets/images/icons/variants-file.svg'
														alt='variants-file'
													/>
													<div className='exercises-left'>
														<p className='number-of-exercises'>9 სავარჯიშო</p>
														<div className='percentage-of-exercise'>
															{/* <img src="./assets/images/icons/variants-radio.svg" alt=""> */}
															<div className='c100 p56 center small'>
																{/* <span>.</span> */}
																<div className='slice'>
																	<div className='bar' />
																	<div className='fill' />
																</div>
															</div>
															<span className='percentage-distance'>56%</span>
														</div>
													</div>
												</div>
												<div className='all-variants-third'>
													<button className='open-this-variant'>
														საკითხის გახსნა
													</button>
												</div>
											</div>
										</div>
										<div className='all-variants-one'>
											<div className='all-variants-distance'>
												<div className='all-variants-first'>
													<p className='variants-issue-name'>ნაცვალსახელი</p>
													<span className='variants-issue-status'>
														სინტაქსი
													</span>
												</div>
												<div className='all-variants-second'>
													<img
														className='variants-file'
														src='./assets/images/icons/variants-file.svg'
														alt='variants-file'
													/>
													<div className='exercises-left'>
														<p className='number-of-exercises'>9 სავარჯიშო</p>
														<div className='percentage-of-exercise'>
															{/* <img src="./assets/images/icons/variants-radio.svg" alt=""> */}
															<div className='c100 p56 center small'>
																{/* <span>.</span> */}
																<div className='slice'>
																	<div className='bar' />
																	<div className='fill' />
																</div>
															</div>
															<span className='percentage-distance'>56%</span>
														</div>
													</div>
												</div>
												<div className='all-variants-third'>
													<button className='open-this-variant'>
														საკითხის გახსნა
													</button>
												</div>
											</div>
										</div>
										<div className='all-variants-one'>
											<div className='all-variants-distance'>
												<div className='all-variants-first'>
													<p className='variants-issue-name'>
														ზმნა - პირი და რიცხვი
													</p>
													<span className='variants-issue-status'>
														მორფოლოგია
													</span>
												</div>
												<div className='all-variants-second'>
													<img
														className='variants-file'
														src='./assets/images/icons/variants-file.svg'
														alt='variants-file'
													/>
													<div className='exercises-left'>
														<p className='number-of-exercises'>9 სავარჯიშო</p>
														<div className='percentage-of-exercise'>
															{/* <img src="./assets/images/icons/variants-radio.svg" alt=""> */}
															<span className='percentage-distance'>
																0 შესრულებული
															</span>
														</div>
													</div>
												</div>
												<div className='all-variants-third'>
													<button className='open-this-variant'>
														საკითხის გახსნა
													</button>
												</div>
											</div>
										</div>
										<div className='all-variants-one'>
											<div className='all-variants-distance'>
												<div className='all-variants-first'>
													<p className='variants-issue-name'>
														ზმნა - თავისებური ზმნები
													</p>
													<span className='variants-issue-status'>
														სინტაქსი
													</span>
												</div>
												<div className='all-variants-second'>
													<img
														className='variants-file'
														src='./assets/images/icons/variants-file.svg'
														alt='variants-file'
													/>
													<div className='exercises-left'>
														<p className='number-of-exercises'>9 სავარჯიშო</p>
														<div className='percentage-of-exercise'>
															{/* <img src="./assets/images/icons/variants-radio.svg" alt=""> */}
															<span className='percentage-distance'>
																0 შესრულებული
															</span>
														</div>
													</div>
												</div>
												<div className='all-variants-third'>
													<button className='open-this-variant'>
														საკითხის გახსნა
													</button>
												</div>
											</div>
										</div>
										<div className='all-variants-one'>
											<div className='all-variants-distance'>
												<div className='all-variants-first'>
													<p className='variants-issue-name'>
														ზმნა - თავისებური ზმნები
													</p>
													<span className='variants-issue-status'>
														სინტაქსი
													</span>
												</div>
												<div className='all-variants-second'>
													<img
														className='variants-file'
														src='./assets/images/icons/variants-file.svg'
														alt='variants-file'
													/>
													<div className='exercises-left'>
														<p className='number-of-exercises'>9 სავარჯიშო</p>
														<div className='percentage-of-exercise'>
															{/* <img src="./assets/images/icons/variants-radio.svg" alt=""> */}
															<span className='percentage-distance'>
																0 შესრულებული
															</span>
														</div>
													</div>
												</div>
												<div className='all-variants-third'>
													<button className='open-this-variant'>
														საკითხის გახსნა
													</button>
												</div>
											</div>
										</div>
										<div className='all-variants-one'>
											<div className='all-variants-distance'>
												<div className='all-variants-first'>
													<p className='variants-issue-name'>
														ზმნა - თავისებური ზმნები
													</p>
													<span className='variants-issue-status'>
														სინტაქსი
													</span>
												</div>
												<div className='all-variants-second'>
													<img
														className='variants-file'
														src='./assets/images/icons/variants-file.svg'
														alt='variants-file'
													/>
													<div className='exercises-left'>
														<p className='number-of-exercises'>9 სავარჯიშო</p>
														<div className='percentage-of-exercise'>
															{/* <img src="./assets/images/icons/variants-radio.svg" alt=""> */}
															<span className='percentage-distance'>
																0 შესრულებული
															</span>
														</div>
													</div>
												</div>
												<div className='all-variants-third'>
													<button className='open-this-variant'>
														საკითხის გახსნა
													</button>
												</div>
											</div>
										</div>
										<div className='all-variants-one'>
											<div className='all-variants-distance'>
												<div className='all-variants-first'>
													<p className='variants-issue-name'>
														ზმნა - თავისებური ზმნები
													</p>
													<span className='variants-issue-status'>
														სინტაქსი
													</span>
												</div>
												<div className='all-variants-second'>
													<img
														className='variants-file'
														src='./assets/images/icons/variants-file.svg'
														alt='variants-file'
													/>
													<div className='exercises-left'>
														<p className='number-of-exercises'>9 სავარჯიშო</p>
														<div className='percentage-of-exercise'>
															{/* <img src="./assets/images/icons/variants-radio.svg" alt=""> */}
															<span className='percentage-distance'>
																0 შესრულებული
															</span>
														</div>
													</div>
												</div>
												<div className='all-variants-third'>
													<button className='open-this-variant'>
														საკითხის გახსნა
													</button>
												</div>
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

export default IssuesPage;
