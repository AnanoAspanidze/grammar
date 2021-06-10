import React, { useContext } from 'react';

import { AnimatePresence } from 'framer-motion';
import { ModalContext } from '../../../context/modal/modalContext';

function ModalWrapper() {
	let { modalContent } = useContext(ModalContext);

	return (
		<AnimatePresence exitBeforeEnter>
			<div className='overlay'>{modalContent}</div>
		</AnimatePresence>
	);
}

export default ModalWrapper;
