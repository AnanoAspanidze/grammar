import * as Yup from 'yup';

export const userSigninSchema = Yup.object().shape({
	Email: Yup.string()
		.required('შეავსეთ ველი')
		.email('შეიყვანეთ ელ. ფოსტის მისამართი სწორ ფორმაში'),
	Password: Yup.string().required('შეავსეთ ველი'),
});

export const adminSignupSchema = Yup.object().shape({
	Email: Yup.string()
		.required('შეავსეთ ველი')
		.email('შეიყვანეთ ელ. ფოსტის მისამართი სწორ ფორმაში'),

	Username: Yup.string().required('შეავსეთ ველი'),
	Name: Yup.string().required('შეავსეთ ველი'),
	Surname: Yup.string().required('შეავსეთ ველი'),
	RegionName: Yup.string().required('შეავსეთ ველი'),
	School: Yup.string(),
	RoleId: 0,

	Password: Yup.string()
		.required('შეავსეთ ველი')
		.matches(
			/^(?=.*\d)(?=.*[a-zA-Z].*[a-zA-Z])(?=.*[\W]).{8,}$/,
			'პაროლები არ ემთხვევა'
		),
	ConfirmPassword: Yup.string().when('Password', {
		is: (val) => (val && val.length > 0 ? true : false),
		then: Yup.string().oneOf([Yup.ref('Password')], 'პაროლები არ ემთხვევა'),
	}),
});

export const updateAdminInfoSchema = Yup.object().shape({
	Name: Yup.string().required('შეავსეთ ველი'),
	Surname: Yup.string().required('შეავსეთ ველი'),
	oldPassword: Yup.string().required('შეავსეთ ველი'),
	NewPassword: Yup.string().required('შეავსეთ ველი'),
	RepeatNewPassword: Yup.string().when('NewPassword', {
		is: (val) => (val && val.length > 0 ? true : false),
		then: Yup.string().oneOf([Yup.ref('NewPassword')], 'პაროლები არ ემთხვევა'),
	}),
});

export const addExerciseValidationSchema = Yup.object().shape({
	category: Yup.string().required('შეავსეთ ველი'),
	SubCategoryId: Yup.string().required('შეავსეთ ველი'),
	Name: Yup.string().required('შეავსეთ ველი').trim(),
	Instruction: Yup.string().required('შეავსეთ ველი').trim(),
	Description: Yup.string()
		.trim()
		.transform((val) => (val === '<p><br></p>' ? '' : val)),
	IsSummaryExercise: Yup.boolean(),
	OrderNumber: Yup.string().when('IsSummaryExercise', (IsSummaryExercise) => {
		if (IsSummaryExercise) {
			return Yup.string().notRequired();
		} else {
			return Yup.string().required('შეავსეთ ველი');
		}
	}),
	TypeId: Yup.string().required('შეავსეთ ველი'),
	Questions: Yup.array().of(
		Yup.object().shape({
			Text: Yup.string()
				.required('შეავსეთ ველი')
				.trim()
				.transform((val) => (val === '<p><br></p>' ? '' : val)),
			Answers: Yup.array().of(
				Yup.object().shape({
					Text: Yup.string().required('შეავსეთ ველი').trim(),
				})
			),
			WrongAnswerText: Yup.string()
				.trim()
				.transform((val) => (val === '<p><br></p>' ? '' : val)),
			RightAnswerText: Yup.string()
				.trim()
				.transform((val) => (val === '<p><br></p>' ? '' : val)),
		})
	),
});

export const addExerciseValidationSchema2 = Yup.object().shape({
	CategoryId: Yup.string().required('შეავსეთ ველი'),
	SubCategoryId: Yup.string().required('შეავსეთ ველი'),
	Name: Yup.string().required('შეავსეთ ველი').trim(),
	TypeId: Yup.string().required('შეავსეთ ველი'),
	Description: Yup.string()
		.trim()
		.transform((val) => (val === '<p><br></p>' ? '' : val)),
	Instruction: Yup.string().required('შეავსეთ ველი').trim(),
	IsSummaryExercise: Yup.boolean(),
	OrderNumber: Yup.string().when('IsSummaryExercise', (IsSummaryExercise) => {
		if (IsSummaryExercise) {
			return Yup.string().notRequired();
		} else {
			return Yup.string().required('შეავსეთ ველი');
		}
	}),
	Questions: Yup.array().of(
		Yup.object().shape({
			Text: Yup.string()
				.required('შეავსეთ ველი')
				.trim()
				.transform((val) => (val === '<p><br></p>' ? '' : val)),

			Answers: Yup.array().of(
				Yup.object().shape({
					Text: Yup.string().required('შეავსეთ ველი').trim(),
				})
			),
			WrongAnswerText: Yup.string()
				.trim()
				.transform((val) => (val === '<p><br></p>' ? '' : val)),
			RightAnswerText: Yup.string()
				.trim()
				.transform((val) => (val === '<p><br></p>' ? '' : val)),
		})
	),
});

export const editQuestionSchema = Yup.object().shape({
	Text: Yup.string()
		.required('შეავსეთ ველი')
		.trim()
		.transform((val) => (val === '<p><br></p>' ? '' : val)),
	Answers: Yup.array().of(
		Yup.object().shape({
			Text: Yup.string().required('შეავსეთ ველი').trim(),
		})
	),
});
