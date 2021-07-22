import React, { Component } from 'react'

import Modal from '../modal/Modal'
import SuccessRegisterModal from '../modal/SuccessRegisterModal'

export default class SuccessRegisterModalContainer extends Component {
	state = {
		visible: false,
	};

	show() {
		this.setState({ visible: true });
	}

	hide() {
		this.setState({ visible: false });
	}

	render() {
		if (this.state.visible) {
			return (
				<>
					<Modal layerId='popup7' onCloseModal={this.hide.bind(this)}>
                        <SuccessRegisterModal />
                    </Modal>
				</>
			);
		} else {
			return null;
		}
	}
}
