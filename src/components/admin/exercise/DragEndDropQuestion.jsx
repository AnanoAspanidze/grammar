import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

function DragEndDropQuestion() {
	const classes = useStyles();

	return (
		<div className={classes.EcercisesBorder}>
			<textarea
				className={classes.Textarea}
				placeholder='ჩაწერეთ კოდი'
			></textarea>
		</div>
	);
}

export default DragEndDropQuestion;

const useStyles = makeStyles((theme) => ({
	EcercisesBorder: {
		padding: '30px 50px',
		marginBottom: '50px',
		borderRadius: '6px',
		boxShadow: 'rgb(3 102 214 / 30%) 0px 0px 0px 3px',
	},
	Textarea: {
		padding: '10px',
		borderRadius: '6px',
		width: '100%',
		height: '400px',
		resize: 'vertical',
	},
}));
