import React from 'react';
import { Link } from 'react-router-dom';

import playIcon from '../../../assets/images/icons/Arrow - Right 2.svg';

function ExerciseLeftSidebar({ data }) {
	return (
		<>
			{data.SubExercises.map((ex) => (
				<div className='exercises-grammar-box' key={ex.Id}>
					<div
						className='exercises-grey-box'
						// style={{
						// 	border: `${
						// 		exercise.Id == match.params.exerciseId
						// 			? '2.5px solid #4B6858'
						// 			: '2.5px solid transparent'
						// 	}`,
						// }}
					>
						<div className='exercises-wb-pad'>
							<p className='exercises-grammar-pagination'>
								სავარჯიშო #{ex.OrderNumber}
							</p>
							<h4 className='exercises-grammar-title'>{ex.Name}</h4>
							<div className='exercises-adverb-item'>
								<span>
									{ex.UserAnsweredQuestionsQuantity}/{ex.QuestionsQuantity}
								</span>
								<Link to={`/exercise`}>
									<img src={playIcon} alt='arrow-right' />
								</Link>
							</div>
						</div>
					</div>
				</div>
			))}
		</>
	);
}

export default ExerciseLeftSidebar;
