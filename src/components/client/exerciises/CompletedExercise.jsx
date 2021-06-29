import React, { useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';
import { exerciseService } from '../../../services/exercise.service'

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

function CompletedExercise({ data }) {
    const history = useHistory();
	let query = useQuery();

    const [loading, setloading] = useState(false)

    const resetExercise = () => {
        setloading(true)
        exerciseService.ClearAllexercises()
        .then(res => {
            setloading(false)
            history.push(`/exercisedetails/${query.get('exerciseId')}`)
        })
    }

    return (
        <>
        <div class="exercises-contents">
            <div class="exercises-contents-title">
                {/* <p>სავარჯიშო -  {data.SubCategory.Name}</p> */}
            </div>
            <div class="project-mode">
                <button class="project-mode-button">პროექტორის რეჟიმი</button>
            </div>
        </div>

                    <div class="exercises-result">
                        <div class="exercises-result-correct-answer">
                            <span>{data.CorrectAnswersQuantity}</span>
                        </div>
                        <div class="correct-answer-content">
                            <p>სწორი პასუხი</p>
                            <samp>{data.QuestionsQuantity} კითხვიდან</samp>
                        </div>  
                    </div>

                    <div class="result-check-answer">
                        {/* <div class="check-answer">
                            <a href="#"><p>შეამოწმე შენი პასუხები</p></a>
                        </div> */}
                    </div>
                    <div class="list-of-issues">
                        {/* <div class="result-issues">
                            <a href="#">1</a>
                        </div> */}
                    </div>

                    <div class="prev-next-item">

                            <button disabled={loading} class="prev-start-over" onClick={resetExercise}>
                                თავიდან დაწყება
                            </button>

                        <Link to={`/exercisedetails/${data.NextExerciseId}`}>
                        <button class="next-exercise" disabled={loading}>
                            შემდეგი სავარჯიშო
                        </button>
                        </Link>
                    </div>
        </>
    )
}

export default CompletedExercise
