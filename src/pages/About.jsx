import React, { useEffect } from 'react';

import ApppageHead from '../components/AppHead';
import Footer from '../components/client/footer/Footer';

import AboutPlayIcon from '../assets/images/icons/about-play.svg';
import ArrowTextIcon from '../assets/images/about-project/arrow-to-text.svg';
import CircleArrow from '../assets/images/about-project/circle-arrow.svg';
import BookIcon from '../assets/images/icons/book.svg';
import AboutArrow from '../assets/images/about-project/about-arrow.svg';
import AboutCloud from '../assets/images/about-project/about-cloud.svg';
import AboutPause from '../assets/images/about-project/about-pause.svg';
import UserImg from '../assets/images/icons/user.svg';
import VideoImage from '../assets/images/about-project/video-image.svg';
import HeaderNav from '../components/client/header/HeaderNav';
// import '../assets/css/about-project.css';
import { Defaults } from '../helpers/defaults';

function About() {
	useEffect(() => {
		Defaults.ResetNewPassword.show();
	}, []);

	return (
		<>
			<ApppageHead />
			<div class='about-header'>
				<HeaderNav />

				<div className='about-header-content'>
					<div className='container container-two'>
						<div className='about-header-item'>
							<h1 className='about-project-text'>
								<span className='project-text1'>პროექტის</span>{' '}
								<span className='about-pr-text1'>შესახებ</span>
							</h1>
							<div className='about-header-icons header-content-icon'>
								<a href='#'>
									შემოგვიერთდი ჯგუფში <br className='hide-99' />
									<span>Facebook-ზე</span>
								</a>
								<a href='#'>
									<button type='button' className='about-user-icon is-loaded'>
										<img src={UserImg} alt='user-icon' />
										ფეისბუქ ჯგუფი
									</button>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>

			<section className='rand-text-icons-sect'>
				<div className='rand-text-cont-parent'>
					<div className='container container-two'>
						<div>
							<div className='about-icon-rand-text'>
								<img className='left-icon-images' src={AboutArrow} alt='' />
								<p className='rand-texts'>
									<strong>ლორემ იპსუმ</strong> საბანისძის მორიგემ ხელდებულია
									წაშლილიყო კირპიჩი უიტი. დაღონებულმა ჰგონია ტლაპოში გაჭირებულია
									სადილობაც აფხაზური. <strong>ზარმაცობა გავიგოთ</strong>{' '}
									სამოცდათორმეტი პატრონია გაიხდიდა ბოდავ შევამოკლებდით ქალაჩუნა
									ძაღლებისთვის რიჰარალე არსების მიიღებდნენ მოხარშული.{' '}
								</p>
							</div>

							<div className='about-icon-rand-texts'>
								<p className='rand-texts'>
									ამხანაგ მიძვრებოდი <strong>არსების</strong> ამოირჩევდნენ
									ხორვატი ხელებჩაწყობილი, მოხარშული წაქცევა. წაქცევა
									ხმაგაკმენდილი გადაწყვიტე ძაღლებისთვის სიძემა, ტოლჩა{' '}
									<strong>დაგვტოვა ბოდავ</strong> მაიონეზი მორიგემ. არსების
									პატრონია გაპარჭყულ, განვითარდა დაღონებულმა ტლაპოში შემთხვევაც
									ნოლია <strong>წაქცევა მერსედესებს </strong>ჩუპრი ჩანჩქერს.{' '}
								</p>
								<img className='right-icon-images' src={AboutCloud} alt='' />
							</div>

							<div className='about-icon-rand-texts'>
								<img className='left-icon-images' src={AboutPause} alt='' />
								<p className='rand-texts'>
									წაქცევა თმაგადაპარსულისთვის ეშოვნა ტოლჩა მერსედესებს{' '}
									<strong>ნაამბობიდან ძაღლებისთვის,</strong> სახაროვს ენები
									დაგვტოვა ხორვატი პედრო. ჩანჩქერს შევამოკლებდით პედრო აფხაზური
									უწმინდურო <strong>პოტერისაგან</strong> მეურვე გავიგოთ
									ხელებჩაწყობილი.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className='video-icon-text'>
				<div className='container container-two'>
					<div className='head-switch'>
						<h1 className='about-project-text about-project-text2'>
							<span className='project-text2'>გამოყენების </span>{' '}
							<span className='about-pr-text2'> ინსტრუქცია</span>
						</h1>
						<div className='about-header-icons about-header-icons2'>
							<div className='can-toggle'>
								<input id='a' type='checkbox' />
								<label htmlFor='a'>
									<div
										className='can-toggle__switch'
										data-checked='მოსწავლე'
										data-unchecked='მასწავლებელი'
									/>
								</label>
							</div>
						</div>
					</div>
					<div
						className='video-background'
						style={{ backgroundImage: `url(${VideoImage})` }}
					>
						<span className='popup11'>
							<img src={AboutPlayIcon} className='play-video' alt='playvideo' />
						</span>

						{/* <VideoModal /> */}

						<img src={ArrowTextIcon} className='image-show' alt='' />
					</div>

					<div className='all-resources-section'>
						<div className='grammer-resources-parent'>
							<h4 className='grammer-resources-head'>გრამატიკის რესურსები</h4>
							<p className='grammer-resources-p'>
								ღვათაებრივი ბაწარმობმული აფხაზეთს ძილშია, ვითმინე ტოლედოს მტვრის
								მაცალე დაჰკარგვიათ. წყლისაგან კინოფაკულტეტის ღაწვებზე გორაკებით
								ედუარ მოათვაიერა, მაისშია ვუთარგმნი მოხერხება, აუკანკალდა
								საავადმყოფო ჰფიცულობდა გვაროვნობასა შეიწირა გამორჩენას. წლისთავი
								გიგა სიტყვის ვითმინე მტვრის გადახდა.
							</p>
						</div>
						<div className='for-position-rel'>
							<h4 className='grammer-resources-head grammer-resources-head2'>
								როგორ გამოვიყენოთ?
							</h4>
							<p className='grammer-resources-p'>
								შემძლებულ ჯგუფელ მოხერხება, ვუთარგმნი გამორჩენას ნეტარებად
								უწესობა თეატრალიზირებულ ნახიზნარი, ეცი, წარმოსახული
								გვაროვნობასა. აფხაზეთს ხელებით ლილის წადილმა ტრიალებ განივრად
								საავადმყოფო ჰშორდებოდა მიიჩნევდნენ გიგა სვლა ეცი,
							</p>
							<img className='circle-arrow' src={CircleArrow} alt='' />
						</div>
					</div>
				</div>
			</section>

			<section className='people-cont'>
				<div className='container container-two'>
					<div className='head-switch'>
						<h1 className='about-project-text about-project-text2'>
							<span className='project-text3'>პროექტის</span>{' '}
							<span className='about-pr-text3'>შემქმნელები</span>
						</h1>
					</div>
					<div className='cool-people'>
						<div className='row'>
							<div className='col-lg-3 col-sm-4 cool-people-col'>
								<h5 className='cool-people-h'>სანდრო ასათიანი</h5>
								<p className='cool-people-p'>იდეის ავტორი</p>
							</div>
							<div className='col-lg-3 col-sm-4 cool-people-col'>
								<h5 className='cool-people-h'>ეკატერინე კვირკველია</h5>
								<p className='cool-people-p'>რესურსის ავტორი</p>
							</div>
							<div className='col-lg-3 col-sm-4  cool-people-col'>
								<h5 className='cool-people-h'>რუსუდან ზექალაშვილი </h5>
								<p className='cool-people-p'>რესურსის ავტორი</p>
							</div>
							<div className='col-lg-3 col-sm-4  cool-people-col'>
								<h5 className='cool-people-h'>ნინო გიორგაძე</h5>
								<p className='cool-people-p'>რესურსის ავტორის ასისტენტი</p>
							</div>
							<div className='col-lg-3 col-sm-4 cool-people-col'>
								<h5 className='cool-people-h'>ანა კიკილაშვილი</h5>
								<p className='cool-people-p'>რესურსის ავტორის ასისტენტი</p>
							</div>
							<div className='col-lg-3 col-sm-4 cool-people-col'>
								<h5 className='cool-people-h'>მარიამ აბესაძე</h5>
								<p className='cool-people-p'>რესურსის ავტორის ასისტენტი</p>
							</div>
							<div className='col-lg-3 col-sm-4 cool-people-col'>
								<h5 className='cool-people-h'>ნანა შოშიაშვილი</h5>
								<p className='cool-people-p'>რესურსის ავტორის ასისტენტი</p>
							</div>
							<div className='col-lg-3 col-sm-4 cool-people-col'>
								<h5 className='cool-people-h'>გიორგი ლომსაძე</h5>
								<p className='cool-people-p'>პროექტის მენეჯერი და რედაქტორი</p>
							</div>
							<div className='col-lg-3 col-sm-4 cool-people-col'>
								<h5 className='cool-people-h'>ანანო ასპანიძე</h5>
								<p className='cool-people-p'>ტექნიკური ჯგუფის ხელმძღვანელი</p>
							</div>
							<div className='col-lg-3 col-sm-4 cool-people-col'>
								<h5 className='cool-people-h'>მარიამ არაბული</h5>
								<p className='cool-people-p'>ილუსტრატორი</p>
							</div>
							<div className='col-lg-3 col-sm-4 cool-people-col'>
								<h5 className='cool-people-h'>ქეთი მოდებაძე</h5>
								<p className='cool-people-p'>Front-End დეველოპერო</p>
							</div>
							<div className='col-lg-3 col-sm-4 cool-people-col'>
								<h5 className='cool-people-h'>ირაკლი ლეკიშვილი</h5>
								<p className='cool-people-p'>Back-End დეველოპერი</p>
							</div>
							<div className='col-lg-3 col-sm-4 cool-people-col'>
								<h5 className='cool-people-h'>ჯეკო თედიაშვილი</h5>
								<p className='cool-people-p'>JavaScript დეველოპერი</p>
							</div>
							<div className='col-lg-3 col-sm-4 cool-people-col'>
								<h5 className='cool-people-h'>მარიამ გოგიჩაშვილი </h5>
								<p className='cool-people-p'>უფროსი ნარატივ დიზაინერი</p>
							</div>
							<div className='col-lg-3 col-sm-4 cool-people-col'>
								<h5 className='cool-people-h'>თამთა პაპუკაშვილი</h5>
								<p className='cool-people-p'>თამთა პაპუკაშვილი</p>
							</div>
							<div className='col-lg-3 col-sm-4 cool-people-col'>
								<h5 className='cool-people-h'>საბა ჩიტაიშვილი</h5>
								<p className='cool-people-p'>ინტერფეისის დიზაინერი</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className='resources-used'>
				<div className='container container-two'>
					<div className='col-9 resources-used-title'>
						<h1 className='about-project-text-resources'>
							<span className='project-text3'>გამოყენებული </span>{' '}
							<span className='about-pr-text3'> რესურსები</span>
						</h1>
					</div>
				</div>
				<div className='resources-used-bg m-auto'>
					<div className='container container-two'>
						<div className='resources-used-content resources-used-content-top'>
							<div className='resources-used-content-title'>
								<img src={BookIcon} alt='book-img' />
								<p>
									<span>ავთანდილ არაბული.</span> ქართული მეტყველების კულტურა.{' '}
								</p>
							</div>
							<p className='resources-used-content-item'>
								თბილისი: გამომცემლობა “უნივერსალი”, 2006
							</p>
						</div>
						<div className='resources-used-content'>
							<div className='resources-used-content-title'>
								<img src={BookIcon} alt='book-img' />
								<p>
									<span>აკაკი შანიძე.</span> ქართული ენა.
								</p>
							</div>
							<p className='resources-used-content-item'>
								თბილისი: გამომცემლობა “საქართველოს მაცნე”, 2008
							</p>
						</div>
						<div className='resources-used-content resources-used-content-bottom'>
							<div className='resources-used-content-title'>
								<img src={BookIcon} alt='book-img' />
								<p>
									<span>ნინო შარაშენიძე.</span> ქართული ენის გრამატიკა.
								</p>
							</div>
							<p className='resources-used-content-item'>
								თბილისი: გამომცემლობა “დიოგენე”, 2013
							</p>
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</>
	);
}

export default About;
