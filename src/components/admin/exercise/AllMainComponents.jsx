import React, { useEffect } from 'react'
import { useFormikContext } from 'formik';
import ReactQuill from 'react-quill';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TextFieldComponent from '../reusable/TextFieldComponent';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormHelperText from '@material-ui/core/FormHelperText';

function AllMainComponents({ exerciseType, deleteAnswer }) {
    const classes = useStyles();

    const { values, errors, setFieldValue, setFieldError, isSubmitting } = useFormikContext();


    useEffect(() => {
        if(exerciseType === 4) {
            setFieldValue('Answers', [
                {
                    Id: 1,
                    Text: '',
                    IsCorrect: true,
                },
            ])
        } else if(exerciseType === 3) {
            setFieldValue('Answers', [
                {
                    Id: 1,
                    Text: '',
                    IsCorrect: false,
                },
            ])

        }
       
    }, [])
    

    if(exerciseType === 1){
        return (
            values.Answers &&
                values.Answers.map((item, i) => (
                    <>
                    <div
                        className='flex align-items-center mb-20 mt-30'
                        key={item.id}
                    >
                        <Checkbox
                            checked={item.IsCorrect}
                            color='primary'
                            onChange={(e) =>
                                setFieldValue(`Answers[${i}].IsCorrect`, e.target.checked)
                            }
                        />
                        <div className='w-100'>
                            <TextField
                                className={classes.TextField}
                                style={{ width: '100%' }}
                                variant='outlined'
                                label='პასუხი *'
                                onChange={(e) =>
                                    setFieldValue(`Answers[${i}].Text`, e.target.value)
                                }
                            />
                        </div>

                        <IconButton
                            onClick={() => deleteAnswer(item.Id, i)}
                            style={{ marginLeft: '5px' }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </div>

                    {errors.Answers && (
                        <FormHelperText error={true} variant='standard'>
                            {errors.Answers[i]
                                ? errors.Answers[i].Text
                                : ''}
                        </FormHelperText>
                    )}
                    </>
                ))
        )
    } else if(exerciseType === 2) {
        return (
            <>
            <RadioGroup>
                {values.Answers.map((item, i) => (
                    <>
                        <div className='mb-20 mt-30'>
                            <div className='w-100 flex align-items-center'>
                                <Radio
                                    checked={item.IsCorrect}
                                    name={`Answers[${i}].IsCorrect`}
                                    onChange={(e) => {
                                        const newArr = values.Answers.map((w) => {
                                            return { ...w, IsCorrect: false };
                                        });

                                        setFieldValue(`Answers`, newArr);
                                        setFieldValue(
                                            `Answers[${i}].IsCorrect`,
                                            !e.target.value
                                        );
                                    }}
                                    inputProps={{ 'aria-label': 'A' }}
                                />

                                <TextFieldComponent
                                    onChange={(e) =>
                                        setFieldValue(
                                            `Answers[${i}].Text`,
                                            e.target.value
                                        )
                                    }
                                    value={item.Text}
                                    placeholder='პასუხი'
                                    name={`Answers[${i}].Text`}
                                />
                            </div>
                            { errors.Answers && (
                                <FormHelperText error={true} variant='standard'>
                                    {errors.Answers[i]
                                        ? errors.Answers[i].Text
                                        : ''}
                                </FormHelperText>
                            )}
                        </div>
                    </>
                ))}
            </RadioGroup>
            </>
        )
    } else if(exerciseType === 3) {
        return (
            <>
               {values.Answers.map((item, i) => (
				<>
					<div className='mt-30 mb-20' key={i}>
						<TextFieldComponent
							placeholder='სწორი პასუხი'
							name={`Answers[${i}].Text`}
							value={values.Answers[i].Text}
							onChange={(e) =>
								setFieldValue(
									`Answers[${i}].Text`,
									e.target.value
								)
							}
						/>
                        {Object.keys(errors).length > 0 && errors.Answers && (
                            <div className='mb-20'>
                                <FormHelperText error={true} variant='standard'>
                                    {errors.Answers[0]
                                        ? errors.Answers[0].Text
                                        : ''}
                                </FormHelperText>
                            </div>
                        )}
                    </div>
                </>

			))}
            </>
        )

    } else if(exerciseType === 4) {
        return (
            <>
            <div className='mb-30 mt-30'>
                <ReactQuill
                    theme='snow'
                    name={`Answers[${0}].Text`}
                    value={values.Answers[0].Text}
                    onChange={(e) =>
                        setFieldValue(`Answers[0].Text`, e)
                    }
                    placeholder='სწორი ტექსტი'
                    style={{ height: '200px', marginBottom: '60px' }}
                />

                {Object.keys(errors).length > 0 && errors.Answers && (
                    <FormHelperText error={true} variant='standard'>
                        {errors.Answers[0]
                            ? errors.Answers[0].Text
                            : ''}
                    </FormHelperText>
                )}
            </div>
        </>
        )
    
    } else if(exerciseType === 5) {
        return (
            <>
            {values.Answers.map((item, i) => (
				<div className='mb-20 mt-30' key={i}>
					<TextFieldComponent
						placeholder='სიტყვა'
						name={`Answers[${i}].Text`}
						value={values.Answers[i].Text}
						onChange={(e) =>
							setFieldValue(
								`Answers[${i}].Text`,
								e.target.value
							)
						}
					/>

                    {Object.keys(errors).length > 0 && errors.Answers && (
                        <FormHelperText error={true} variant='standard'>
                            {errors.Answers[0]
                                ? errors.Answers[0].Text
                                : ''}
                        </FormHelperText>
                    )}	
				</div>
			))}
            </>
        )
    } else if(exerciseType === 6) {
        return (
            <>
                <RadioGroup>
                    <div className='flex align-items-center mt-30'>
                        <Radio
                            name={`Answers[0].IsCorrect`}
                            checked={values.Answers[0].IsCorrect}
                            onChange={(e) => {
                                const newArr = values.Answers.map((w) => {
                                    return { ...w, IsCorrect: false };
                                });

                                setFieldValue(`Answers`, newArr);
                                setFieldValue(
                                    `Answers[0].IsCorrect`,
                                    !e.target.value
                                );
                            }}
                            inputProps={{ 'aria-label': 'A' }}
                        />
                        <span className='font-18'>
                            ჭეშმარიტია
                        </span>
                    </div>

                    <div className='flex align-items-center mb-20 mt-30'>
                        <Radio
                            name={`Answers[1].IsCorrect`}
                            checked={values.Answers[1].IsCorrect}
                            onChange={(e) => {
                                const newArr = values.Answers.map((w) => {
                                    return { ...w, IsCorrect: false };
                                });

                                setFieldValue(`Answers`, newArr);
                                setFieldValue(
                                    `Answers[1].IsCorrect`,
                                    !e.target.value
                                );
                            }}
                            inputProps={{ 'aria-label': 'A' }}
                        />
                        <span className='font-18'>
                            მცდარია
                        </span>
                    </div>
                </RadioGroup>
            </>
        )
    }
}

export default AllMainComponents




const useStyles = makeStyles((theme) => ({
	Textarea: {
		padding: '18.5px 14px',
		font: 'inherit',
		minWidth: 0,
		height: '100px !important',
		width: '95%',
		background: 'none',
		boxSizing: 'content-box',
		borderRadius: '4px',
		border: '1px solid rgba(0, 0, 0, 0.23)',
		fontSize: '16px',
		resize: 'none',
	},
	input: {
		display: 'none',
	},

	MarginLeft: {
		marginRight: '10px',
	},
}));
