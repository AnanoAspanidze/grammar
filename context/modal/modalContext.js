import React from 'react';
import useModal from '../../components/hooks/useModal';
import Modal from '../../components/modals/Modal';

let ModalContext;
let { Provider } = (ModalContext = React.createContext());

let ModalProvider = ({ children }) => {
	let { showModal, handleModal, modalContent } = useModal();

	return (
		<Provider value={{ showModal, handleModal, modalContent }}>
			<Modal />
			{children}
		</Provider>
	);
};

export { ModalContext, ModalProvider };
