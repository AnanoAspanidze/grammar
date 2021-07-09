import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components/macro';
import { exerciseService } from '../../../../services/exercise.service';
import ArrowIcon from '../../../../assets/images/icons/Arrow - Grey.svg';
import { Defaults } from '../../../../helpers/defaults';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

function SelectedExercise({
	question,
	numberOfQuestions,
	exerciseId,
	exId,
    DoneQuestion,
	IsDone,
	index,
}) {
    const history = useHistory();
	let query = useQuery();
    
	const [loading, setLoading] = useState(false);
	const [definitionModal, setDefinitionModal] = useState(false);
	const [haveToChecked, setHaveToChecked] = useState(true);
    
	const [correctAnswerId, setCorrectAnswerId] = useState(null);
	const [iscorrect, setIsCorrect] = useState(null);
	const [selectedAnswer, setSelectedAnswer] = useState('none');
	const [questionData, setquestionData] = useState(null);
    const [explanation, setExplanation] = useState('')
	const [text, setText] = useState(null);
	const [modifierText, setModifierText] = useState();
	const [textType, setTextType] = useState();


    useEffect(() => {
        const parser = new DOMParser();
		const cutNbsp = question.Text.replace(/\&nbsp;/g, '');
		const xmlString = cutNbsp;
		const doc1 = parser.parseFromString(xmlString, "text/html");

		setText(doc1.documentElement.textContent)
    }, [])

	useEffect(() => {
		if(text) {

			const cutNbsp = text.replace(/\./g, '');

			if(cutNbsp.indexOf('#select', 0) === 0) {
				setTextType('start')
				var cutNbsp2 = cutNbsp.replace(/\#select/g, '');
				var textes = cutNbsp2.trim().split(' ');
				setModifierText(textes)
				
			} else if(cutNbsp.indexOf('#select') + 7 === cutNbsp.length) {
				setTextType('end')
				var cutNbsp2 = cutNbsp.replace(/\#select/g, '');
				var textes = cutNbsp2.trim().split(' ');
				setModifierText(textes)

			} else {
				var textes2 = cutNbsp.trim().split('#select');
				setModifierText(textes2)

			}
		}
	}, [text])



	useEffect(() => {
		if (question) {
			setquestionData(question);
			question.Answers.filter((q, i) => {
				if (q.IsCorrect) {
					setCorrectAnswerId(q.Id);
				}
			});
		}
	}, []);


    const selectQuestion = (e) => {
		setSelectedAnswer(parseInt(e));
	};


	useEffect(() => {
		if (IsDone && DoneQuestion) {
			setHaveToChecked(false);
			setDefinitionModal(true);

			if (DoneQuestion.IsDoneQuestionCorrect) {
				setCorrectAnswerId(DoneQuestion.DoneAnswerId[0]);
                setExplanation(DoneQuestion.DoneAnswerExplanation)
				setSelectedAnswer(DoneQuestion.DoneAnswerId[0]);

				setIsCorrect(true);
			} else {
				const x = question.Answers.find((w) => w.IsCorrect === true);

				setCorrectAnswerId(x.Id);
				setSelectedAnswer(DoneQuestion.DoneAnswerId[0]);
				setIsCorrect(false);
			}
		}
	}, [DoneQuestion]);

	const checkQuestion = () => {
		if (selectedAnswer) {
			setLoading(true);

			let data = {
				ExerciseId: exerciseId,
				QuestionId: question.Id,
				answersId: [selectedAnswer],
				AnswerText: '',
				CategoryId: question.Category.Id,
				SubCategoryId: question.SubCategory.Id,
				TypeName: question.ExerciseType,
			};

			exerciseService
				.checkQuestion(data)
				.then((res) => {
					setHaveToChecked(false);
					setDefinitionModal(true);
					setLoading(false);
					setExplanation(res.AnswerResponse)

					if (res.IsCorrect) {
						setIsCorrect(true);
					} else {
						const x = question.Answers.find((w) => w.IsCorrect === true);
						setCorrectAnswerId({ ...x, id: x.Id });
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
								<SelectStyles 
									value={selectedAnswer} 
									css={`color #EB2347;`}
							
								>
									{question.Answers.map(o => (
										<option key={o.Id} 
												value={o.Id} 
											>
													{o.Text}
										</option>
									))}
								</SelectStyles>
								{modifierText && modifierText.map(t => `${t} `)}
							</>
						) : iscorrect === false && correctAnswerId !== selectedAnswer && textType === "end" ? (
							<>
								{modifierText && modifierText.map(t => `${t} `)}

								<SelectStyles 
									value={selectedAnswer} 
									css={`color #EB2347;`}
							
								>

									{question.Answers.map(o => (
										<option key={o.Id} 
												value={o.Id} 
											>
													{o.Text}
										</option>
									))}
								</SelectStyles>
							</>
						) : iscorrect === false && correctAnswerId !== selectedAnswer && !textType ? (
							<>
							{modifierText && modifierText[0]} 

							<SelectStyles 
								value={selectedAnswer} 
								css={`color #EB2347;`}
						
						>
						
							{question.Answers.map(o => (
								<option key={o.Id} 
										value={o.Id} 
										>
												{o.Text}{' '}
									</option>
								))}
							</SelectStyles>

							{modifierText && modifierText[1]} 
							</>	
						): null}



						{iscorrect === true && correctAnswerId === selectedAnswer && textType === "end" ? (
							<>

								{modifierText && modifierText.map(t => `${t} `)}
								<select 
									value={selectedAnswer} 
									css={`color #239F61;`}
								
							>
								{question.Answers.map(o => (
									<option key={o.Id} 
											value={o.Id} 
										>
												{o.Text}
									</option>
								))}
								</select>
							</>
						) : iscorrect === true && correctAnswerId === selectedAnswer && textType === "start" ?  (
							<>
								<select 
									value={selectedAnswer} 
									css={`color #239F61;`}
								
							>
								{question.Answers.map(o => (
									<option key={o.Id} 
											value={o.Id} 
										>
												{o.Text}
									</option>
								))}
								</select>
								{modifierText && modifierText.map(t => `${t} `)}
								
							</>
						) : iscorrect === true && correctAnswerId === selectedAnswer && !textType ? (
							<>
							{modifierText && modifierText[0]} 

							<SelectStyles 
								value={selectedAnswer} 
								css={`color #239F61;`}
						
						>
						
							{question.Answers.map(o => (
								<option key={o.Id} 
										value={o.Id} 
										>
												{o.Text}
									</option>
								))}
							</SelectStyles>

							{modifierText && modifierText[1]} 
							</>	
						) : null}





						{iscorrect === null && textType === "start" ? (
							<>
								<SelectStyles 
									value={selectedAnswer} 
									onChange={(e) => selectQuestion(e.target.value)}
							
							>
								<option value="none" css={`border-bottom: 2px solid red;`} selected disabled hidden>
								აირჩიეთ სიტყვა
								</option>
								{question.Answers.map(o => (
									<option key={o.Id} 
											value={o.Id} 
										>
												{o.Text}
									</option>
								))}
							</SelectStyles>{' '}
							{modifierText && modifierText.map(t => `${t} `)}
						</>
						) : iscorrect === null && textType === "end" ? (
							<>
								{modifierText && modifierText.map(t => `${t} `)}

								<SelectStyles 
									value={selectedAnswer} 
									onChange={(e) => selectQuestion(e.target.value)}
							
								>
									<option value="none" css={`border-bottom: 2px solid red;`} selected disabled hidden>
									აირჩიეთ სიტყვა
									</option>
									{question.Answers.map(o => (
										<option key={o.Id} 
												value={o.Id} 
											>
													{o.Text}
										</option>
									))}
								</SelectStyles>
							</>
						) : iscorrect === null && !textType ? (
							<>
							{modifierText && modifierText[0]} 

							<SelectStyles 
								value={selectedAnswer} 
								onChange={(e) => selectQuestion(e.target.value)}
						
						>
							<option value="none" css={`border-bottom: 2px solid red;`} selected disabled hidden>
							აირჩიეთ სიტყვა
							</option>
							{question.Answers.map(o => (
								<option key={o.Id} 
										value={o.Id} 
									>
											{o.Text}
								</option>
							))}
						</SelectStyles>

							{modifierText && modifierText[1]} 
							</>
						): null}

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
								<span css={`font-size: 18px; color #239F61; font-family: FiraGO; line-height: 1.3;`}>{question.Answers.map((w,i) => w.IsCorrect ? w.Text : "")}</span>
								

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
					{definitionModal &&
						explanation && (iscorrect === true || iscorrect === false) && (
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

export default SelectedExercise;


const SelectStyles = styled.select`
	color: #707070;
`;