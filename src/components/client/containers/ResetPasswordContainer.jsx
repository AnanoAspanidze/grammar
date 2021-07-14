import React, { Component } from 'react'

import Modal from '../modal/Modal'
import ResetPasswordModal from '../modal/ResetPasswordModal'

export default class ResetPasswordContainer extends Component {
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
					<Modal layerId='popup8' onCloseModal={this.hide.bind(this)}>
                        <ResetPasswordModal />
                    </Modal>
				</>
			);
		} else {
			return null;
		}
	}
}
