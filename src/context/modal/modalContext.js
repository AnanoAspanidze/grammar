import React from 'react';
import useModal from '../../components/client/hooks/useModal';
import Modal from '../../components/client/modal/Modal';

let ModalContext;
let { Provider } = (ModalContext = React.createContext());

let ModalProvider = ({ children }) => {
	let { showModal, handleModal, modalContent, id, layerid } = useModal();

	return (
		<Provider value={{ showModal, handleModal, modalContent, id }}>
			<Modal id={id} layerId={layerid}>
				{modalContent}
			</Modal>
			{children}
		</Provider>
	);
};

export { ModalContext, ModalProvider };
