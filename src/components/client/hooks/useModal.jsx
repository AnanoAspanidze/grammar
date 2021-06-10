import { useState } from 'react';

const useModal = () => {
	let [showModal, setShowModal] = useState(false);
	let [id, setId] = useState('');
	let [layerid, setLayerId] = useState('');
	let [modalContent, setModalContent] = useState("I'm the Modal Content");

	let handleModal = (open, content = false, myid, leyerId) => {
		setShowModal(open);

		if (content) {
			setId(myid);
			setLayerId(leyerId);
			setModalContent(content);
		}
	};

	return { showModal, handleModal, modalContent, id, layerid };
};

export default useModal;
