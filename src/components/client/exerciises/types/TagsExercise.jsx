import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro';

import { useHistory, useLocation, useParams } from 'react-router-dom';

import { exerciseService } from '../../../../services/exercise.service';
import { Defaults } from '../../../../helpers/defaults';
import ArrowIcon from '../../../../assets/images/icons/Arrow - Grey.svg';


function useQuery() {
	return new URLSearchParams(useLocation().search);
}


function TagsExercise({
	question,
	numberOfQuestions,
	exerciseId,
	index,
	DoneQuestion,
	exId,
	IsDone,
}) {
    const history = useHistory();
	let query = useQuery();


	const [correctAnswerId, setCorrectAnswerId] = useState(null);
	const [selectedAnswer, setSelectedAnswer] = useState([]);
	const [iscorrect, setIsCorrect] = useState(null);
    const [loading, setLoading] = useState(false);
	const [definitionModal, setDefinitionModal] = useState(false);
	const [haveToChecked, setHaveToChecked] = useState(true);

	const [selectedAnswerId, setSelectedAnswerId] = useState([]);

	const [questionData, setquestionData] = useState(null);
    const [explanation, setExplanation] = useState('')
    const [text, setText] = useState("");
    const [modifierText, setModifierText] = useState();
    

    useEffect(() => {
        const parser = new DOMParser();
		const xmlString = question.Text;
		const doc1 = parser.parseFromString(xmlString, "application/xml");
		
        let str = doc1.documentElement.textContent.replace(/[.,„“\/?#!$%\^&\*;:{}=\-_`~()]/g,"")
		setText(str)
    }, [])

	useEffect(() => {
		if(text) {
			const textes = text.trim().split(' ');
			setModifierText(textes)
            
            let y = question.Answers.map(t => t.Text)
			setCorrectAnswerId(y);
		}
	}, [text])

    const clickAnswers = t => {
        if(selectedAnswer.includes(t)) {
            let arr = selectedAnswer.filter(w => w != t);

            setSelectedAnswer(arr)
        } else {
            setSelectedAnswer([...selectedAnswer, t])
        }
    }


	useEffect(() => {
		if (IsDone && DoneQuestion) {
			setHaveToChecked(false);
			setDefinitionModal(true);

			if (DoneQuestion.IsDoneQuestionCorrect) {
                let x = DoneQuestion.DoneAnswerString.split(',')
				console.log(x)
				setSelectedAnswer(x);

				setIsCorrect(true);
			} else {
                let x = DoneQuestion.DoneAnswerString.split(',')
				setSelectedAnswer(x);


				setIsCorrect(false);
			}
		}
	}, [DoneQuestion]);

    const checkQuestion = () => {
		setLoading(true);

		let x = selectedAnswer + ''

		let data = {
			ExerciseId: exerciseId,
			QuestionId: question.Id,
			answersId: [],
			AnswerText: x,
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
				setExplanation(res.AnswerResponse)

				if (res.IsCorrect) {
					setIsCorrect(true);
				} else {
					setIsCorrect(false);
				}
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
			});

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
                        <p className="spec-exer-head-ex3">	{`სავარჯიშო #2 - ${question.ExerciseTitle}`}</p>
                        <button>პროექტორის რეჟიმი</button>
                    </div>

                    <span className="exer-choose-cor-answer" style={{ marginBottom: '30px', display: 'block' }}>{question.Instruction}</span>
                    <div className="spec-exer--mark-word">
                        {modifierText && modifierText.map(w => <Span 
                                                                    value={selectedAnswer && selectedAnswer.includes(w) ? w : null} 
                                                                    iscorrect={iscorrect} 
                                                                    isSelected={selectedAnswer && selectedAnswer.includes(w)} 
                                                                    green2={selectedAnswer && iscorrect === false && selectedAnswer.includes(w) === true && correctAnswerId.includes(w) === false}
                                                                    green3={selectedAnswer && (iscorrect === true && selectedAnswer.includes(w) === true) || (iscorrect === false && selectedAnswer.includes(w) === true && correctAnswerId.includes(w) === true) }
                                                                    green4={selectedAnswer && correctAnswerId && iscorrect === false && selectedAnswer.includes(w) === false && correctAnswerId.includes(w) === true}
                                                                    onClick={() => clickAnswers(w, )}>{w}</Span>)}
                    </div>
                    <div className='check-count-boxes'>

				<div className='special-exercises-return-button' onClick={() => onPrev(index)}>
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

export default TagsExercise

const Span = styled.span`
	${({ isSelected, iscorrect }) =>
		isSelected && iscorrect === null &&
		`
        border-radius: 10px;
		background: #EDF0EE;
		border: 2px solid #4B6858;
		background: #4B6858;

    `}


	${({ green2 }) =>
		green2 &&
		`
        border-radius: 10px;
		border: 2px solid #EB2347;
		background: #EB2347;
        color: #EB2347 !important;

    `}

	${({ green3 }) =>
		green3 &&
		`
        border-radius: 10px;
		border: 2px solid #239F61;
		background: #239F61;
        color: #239F61 !important;

    `}

	${({ green4, isSelected }) =>
		green4 &&
		`
        border-radius: 10px;
		border: 2px solid transparent;
		background: #F4FAF7 !important;
		color: #239F61 !important;

    `}
`;
