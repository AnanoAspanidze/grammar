import React, { useState, useEffect } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom';
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


    useEffect(() => {
        const parser = new DOMParser();
		const xmlString = question.Text;
		const doc1 = parser.parseFromString(xmlString, "application/xml");
		
		setText(doc1.documentElement.textContent)

    }, [])

	useEffect(() => {
		if(text) {
			const textes = text.trim().split('#select');
			setModifierText(textes)
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
			};

			exerciseService
				.checkQuestion(data)
				.then((res) => {
					setHaveToChecked(false);
					setDefinitionModal(true);
					setLoading(false);

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
           <div className="col-9 p-0">
                <div className="spec-exer-fields">
                    <div className="spec-exer-all">
                    <div className="spec-exer-head">
                        <p className="spec-exer-head-ex3">{`სავარჯიშო # ${question.OrderNumber} - ${question.ExerciseTitle}`}</p>
                        <button>პროექტორის რეჟიმი</button>
                    </div>
                    <span className="choose-correct-answer">აირჩიე გამოტოვებული სიტყვა</span>
                    <div className="spec-exer-questions">
						<p>
					{modifierText && modifierText[0]} 
						
						{iscorrect === false && correctAnswerId !== selectedAnswer && (
							<select 
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
						</select>
						)}

						{iscorrect === true && correctAnswerId === selectedAnswer ? (
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

						) : (
							<select 
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
                         </select>
						)}
						{modifierText && modifierText[1]} 

                        </p>
                        <span className="exer-choose-cor-answer">მონიშნე სწორი პასუხი</span>
                    </div>
                    <div className='check-count-boxes'>
				<div
					className='special-exercises-return-button'
					onClick={() => onPrev(index)}
				>
					<img src={ArrowIcon} alt='' />
				</div>

				{/* <div className='ganmarteba'>
					{definitionModal && (
						<p onClick={() => Defaults.Definition.show()}>მაჩვენე განმარტება</p>
					)}
				</div> */}

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
                    </div>
                </div>
            </div>

        </>
    )
}

export default SelectedExercise;




const ButtonParent = styled.select`
	${({ questionId, selectedAnswer }) =>
		questionId == selectedAnswer &&
		`
		button {
			background: #EDF0EE;
			border: 2px solid #4B6858
		}
    `}
	${({ iscorrect, questionId, selectedAnswer }) =>
		iscorrect === false &&
		questionId === selectedAnswer &&
		`
		button {
		background: #FEF4F6;
		border: 2px solid #EB2347;
		}
    `}
	
	${({ iscorrect, correctAnswer, questionId }) =>
		iscorrect === false &&
		correctAnswer.id === questionId &&
		`
		button {
			background: #F4FAF7 !important;
			border: 2px solid #239F61 !important;
		}
    `}
	
	${({ iscorrect, selectedAnswer, questionId }) =>
		iscorrect === true &&
		questionId === selectedAnswer &&
		`
		button {
			background: #F4FAF7;
			border: 2px solid #239F61;
		}
    `}
`;
