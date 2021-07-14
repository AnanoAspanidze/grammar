import React from 'react'
import { Link } from 'react-router-dom';

import Footer from '../components/client/footer/Footer'
import Logo from '../assets/images/icons/about-project-logo.svg';
import Logo2 from '../assets/images/icons/logo-414.svg';

function Terms() {
    return (
        <>
        <div class="privacy-policy">
            <nav className="navbar navbar-expand-md navbar-light">
                <div className="container container-two">
                    <Link className='navbar-brand'>
                        <img className=' hide3' src={Logo} alt='logo' />
                        <img className='appear3' src={Logo2} alt='' />
                    </Link>
                <div className="navbar-icons">
                    <a href="#popup7" onclick="navAppear2();" className="login appear"><img src="./assets/images/icons/Logout.svg" alt="" /></a>
                    <a href="#popup5" onclick="navAppear();"><button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navb  arsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon about-navbar-toggler-icon" />
                    </button></a>
                </div>
                <div className="collapse navbar-collapse homepage-navbar-collapse" id="navbarsExample04">
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                    <li className="nav-item">
                        <a className="nav-link about-nav-link active" aria-current="page" href="index.html">
                        მთავარი
                        </a>
                    </li>
                    <li className="nav-item ">
                        <a className="nav-link about-nav-link" href="about-project.html">
                        პროექტის შესახებ
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link about-nav-link" href="#">
                        სავარჯიშოები
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link about-nav-link" href="#">
                        ტესტირება
                        </a>
                    </li>
                    <a href="#popup7" onclick="navAppear2();" className="sign-in-parent nav-link">
                        <button type="button" className="sign-in-button">
                        შესვლა
                        </button>
                    </a>
                    </ul>
                </div>
                </div>
            </nav>

            <div class="container container-two">
                <div class="privacy-policy-content">
                    <p class="privacy-policy-content-item"><span>მოხმარების</span> პირობები</p>
                </div>
            </div>
        </div>


        <section className="privacy-policy-more">
        <div className="container container-two">
            <div className="privacy-policy-more-content">
            <h4 className="privacy-policy-more-title title1">ქვესათაური პირველი</h4>
            <p className="privacy-policy-more-text">
                ლორემ იპსუმ მოსამართლის დარდითა ბუნების შემოვიდნენ შევიტყვე ქრისტიანობაზე. ხაჯალზე ფუჭ
                სტანისლავსკის, ვეძახდი საოპერაციო აკნატუნებდნენ, ბუნების წიგნს კედლებმოხატული დაიმციროს ვიტანდი,
                სითბო აივნების შემოვიდნენ სიმულაციას. გააკონტროლეთ გრეგორი ბუნებრივად, ჩაკირულმა ძველად თერთმეტმა
                ციკლების ლოქოს გვახრჩობს დაკოჭლებული ტლინკები სოციოფობია ბეგიაშვილებთან, აუელავდა მისურელი. უჯათი
                ალბომს ვეძახდი მიმავალთა ბეჯითად, ტლინკები, ჩინებული ბუნების. ვემსახურები გვიამბე წითლით გადმოვიდნენ
                ანთება ინტერესი ფუჭ. აივნების ვიყიდე სიას ძველად აუელავდა შესძახის გააკონტროლეთ სოციოფობია დამალული.
            </p>
            <p className="privacy-policy-more-text privacy-policy-more-text2">
                ზალიან ყმისა სოფლურ ჰაიდეგერის ჩაით წაგართვა ვთხრით ნიშანით ავიდოდე მოსილ ორმა. დასცეს სწეწავს
                დაოჯახება ჩოხის მოსულიყო სტერეოტიპი ფირებზე ბიჭსა სიტყვებისათვის ქსოვილით მისტიკისა. დაქორწინდნენ
                ჩოხის სიტყვებისათვის მუმია დაოჯახება თუმცა კადნიერსა. შთაგონებულიო ფუჰ მიუჯდებოდნენ მოკალათდები
                ოპტიმისტებად შესაქმნელად. კუნძულს ორგიებსაც ზალიან დაუწუნიათ, ენდო მივუშვირე წამიკითხავს ხნით
                ჰყავდათ. ბერტოლუჩის ემისა ორგიებსაც ავიდოდე, ყველაზედ ქსოვილით ნიშანით შემიტყვეთ. მრავლდებოდნენ
                ყველაზედ მოვწყდი მიხვდება იანი კადნიერსა გამოერკვნენ.
            </p>
            </div>
            <div className="privacy-policy-more-content">
            <h4 className="privacy-policy-more-title title2">ქვესათაური მეორე</h4>
            <p className="privacy-policy-more-text">
                ხარბად გეგას დღევანდელ კაცობა უარესად ჯამებს ეხმარებიან დარტყმით ძმაკაცებმა ხუნდები მოხუცთან
                ჭუჭყიანო ზარიას ანგარიში მოილანძღებოდა. ძმაკაცებმა კანონიერი უარესად ფორტეპიანოს გვთხოვდა გაისტუმრა.
                შეუნგრია გამიკეთებიაო აკაკის მემართლება ტტომ ერთადერთხელ ჩაჰმალა თოლიებს, ჭუჭყიანო იწუნებდა ხარბად
                ნინო ქრისტიანობაც უხეშად ჩაენაცვლა. კამპანიაში აყალმაყალს ზარიას გამიკეთებიაო კაცობა ქედმაღლურად
                სფეროში ნინო რჩევასა, ტატიზე კნუტი.
            </p>
            <p className="privacy-policy-more-text2">
                ლორემ იპსუმ მოსამართლის დარდითა ბუნების შემოვიდნენ შევიტყვე ქრისტიანობაზე. ხაჯალზე ფუჭ
                სტანისლავსკის, ვეძახდი საოპერაციო აკნატუნებდნენ, ბუნების წიგნს კედლებმოხატული დაიმციროს ვიტანდი,
                სითბო აივნების შემოვიდნენ სიმულაციას. გააკონტროლეთ გრეგორი ბუნებრივად, ჩაკირულმა ძველად თერთმეტმა
                ციკლების ლოქოს გვახრჩობს დაკოჭლებული ტლინკები სოციოფობია ბეგიაშვილებთან, აუელავდა მისურელი. უჯათი
                ალბომს ვეძახდი მიმავალთა ბეჯითად, ტლინკები, ჩინებული ბუნების. ვემსახურები გვიამბე წითლით გადმოვიდნენ
                ანთება ინტერესი ფუჭ. აივნების ვიყიდე სიას ძველად აუელავდა შესძახის გააკონტროლეთ სოციოფობია დამალული.
            </p>
            </div>
            <div className="privacy-policy-more-content">
            <h4 className="privacy-policy-more-title title2">ქვესათაური მესამე</h4>
            <p className="privacy-policy-more-text">
                რჩევას გოგოებმაც ეშმაკ ცოფიან განძრევა ეკეცებოდა სტუმრებმა ამერიკის. დაუწყდა ლეშის სიუჟეტებში მერაბ,
                ცირკი გაძარცვის საღამოდან შეასრულა, იეღოველებისა ვანგასთან ონიანი მაროკოელი, ნაყოფთა ეკეცებოდა.
                მწვადები მერაბ მოცარიელდა, გოდრებთან დაუწყდა იატაკს თმაც მზამზარეულად სახარჯო მოინდომეს. მოვუჭირე
                ასაკობრივი უყურა, იყოფდნენ, იგალობეთ გაამდიდროს სტუმრებმა სიგანით, ბურთაობდნენ მუშტრის მოწაფისათვის,
                მოიცვლი თავსახურს მზამზარეულად. იყოფდნენ მზამზარეულად გაამდიდროს გამაცინე ემიგრანტი, მოუპარვინებია
                შერაცხული დამიშინა, ჩვენისთანებს, რეჟისორის გამოესალმა ლენტი ბურთაობდნენ ნიავს. სიგანით დავიყოლიოთ
                ნაყოფთა მოცარიელდა იგალობეთ უყურა. ასაკობრივი მზამზარეულად ლენტი ბურთაობდნენ ყაბარდო ცირკი იატაკს
                ქრისტესი საათისთვის გოგნი დაერღვია. მოსდგომოდა დასათვალიერებლად მოვუჭირე ქალურობის, ასაკობრივი
                ცოფიან, მოწაფისათვის ონიანი შეერთება, ლენტი კკარგად, საძაგელის ნაყოფთა. ღვრიან გამაცინე შეასრულა
                გაიცინეს, გოგოებმაც, გოგნი გაამდიდროს მზამზარეულად აკვირვებდა. გაიგონებდით გოგოებმაც ცირკი,
                გამოესალმა გვილაპარაკია დასათვალიერებლად, ცოფიან დამიშინა.
            </p>
            </div>
        </div>
        </section>


        <Footer />
        </>
    )
}

export default Terms