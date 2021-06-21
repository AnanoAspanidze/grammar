import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Modal({ children, closeIcon, layerId, onCloseModal }) {
	return (
		<AnimatePresence exitBeforeEnter>
			<div className='overlay' id={layerId}>
				<motion.div
					className='popup'
					initial={{ opacity: 0, scale: 0.55 }}
					transition={{ duration: 0.3 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0 }}
				>
					{closeIcon && (
						<span
							class='close close-in cursor-pointer'
							id='close-in4'
							onClick={onCloseModal}
						>
							&times;
						</span>
					)}

					{children}
				</motion.div>
			</div>
		</AnimatePresence>
	);
}

Modal.defaultProps = {
	closeIcon: true,
};

export default Modal;
