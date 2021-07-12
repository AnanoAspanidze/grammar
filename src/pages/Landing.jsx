import React from 'react';
import { Link } from 'react-router-dom';

import ApppageHead from '../components/AppHead';
import Layout from '../components/client/Layout';

import ArrowRight from '../assets/images/icons/Arrow - Right.svg';
import Noun from '../assets/images/homepage/noun.jpg';
import NounSmall from '../assets/images/homepage/noun-small-bg.svg';
import ArrowRightSmall from '../assets/images/icons/Arrow - Right-Black.svg';
import ArrowRightGreen from '../assets/images/icons/Arrow - Green.svg';
import ArrowRightGray from '../assets/images/icons/Arrow - Grey.svg';
import Adaptive from '../assets/images/homepage/adjective.jpg';
import AdaptiveSmall from '../assets/images/homepage/adjective-small-bg.svg';
import Verb from '../assets/images/homepage/verb.jpg';
import VerbSmallBg from '../assets/images/homepage/verb-small-bg.svg';
import PlayBtn from '../assets/images/icons/Play.svg';
import InstructionBg from '../assets/images/homepage/instruction-bg.svg';
import VideoImage from '../assets/images/homepage/video-image.png';

function Landing() {
	return (
		<>
			<ApppageHead />

			<Layout>
				<div>
					<div className='chatbox chatbox-index'>
						<button className='chatbox-button'>
							<i className='fas fa-comment-dots' />
						</button>
					</div>
					<section>
						<div className='container container-two'>
							<div className='row'>
								<div className='col-10 section-about-project for-100'>
									<h3>
										<span className='bold-black2'>პროექტის</span>{' '}
										<span className='bold-black'>შესახებ</span>
									</h3>
									<p className='about-project-cont'>
										მივხედე ჩადი ავიდოდა მრუშო დააყოლეს, მიქეს შარა ჰუგო მარჩელო
										აითვალწუნებენ მიღწეული ოჰ, ვარდიდან წასჩურჩულეს. მგზნებარე
										დაავიწყდათ საკონტაქტო ქვეშავრდომად მიუტრიალდა ვარდიდან
										მთლიანი აითვალწუნებენ წიმნდაა. აჩვენებდა შეძენდნენ
										ჩამოვიდოდა თანამგზავრები.
									</p>
									<Link to='/about'>
										<button
											type='button'
											className='about-project-button about-project-disabled more-button'
										>
											ვრცლად
											<img
												src={ArrowRight}
												className='about-project-arrow-icon arrow-more-button hide'
												alt='arrow-icon'
											/>
											<img
												src='./assets/images/icons/Arrow - Right-Black.svg'
												className='about-project-arrow-icon about-project-arrow-icon-black arrow-more-button appear'
												alt='arrow-icon'
											/>
											<img
												src='./assets/images/icons/Arrow - Green.svg'
												className='about-project-arrow-icon-green'
												alt='arrow-icon'
											/>
											<img
												src='./assets/images/icons/Arrow - Grey.svg'
												className='about-project-arrow-icon-grey'
												alt='arrow-icon'
											/>
										</button>
									</Link>
								</div>
							</div>
						</div>
					</section>
				</div>

				<section className='Noun-content'>
					<div className='grammar-gray-bg'>
						<div className='container container-three'>
							<div className='row m-auto for-d-flex justify-content-between'>
								<div className='col-7 grammar-images for-100'>
									<img src={Noun} className='img-noun' alt='img-noun' />
									<img
										src={NounSmall}
										className='img-noun-small'
										alt='img-noun-small'
									/>
								</div>
								<div className='col-5 grammar-content for-100'>
									<div className='for-flex'>
										<h3>
											<span>არსებითი</span>
											<br className='appear' /> სახელი
										</h3>
										<button
											type='button'
											className='grammar-content-button grammar-button grammer-button-2 appear hide2'
										>
											სავარჯიშოები
											<img
												src={ArrowRightSmall}
												className='grammar-content-arrow-icon-black'
												alt='arrow-icon'
											/>
											<img
												src={ArrowRightGreen}
												className='grammar-content-arrow-icon-green'
												alt='arrow-icon'
											/>
											<img
												src={ArrowRightGray}
												className='grammar-content-arrow-icon-grey'
												alt='arrow-icon'
											/>
										</button>
									</div>
									<p>
										მივხედე ჩადი ავიდოდა მრუშო დააყოლეს, მიქეს ჰუგო მარჩელო
										აითვალწუნებენ მიღწეული ოჰ, ვარდიდან წასჩურჩულეს. მგზნებარე
										დაავიწყდათ საკონტაქტო ქვეშავრდომად ჩადი ავიდოდა.
									</p>
									<button
										type='button'
										className='grammar-content-button grammar-button appear4'
									>
										სავარჯიშოები
										<img
											src={ArrowRightSmall}
											className='grammar-content-arrow-icon-black'
											alt='arrow-icon'
										/>
										<img
											src={ArrowRightGreen}
											className='grammar-content-arrow-icon-green'
											alt='arrow-icon'
										/>
										<img
											src={ArrowRightGray}
											className='grammar-content-arrow-icon-grey'
											alt='arrow-icon'
										/>
									</button>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className='adjective-content'>
					<div className='grammar-white-bg'>
						<div className='container container-three'>
							<div className='row m-auto for-d-flex justify-content-between'>
								<div className='col-5 grammar-content for-100 hide'>
									<h3>
										<span>ზედსართავი</span>
										<br className='appear' /> სახელი
									</h3>
									<p>
										მივხედე ჩადი ავიდოდა მრუშო დააყოლეს, მიქეს ჰუგო მარჩელო
										აითვალწუნებენ მიღწეული ოჰ, ვარდიდან წასჩურჩულეს. მგზნებარე
										დაავიწყდათ საკონტაქტო ქვეშავრდომად ჩადი ავიდოდა.
									</p>
									<button
										type='button'
										className='grammar-content-button grammar-button'
									>
										სავარჯიშოები
										<img
											src={ArrowRightSmall}
											className='grammar-content-arrow-icon-black'
											alt='arrow-icon'
										/>
										<img
											src={ArrowRightGreen}
											className='grammar-content-arrow-icon-green'
											alt='arrow-icon'
										/>
										<img
											src={ArrowRightGray}
											className='grammar-content-arrow-icon-grey'
											alt='arrow-icon'
										/>
									</button>
								</div>
								<div className='col-7 grammar-images for-100'>
									<img
										src={Adaptive}
										className='img-adjective'
										alt='img-adjective'
									/>
									<img
										src={AdaptiveSmall}
										className='img-adjective-small'
										alt='img-adjective-small'
									/>
								</div>
								<div className='col-5 grammar-content for-100 appear'>
									<div className='for-flex'>
										<h3>
											<span>ზედსართავი</span>
											<br className='appear' /> სახელი
										</h3>
										<button
											type='button'
											className='grammar-content-button grammar-button grammer-button-2 hide2'
										>
											სავარჯიშოები
											<img
												src={ArrowRightSmall}
												className='grammar-content-arrow-icon-black'
												alt='arrow-icon'
											/>
											<img
												src={ArrowRightGreen}
												className='grammar-content-arrow-icon-green'
												alt='arrow-icon'
											/>
											<img
												src={ArrowRightGray}
												className='grammar-content-arrow-icon-grey'
												alt='arrow-icon'
											/>
										</button>
									</div>
									<p>
										მივხედე ჩადი ავიდოდა მრუშო დააყოლეს, მიქეს ჰუგო მარჩელო
										აითვალწუნებენ მიღწეული ოჰ, ვარდიდან წასჩურჩულეს. მგზნებარე
										დაავიწყდათ საკონტაქტო ქვეშავრდომად ჩადი ავიდოდა.
									</p>
									<button
										type='button'
										className='grammar-content-button grammar-button appear2'
									>
										სავარჯიშოები
										<img
											src={ArrowRightSmall}
											className='grammar-content-arrow-icon-black'
											alt='arrow-icon'
										/>
										<img
											src={ArrowRightGreen}
											className='grammar-content-arrow-icon-green'
											alt='arrow-icon'
										/>
										<img
											src={ArrowRightGray}
											className='grammar-content-arrow-icon-grey'
											alt='arrow-icon'
										/>
									</button>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className='verb-content'>
					<div className='grammar-gray-bg-two'>
						<div className='container container-three'>
							<div className='row m-auto for-d-flex justify-content-between'>
								<div className='col-7 grammar-images for-100'>
									<img src={Verb} className='img-verb' alt='img-verb' />
									<img
										src={VerbSmallBg}
										className='img-verb-small'
										alt='img-verb-small'
									/>
								</div>
								<div className='col-5 grammar-content for-100'>
									<div className='for-flex'>
										<h3>
											<span>ზმნა</span> - პირი
											<br className='appear hide2' /> და რიცხვი
										</h3>
										<button
											type='button'
											className='grammar-content-button grammar-button grammer-button-2 appear hide2'
										>
											სავარჯიშოები
											<img
												src={ArrowRightSmall}
												className='grammar-content-arrow-icon-black'
												alt='arrow-icon'
											/>
											<img
												src={ArrowRightGreen}
												className='grammar-content-arrow-icon-green'
												alt='arrow-icon'
											/>
											<img
												src={ArrowRightGray}
												className='grammar-content-arrow-icon-grey'
												alt='arrow-icon'
											/>
										</button>
									</div>
									<p>
										მივხედე ჩადი ავიდოდა მრუშო დააყოლეს, მიქეს ჰუგო მარჩელო
										აითვალწუნებენ მიღწეული ოჰ, ვარდიდან წასჩურჩულეს. მგზნებარე
										დაავიწყდათ საკონტაქტო ქვეშავრდომად ჩადი ავიდოდა.
									</p>
									<button
										type='button'
										className='grammar-content-button grammar-button  appear4'
									>
										სავარჯიშოები
										<img
											src={ArrowRightSmall}
											className='grammar-content-arrow-icon-black'
											alt='arrow-icon'
										/>
										<img
											src={ArrowRightGreen}
											className='grammar-content-arrow-icon-green'
											alt='arrow-icon'
										/>
										<img
											src={ArrowRightGray}
											className='grammar-content-arrow-icon-grey'
											alt='arrow-icon'
										/>
									</button>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className='instruction-content hide'>
					<div className='container container-two'>
						<div className='row'>
							<div className='col-5 instruction-content-item'>
								<h3>
									<span>რესურსის</span> გამოყენების ინსტრუქცია
								</h3>
							</div>
						</div>
					</div>
					<div className='container-fluid'>
						<div
							className='instruction-bg'
							style={{
								backgroundImage: `url(${InstructionBg})`,
							}}
						>
							<div className='row m-auto'>
								<div className='col-9 instruction-video'>
									{/* <iframe src="https://www.youtube.com/embed/tgbNymZ7vqY"  frameborder="0" allowfullscreen></iframe> */}
									<div
										className='instruction-cont video-image'
										style={{ backgroundImage: `url(${VideoImage})` }}
									>
										<a href='#popup1'>
											<img
												src={PlayBtn}
												className='play-video'
												alt='playvideo'
											/>
										</a>
									</div>
									{/* <div id='popup1' className='overlay'>
										<div className='popup video-popup' id='pop-dessapear'>
											<a className='close' id='pause-button'>
												×
											</a>
											<iframe
												width='100%'
												height='100%'
												style={{ borderRadius: '30px' }}
												id='video'
												src='https://www.youtube.com/embed/yu9GPOwo0nw'
												title='YouTube video player'
												frameBorder={0}
												allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
												allowFullScreen
											/>
										</div>
									</div> */}
								</div>
							</div>
						</div>
					</div>
				</section>
			</Layout>
		</>
	);
}

export default Landing;
