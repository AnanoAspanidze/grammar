import { IS_OPEN } from './types';

export default function (state, action) {
	switch (action.type) {
		case IS_OPEN:
			return {
				isOpen: action.payload,
			};

		default:
			return state;
	}
}
