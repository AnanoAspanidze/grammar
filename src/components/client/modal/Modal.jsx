import React, { useContext } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components/macro';

import { ModalContext } from '../../../context/modal/modalContext';

function Modal({ children, closeIcon, id, layerId }) {
	let { handleModal, showModal } = useContext(ModalContext);

	if (showModal) {
		return createPortal(
			<AnimatePresence exitBeforeEnter>
				<div className='overlay' id={layerId}>
					<motion.div
						id={id}
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
								onClick={() => handleModal(false, false)}
							>
								&times;
							</span>
						)}

						{children}
					</motion.div>
				</div>
			</AnimatePresence>,
			document.querySelector('#root')
		);
	} else return null;
}

Modal.defaultProps = {
	closeIcon: true,
};

export default Modal;

const ModalBackground = styled.div`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: rgba(19, 21, 21, 0.6);
`;

const ModalWrapper = styled(motion.div)`
	/* height: 400px; */
	border-radius: 8px;
	padding: ${({ size }) => (size === 'XL' ? '2%' : '4%')};
	background-color: #fff;
	box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const PositionedElement = styled.div`
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	width: ${({ size }) =>
		size === 'XL' ? '80%' : size === 'LG' ? '60%' : '400px'};
	z-index: 111;
`;

const CloseModal = styled.div`
	position: absolute;
	top: 9px;
	right: 15px;
	width: 30px;
	height: 30px;
	z-index: 10;
	cursor: pointer;

	&:hover > span {
		color: black;
	}
`;

const ModalCloseIcon = styled.span`
	color: #888f93;
	text-shadow: none;
	font-weight: 300;
	font-size: 35px;
	display: inline-block;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	transition: all 0.3s;
`;
