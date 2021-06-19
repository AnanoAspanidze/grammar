import React from 'react';
import TestExercise from '../components/client/exerciises/types/TestExercise';

import '../assets/css/special-exercises3.css';

function ExercisePage({ match }) {
	return <TestExercise match={match} />;
}

export default ExercisePage;
