import React from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

function CompletedExercise({ data }) {
    const history = useHistory();
	let query = useQuery();


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
                        <Link to={`/exercise/${query.get('exerciseId')}?step=0`}>
                            <button class="prev-start-over" >
                                თავიდან დაწყება
                            </button>
                        </Link>
                        <button class="next-exercise">
                            შემდეგი სავარჯიშო
                        </button>
                    </div>
        </>
    )
}

export default CompletedExercise
