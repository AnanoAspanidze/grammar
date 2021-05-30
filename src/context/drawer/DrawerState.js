import React, { useReducer } from 'react';

import drawerContext from './drawerContext';
import drawerReducer from './drawerReducer';

import { IS_OPEN } from './types';

const DrawerState = (props) => {
	const initialState = {
		isOpen: true,
	};

	const [state, dispatch] = useReducer(drawerReducer, initialState);

	const changeDrawer = (payload) => dispatch({ type: IS_OPEN, payload });

	return (
		<drawerContext.Provider
			value={{
				isOpen: state.isOpen,
				changeDrawer,
			}}
		>
			{props.children}
		</drawerContext.Provider>
	);
};

export default DrawerState;
