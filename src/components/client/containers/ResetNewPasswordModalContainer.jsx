import React, { Component } from 'react'

import Modal from '../modal/Modal'
import ResetNewPasswordModal from '../modal/ResetNewPasswordModal'

export default class ResetNewPasswordModalContainer extends Component {
	state = {
		visible: false,
		token: ''
	};

	show(token) {
		this.setState({ visible: true, token });
	}

	hide() {
		this.setState({ visible: false });
	}

	render() {
		if (this.state.visible) {
			return (
				<>
					<Modal layerId='popup8' onCloseModal={this.hide.bind(this)}>
                        <ResetNewPasswordModal token={this.state.token} />
                    </Modal>
				</>
			);
		} else {
			return null;
		}
	}
}
