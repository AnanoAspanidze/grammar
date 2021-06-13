import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import '../assets/css/variants.css';
import '../assets/css/responsive.css';
import '../assets/css/buttons.css';
import '../assets/css/inputs.css';
import ApppageHead from '../components/AppHead';
import userContext from '../context/user/userContext';
import { issueService } from '../services/issue.service';
import VariantsFileIcon from '../assets/images/icons/variants-file.svg';
import Header2 from '../components/client/header/Header2';

function IssuesPage() {
	const { user, isAuthenticated, logOutUser } = useContext(userContext);

	let history = useHistory();

	const [issues, setissues] = useState(null);

	useEffect(() => {
		issueService.getPublicSubCategories().then((res) => {
			setissues(res);
		});
	}, []);

	return (
		<>
			<ApppageHead />

			<div>
				<div className='variants-header'>
					<Header2 />
				</div>
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
									<Link to='/'>გჭირდება დახმარება?</Link>
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
										{issues &&
											issues.map((issue) => (
												<div className='all-variants-one' key={issue.Id}>
													<div className='all-variants-distance'>
														<div className='all-variants-first'>
															<p className='variants-issue-name'>
																{issue.Name}
															</p>
															<span className='variants-issue-status'>
																{issue.Category.Name}
															</span>
														</div>
														<div className='all-variants-second'>
															<img
																className='variants-file'
																src={VariantsFileIcon}
																alt='variants-file'
															/>
															<div className='exercises-left'>
																<p className='number-of-exercises'>
																	{issue.ExerciseQuantity} სავარჯიშო
																</p>
																<div className='percentage-of-exercise'>
																	<div className='c100 p56 center small'>
																		<div className='slice'>
																			<div className='bar' />
																			<div className='fill' />
																		</div>
																	</div>
																	<span className='percentage-distance'>
																		{issue.UserDoneExerciseAnswersQuantity}
																	</span>
																</div>
															</div>
														</div>
														<div className='all-variants-third'>
															<button
																className='open-this-variant'
																onClick={() => history.push('/exercises')}
															>
																საკითხის გახსნა
															</button>
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
			</div>
		</>
	);
}

export default IssuesPage;
