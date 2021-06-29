import React, { useState, useEffect } from 'react'

import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components/macro';
import { exerciseService } from '../../../../services/exercise.service';
import ArrowIcon from '../../../../assets/images/icons/Arrow - Grey.svg';
import { Defaults } from '../../../../helpers/defaults';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

function MissedWordExercise({
	question,
	numberOfQuestions,
	exerciseId,
	index,
	exId,
	DoneQuestion,
	IsDone,
}) {
	const history = useHistory();
	let query = useQuery();
    

    const [loading, setLoading] = useState(false);
	const [definitionModal, setDefinitionModal] = useState(false);
	const [haveToChecked, setHaveToChecked] = useState(true);

	const [correctAnswerId, setCorrectAnswerId] = useState(null);
	const [iscorrect, setIsCorrect] = useState(null);
	const [selectedAnswer, setSelectedAnswer] = useState("");

	const [questionData, setquestionData] = useState(null);
	const [text, setText] = useState("");
	const [modifierText, setModifierText] = useState();
	const [explanation, setExplanation] = useState('')
	const [textType, setTextType] = useState();


    useEffect(() => {
        const parser = new DOMParser();
		const cutNbsp = question.Text.replace(/\&nbsp;/g, '');
		const xmlString = cutNbsp;
		const doc1 = parser.parseFromString(xmlString, "application/xml");
		
		setText(doc1.documentElement.textContent)

    }, [])

	useEffect(() => {
		if(text) {

			const cutNbsp = text.replace(/\./g, '');

			if(cutNbsp.indexOf('#input', 0) === 0) {
				setTextType('start')
				var cutNbsp2 = cutNbsp.replace(/\#input/g, '');
				var textes = cutNbsp2.trim().split(' ');
				setModifierText(textes)
				
			} else if(cutNbsp.indexOf('#input') + 7 === cutNbsp.length) {
				setTextType('end')
				var cutNbsp2 = cutNbsp.replace(/\#input/g, '');
				var textes = cutNbsp2.trim().split(' ');
				setModifierText(textes)

			} else {
				var textes2 = cutNbsp.trim().split('#input');
				setModifierText(textes2)

			}
		}
	}, [text])


	useEffect(() => {
		if (IsDone && DoneQuestion && question) {
			setHaveToChecked(false);
			setDefinitionModal(true);

			if (DoneQuestion.IsDoneQuestionCorrect) {
				setCorrectAnswerId(question.Answers[0].Text);
                setExplanation(DoneQuestion.DoneAnswerExplanation)
				setSelectedAnswer(DoneQuestion.DoneAnswerString);

				setIsCorrect(true);
			} else {
			
				setCorrectAnswerId(question.Answers[0].Text);
				setSelectedAnswer(DoneQuestion.DoneAnswerString);
				setIsCorrect(false);
			}
		}
	}, [DoneQuestion, question]);


	const selectQuestion = (e) => {
		setSelectedAnswer(e);
	};


	const checkQuestion = () => {
		if (selectedAnswer) {
			setLoading(true);

			let data = {
				ExerciseId: exerciseId,
				QuestionId: question.Id,
				answersId: [],
				AnswerText: selectedAnswer.trim(),
				CategoryId: question.Category.Id,
				SubCategoryId: question.SubCategory.Id,
				TypeName: question.ExerciseType,
			};

			exerciseService
				.checkQuestion(data)
				.then((res) => {
					setHaveToChecked(false);
					setLoading(false);
					setDefinitionModal(true);
					setExplanation(res.AnswerText)

					if (res.IsCorrect) {
						setIsCorrect(true);
						setCorrectAnswerId(selectedAnswer.trim())
					} else {
						setIsCorrect(false);
					}
				})
				.catch((err) => {
					console.log(err);
					setLoading(false);
				});
		}
	};



	const onNext = (i) => {
		if (numberOfQuestions - 1 > i) {
			let routerNum = parseInt(query.get('step'));
			history.push({ search: `step=${++routerNum}` });
		} else {
			window.location.href = `/result?exerciseId=${exerciseId}&subcategoryId=${question.SubCategory.Id}`;
		}
	};

	const onPrev = (i) => {
		if (parseInt(query.get('step')) === 0) {
			history.push(`/exercisedetails/${exerciseId}`);
		} else {
			history.push({ search: `step=${--i}` });
		}
	};

    return (
        <>

                <div className="spec-exer-head">
                    <p className="spec-exer-head-ex3">{`სავარჯიშო # ${exId} - ${question.ExerciseTitle}`}</p>
                    <button>პროექტორის რეჟიმი</button>
                </div>
                <span className="exer-choose-cor-answer">{question.Instruction}</span>
                <div className="spec-exer-questions">
                    <p className="spec-ask-question">

					{iscorrect === false && correctAnswerId !== selectedAnswer && textType === "start" ? (
							<>
							<input value={selectedAnswer} type="text" css={`color: #EB2347;`} /> 
							{modifierText && modifierText.map(t => `${t.trim()} `)}
							</>
					) : iscorrect === false && correctAnswerId !== selectedAnswer && textType === "end" ? (
						<>
							{modifierText && modifierText.map(t => `${t.trim()} `)}
						<input value={selectedAnswer} type="text" css={`color: #EB2347;`} /> 
						</>
					) : iscorrect === false && correctAnswerId !== selectedAnswer && !textType ? (
						<>
						{modifierText && modifierText[0]}
						<input value={selectedAnswer} type="text" css={`color: #EB2347;`} /> 
						{/* {modifierText && modifierText[1]} */}
						</>
					) : null}

					{iscorrect === true && correctAnswerId == selectedAnswer && textType === "start" ? (
							<>
							<input value={selectedAnswer} type="text" css={`color: #239F61;`} /> 
							{modifierText && modifierText.map(t => `${t.trim()} `)}
							</>
					) : iscorrect === true && correctAnswerId == selectedAnswer && textType === "end" ? (
						<>
							{modifierText && modifierText.map(t => `${t.trim()} `)}
						<input value={selectedAnswer} type="text" css={`color: #239F61;`} /> 
						</>
					) : iscorrect === true && correctAnswerId == selectedAnswer && !textType ? (
						<>
						{modifierText && modifierText[0]}
						<input value={selectedAnswer} type="text" css={`color: #239F61;`} /> 
						{modifierText && modifierText[1]}
						</>
					) : null}
				

					{iscorrect === null && textType === "start" ? (
							<>
							<input value={selectedAnswer} type="text" placeholder="ჩაწერე სიტყვა" onChange={(e) => selectQuestion(e.target.value)} /> 
							{modifierText && modifierText.map(t => `${t.trim()} `)}
							</>
					) : iscorrect === null && textType === "end" ? (
						<>
							{modifierText && modifierText.map(t => `${t.trim()} `)}
						<input value={selectedAnswer} type="text" placeholder="ჩაწერე სიტყვა" onChange={(e) => selectQuestion(e.target.value)} /> 
						</>
					) : iscorrect === null && !textType ? (
						<>
						{modifierText && modifierText[0]}
						<input value={selectedAnswer} type="text" placeholder="ჩაწერე სიტყვა" onChange={(e) => selectQuestion(e.target.value)} /> 
						{modifierText && modifierText[1]}
						</>
					) : null}
			
                    </p>
                </div>

		

				{iscorrect === false && textType === "start" && question && (
						<>
						<div className="flex column" style={{ marginBottom: '40px' }}>
							<span className="exer-choose-cor-answer" css={`margin-bottom: 8px;`}>სწორი პასუხი:</span>

							<div>
							<span css={`font-size: 18px; color: #333333; font-family: FiraGO; line-height: 1.3; color #239F61;`}>{question.Answers.map((w) => w.IsCorrect === true ? w.Text : "")}</span> {' '}
							{modifierText && modifierText.map(t => (
								<span css={`font-size: 18px; color: #333333; font-family: FiraGO; line-height: 1.3;`}>{`${t} `}</span>

							))}
							.
							</div>
						</div>
						</>
				)}

			
					{iscorrect === false && textType === "end" && question && (
						<>
						<div className="flex column" style={{ marginBottom: '40px' }}>
							<span className="exer-choose-cor-answer" css={`margin-bottom: 8px;`}>სწორი პასუხი:</span>

							<div>
								{modifierText && modifierText.map(t => (
									<span css={`font-size: 18px; color: #333333; font-family: FiraGO; line-height: 1.3;`}>{`${t} `}</span>
								))}
								<span css={`font-size: 18px; color: #333333; font-family: FiraGO; line-height: 1.3; color #239F61;`}>{question.Answers.map((w) => w.IsCorrect === true ? w.Text : "")}</span>
								.
							</div>
						</div>
						</>
					)}
			
					{iscorrect === false && !textType && question && (
						<>
						<div className="flex column" style={{ marginBottom: '40px' }}>
							<span className="exer-choose-cor-answer" css={`margin-bottom: 8px;`}>სწორი პასუხი:</span>

							<div>
							<span css={`font-size: 18px; color: #333333; font-family: FiraGO; line-height: 1.3;`}>{modifierText && modifierText[0]} </span>

							<span css={`font-size: 18px; color: #239F61; font-family: FiraGO; line-height: 1.3;`}>{question.Answers.map(w => w.Id ? w.Text : "")}</span>

								<span css={`font-size: 18px; color: #333333; font-family: FiraGO; line-height: 1.3;`}>{modifierText && modifierText[1]} </span>
								.
							</div>
						</div>
						</>
					)}


				<div className='check-count-boxes'>
				<div
					className='special-exercises-return-button'
					onClick={() => onPrev(index)}
				>
					<img src={ArrowIcon} alt='' />
				</div>
				
				<div className='ganmarteba'>
					{definitionModal && (iscorrect === true || iscorrect === false) && (
						<p onClick={() => Defaults.Definition.show(explanation || DoneQuestion.DoneAnswerExplanation)}>მაჩვენე განმარტება</p>
					)}
				</div>


				<p className='counted-boxes'>{`${index + 1} / ${numberOfQuestions}`}</p>

				{!haveToChecked ? (
					<div className='check-button'>
						<button onClick={() => onNext(index)} className='next-exercise'>
							შემდეგი
						</button>
					</div>
				) : (
					<div className='check-button' onClick={checkQuestion}>
						<button className='exer-check-button' disabled={loading}>
							შემოწმება
						</button>
					</div>
				)}
			</div>
        
  
        </>
    )
}

export default MissedWordExercise

