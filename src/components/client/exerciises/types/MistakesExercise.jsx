import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { exerciseService } from '../../../../services/exercise.service';
import { Defaults } from '../../../../helpers/defaults';
import ArrowIcon from '../../../../assets/images/icons/Arrow - Grey.svg';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

function MistakesExercise({
	question,
	numberOfQuestions,
	exerciseId,
	exId,
	index,
	DoneQuestion,
	IsDone,
}) {
	const history = useHistory();
	let query = useQuery();

	const [correctAnswerId, setCorrectAnswerId] = useState(null);
	const [correctAnswerValue, setCorrectAnswerValue] = useState('');
    const [loading, setLoading] = useState(false);
	const [definitionModal, setDefinitionModal] = useState(false);
	const [haveToChecked, setHaveToChecked] = useState(true);

	const [iscorrect, setIsCorrect] = useState(null);
	const [value, setValue] = useState('');
	const [explanation, setExplanation] = useState('')

	const [questionData, setquestionData] = useState(null);

	useEffect(() => {
		if(!correctAnswerId) {
			const parser = new DOMParser();
			const cutNbsp = question.Text.replace(/\.&nbsp;/g, '');
			const xmlString = cutNbsp;
			const doc1 = parser.parseFromString(xmlString, "text/html");
			setCorrectAnswerValue(doc1.documentElement.textContent)
		}
	}, [])


	useEffect(() => {
		const parser = new DOMParser();
		const xmlString = question.Text;
		const doc1 = parser.parseFromString(xmlString, "application/xml");
		
		setValue(doc1.documentElement.textContent)
	}, [])



	useEffect(() => {
		if (IsDone && DoneQuestion) {
			setHaveToChecked(false);
			setDefinitionModal(true);

			if (DoneQuestion.IsDoneQuestionCorrect) {
				setIsCorrect(true);
			} else {
				setIsCorrect(false);
			}
		}
	}, [DoneQuestion]);


    const checkQuestion = () => {
		setLoading(true);

		let data = {
			ExerciseId: exerciseId,
			QuestionId: question.Id,
			answersId: [],
			AnswerText: value,
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
                        <p className="spec-exer-head-ex3">{`სავარჯიშო # ${exId} - ${question.ExerciseTitle}`}</p>
                        <button>პროექტორის რეჟიმი</button>
                    </div>
                    <span className="exer-choose-cor-answer">{question.Instruction}</span>
                    <TextareaParent className="spec-exer--textarea" iscorrect={iscorrect}>
						<textarea className="w-100" value={value} onChange={(e) => setValue(e.target.value)} disabled={IsDone} />
                    </TextareaParent>

					{!iscorrect && !haveToChecked && question ? (
						<>
						<span className="choose-correct-answer">სწორი პასუხი</span>
						<TextareaParent className="spec-exer--textarea" iscorrect={true} disabled={true}>
							<div className="w-100" dangerouslySetInnerHTML={{ __html: question.Answers[0].Text }} />

						</TextareaParent>
						</>
					) : null}

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

export default MistakesExercise


const TextareaParent = styled.div`
  	
	${({ iscorrect }) =>
		iscorrect &&
		`
		background: #F4FAF7;

    `}
  	
	${({ iscorrect }) =>
		iscorrect === false &&
		`
		background: #FEF4F6;

    `}
`;